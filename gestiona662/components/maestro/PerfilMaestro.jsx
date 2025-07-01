import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput, Switch } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { desloguear } from '../../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';
import { stylesPerfil } from '../styles/stylesPerfil';
import FotoPerfilUploader from '../FotoPerfilUploader';
import { useEffect, useState } from 'react';
import { URL_BACKEND } from '@env';
import { Snackbar } from 'react-native-paper';
import { colores } from '../styles/fuentesyColores';
import DateTimePicker from '@react-native-community/datetimepicker';
import { estilosModalBusqueda } from '../styles/stylesModalBusquedaPublicaciones';

const { height } = Dimensions.get('window');

const PerfilMaestro = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();
    const [perfil, setPerfil] = useState(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('ok');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        address: '',
        graduationDate: '',
        competitionNumber: '',
        isEffectiveTeacher: false,
        healthCertificateStatus: false,
        criminalRecordDate: '',
        law19889CertificateDate: '',
        preferredShifts: [],
    });
    const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });

    const showSnackbar = (message, type = 'ok') => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setSnackbarVisible(true);
    };

    useEffect(() => {
        const fetchPerfil = async () => {
            const token = await SecureStore.getItemAsync('token');
            const resp = await fetch(`${URL_BACKEND}/v1/users/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            try {
                const data = await resp.json();
                setPerfil(data);
            } catch (e) {
                showSnackbar('Error al cargar el perfil', 'error');
            }
        };
        fetchPerfil();
    }, []);

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("isLogged");
        await SecureStore.deleteItemAsync("usuario");
        dispatch(desloguear());
    };

    // Prellenar datos cuando se entra en modo edición
    const startEdit = () => {
        setEditData({
            address: perfil?.teacherProfile?.address || '',
            graduationDate: perfil?.teacherProfile?.graduationDate ? perfil.teacherProfile.graduationDate.slice(0,10) : '',
            competitionNumber: perfil?.teacherProfile?.competitionNumber?.toString() || '',
            isEffectiveTeacher: perfil?.teacherProfile?.isEffectiveTeacher || false,
            healthCertificateStatus: perfil?.teacherProfile?.healthCertificateStatus || false,
            criminalRecordDate: perfil?.teacherProfile?.criminalRecordDate ? perfil.teacherProfile.criminalRecordDate.slice(0,10) : '',
            law19889CertificateDate: perfil?.teacherProfile?.law19889CertificateDate ? perfil.teacherProfile.law19889CertificateDate.slice(0,10) : '',
            preferredShifts: perfil?.teacherProfile?.preferredShifts || [],
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    // Manejar cambios en los campos
    const handleEditChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    // Manejar cambios en los turnos preferidos (checkbox simple)
    const toggleShift = (shift) => {
        setEditData(prev => {
            const arr = prev.preferredShifts.includes(shift)
                ? prev.preferredShifts.filter(s => s !== shift)
                : [...prev.preferredShifts, shift];
            return { ...prev, preferredShifts: arr };
        });
    };

    // Guardar cambios
    const handleSaveEdit = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const body = {
                address: editData.address,
                graduationDate: editData.graduationDate || undefined,
                competitionNumber: editData.competitionNumber ? Number(editData.competitionNumber) : undefined,
                isEffectiveTeacher: editData.isEffectiveTeacher,
                healthCertificateStatus: editData.healthCertificateStatus,
                criminalRecordDate: editData.criminalRecordDate || undefined,
                law19889CertificateDate: editData.law19889CertificateDate || undefined,
                preferredShifts: editData.preferredShifts,
            };
            const resp = await fetch(`${URL_BACKEND}/v1/users/profileTeacher`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });
            if (!resp.ok) {
                const err = await resp.json();
                showSnackbar(err.message || 'Error al actualizar', 'error');
                return;
            }
            showSnackbar('Datos actualizados correctamente', 'ok');
            setIsEditing(false);
            // Refrescar perfil
            const updated = await resp.json();
            setPerfil(updated);
        } catch (e) {
            showSnackbar('Error al actualizar', 'error');
        }
    };

    // Manejar apertura de selector de fecha
    const openDatePicker = (field) => {
        setShowDatePicker({ field, visible: true });
    };

    // Función para mostrar la fecha en DD/MM/YYYY sin desfase de zona horaria
    const formatDateDisplay = (dateStr) => {
        if (!dateStr) return '';
        // Si es formato YYYY-MM-DD, parsear manualmente como local
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            const [year, month, day] = dateStr.split('-');
            return `${day}/${month}/${year}`;
        }
        // Si no, intentar parsear normalmente
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Función para guardar la fecha en YYYY-MM-DD
    const formatDateSave = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Manejar selección de fecha
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker({ field: null, visible: false });
        if (selectedDate && showDatePicker.field) {
            const formatted = formatDateSave(selectedDate);
            handleEditChange(showDatePicker.field, formatted);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={stylesPerfil.encabezado}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={stylesPerfil.botonAtras}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={stylesPerfil.textoEncabezado}>Perfil</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                    <View style={stylesPerfil.contenedor}>
                        <ScrollView contentContainerStyle={stylesPerfil.contenidoScroll}>
                            <View style={stylesPerfil.avatarContainer}>
                                <FotoPerfilUploader
                                    avatarStyle={stylesPerfil.avatar}
                                    ciUsuario={usuario.ci}
                                    profilePhoto={perfil?.profilePhoto}
                                    onSnackbarMessage={(msg, type) => showSnackbar(msg, type)}
                                />
                                <View>
                                    <Text style={stylesPerfil.nombre}>{usuario.name} {usuario.lastName}</Text>
                                    <Text style={stylesPerfil.rol}>Maestra</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={stylesPerfil.tituloSeccion}>Tus Datos</Text>
                                <View style={stylesPerfil.datosSeccion}>
                                    {/* Email, Teléfono, CI: solo lectura */}
                                    <Text style={stylesPerfil.subtituloCampo}>Email</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="email" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.email || 'correo@dominio.com'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Teléfono de contacto</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="phone" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.phoneNumber || '+59892654987'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>C.I.</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="badge" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.ci || '49086546'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Dirección</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="location-on" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <TextInput
                                                value={editData.address}
                                                onChangeText={t => handleEditChange('address', t)}
                                                style={[stylesPerfil.textoFila, { flex: 1, borderBottomWidth: 1 }]}
                                            />
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.address}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Fecha de egreso</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="event" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <>
                                                <TouchableOpacity
                                                    style={estilosModalBusqueda.selectorFecha}
                                                    onPress={() => openDatePicker('graduationDate')}
                                                >
                                                    <Text style={estilosModalBusqueda.textoFecha}>
                                                        {editData.graduationDate ? formatDateDisplay(editData.graduationDate) : 'Seleccione una fecha...'}
                                                    </Text>
                                                    <MaterialIcons name="event" size={24} color="#009fe3" />
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.graduationDate?.slice(0,10)}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Puntaje del concurso</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="assignment" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <TextInput
                                                value={editData.competitionNumber}
                                                onChangeText={t => handleEditChange('competitionNumber', t)}
                                                style={[stylesPerfil.textoFila, { flex: 1, borderBottomWidth: 1 }]}
                                                keyboardType="numeric"
                                            />
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.competitionNumber}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Efectividad</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="account-balance" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <Switch
                                                value={editData.isEffectiveTeacher}
                                                onValueChange={v => handleEditChange('isEffectiveTeacher', v)}
                                                style={{ marginLeft: 10 }}
                                            />
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.isEffectiveTeacher ? 'Efectivo' : 'No Efectivo'}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Carné de Salud</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="health-and-safety" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <Switch
                                                value={editData.healthCertificateStatus}
                                                onValueChange={v => handleEditChange('healthCertificateStatus', v)}
                                                style={{ marginLeft: 10 }}
                                            />
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.healthCertificateStatus ? 'Vigente' : 'No vigente'}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Certificado Ley 19889</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="description" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <TouchableOpacity
                                                style={estilosModalBusqueda.selectorFecha}
                                                onPress={() => openDatePicker('law19889CertificateDate')}
                                            >
                                                <Text style={estilosModalBusqueda.textoFecha}>
                                                    {editData.law19889CertificateDate ? formatDateDisplay(editData.law19889CertificateDate) : 'Seleccione una fecha...'}
                                                </Text>
                                                <MaterialIcons name="event" size={24} color="#009fe3" />
                                            </TouchableOpacity>
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.law19889CertificateDate?.slice(0,10)}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Fecha Antecedentes Penales</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="description" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <TouchableOpacity
                                                style={estilosModalBusqueda.selectorFecha}
                                                onPress={() => openDatePicker('criminalRecordDate')}
                                            >
                                                <Text style={estilosModalBusqueda.textoFecha}>
                                                    {editData.criminalRecordDate ? formatDateDisplay(editData.criminalRecordDate) : 'Seleccione una fecha...'}
                                                </Text>
                                                <MaterialIcons name="event" size={24} color="#009fe3" />
                                            </TouchableOpacity>
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.criminalRecordDate?.slice(0,10)}</Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Turnos Preferidos</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="schedule" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        {isEditing ? (
                                            <View style={{ flexDirection: 'row' }}>
                                                {['MORNING', 'AFTERNOON', 'FULL_DAY'].map(shift => (
                                                    <TouchableOpacity
                                                        key={shift}
                                                        onPress={() => toggleShift(shift)}
                                                        style={{
                                                            padding: 6, margin: 2, borderWidth: 1,
                                                            borderColor: editData.preferredShifts.includes(shift) ? '#009fe3' : '#ccc',
                                                            borderRadius: 6, backgroundColor: editData.preferredShifts.includes(shift) ? '#009fe3' : '#fff'
                                                        }}
                                                    >
                                                        <Text style={{ color: editData.preferredShifts.includes(shift) ? '#fff' : '#000' }}>
                                                            {shift === 'MORNING' ? 'Mañana' : shift === 'AFTERNOON' ? 'Tarde' : 'Completo'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        ) : (
                                            <Text style={stylesPerfil.textoFila}>
                                                {(perfil?.teacherProfile?.preferredShifts || []).map(s =>
                                                    s === 'MORNING' ? 'Mañana' : s === 'AFTERNOON' ? 'Tarde' : 'Completo'
                                                ).join(', ')}
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Calificación</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <FontAwesome name="star" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{perfil?.teacherProfile?.rating}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={stylesPerfil.contenedorBotones}>
                                {!isEditing ? (
                                    <TouchableOpacity style={stylesPerfil.botonEditar} onPress={startEdit}>
                                        <Text style={stylesPerfil.textoBotonEditar}>Editar Datos</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <>
                                        <TouchableOpacity style={stylesPerfil.botonEditar} onPress={handleSaveEdit}>
                                            <Text style={stylesPerfil.textoBotonEditar}>Guardar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={stylesPerfil.botonCerrarSesion} onPress={cancelEdit}>
                                            <Text style={stylesPerfil.textoCerrarSesion}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {!isEditing && (
                                    <TouchableOpacity style={stylesPerfil.botonCerrarSesion} onPress={handleLogout}>
                                        <Text style={stylesPerfil.textoCerrarSesion}>Cerrar Sesión</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={4000}
                style={{
                    backgroundColor: snackbarType === 'ok' ? colores.cartelExito : colores.cartelError,
                    marginBottom: height * 0.05,
                }}
            >
                <Text style={{
                    color: snackbarType === 'ok' ? colores.letrasExito : colores.letrasError,
                    fontWeight: 'bold'
                }}>
                    {snackbarMessage}
                </Text>
            </Snackbar>
            {/* DateTimePicker para fechas */}
            {showDatePicker.visible && (
                <DateTimePicker
                    value={
                        editData[showDatePicker.field]
                            ? new Date(editData[showDatePicker.field])
                            : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default PerfilMaestro;
