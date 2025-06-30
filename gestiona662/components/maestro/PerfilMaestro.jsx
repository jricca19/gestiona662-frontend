import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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

const { height } = Dimensions.get('window');

const PerfilMaestro = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();
    const [perfil, setPerfil] = useState(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('ok');

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
                showSnackbar('Error al cargar el perfil');
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
                                        <Text style={stylesPerfil.textoFila}>{usuario.address || 'Calle 1234'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Fecha de egreso</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="event" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.graduationDate || '10/05/2024'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Puntaje del concurso</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="assignment" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.competitionNumber || '90'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Efectividad</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="account-balance" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.isEffectiveTeacher ? 'Efectivo' : 'No Efectivo'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Carné de Salud</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="health-and-safety" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.healthCertificateStatus || 'Vigente'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Certificado Ley 19889</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="description" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.criminalRecordDate || '20/06/2025'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Turnos Preferidos</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <MaterialIcons name="schedule" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.shift || 'Tarde'}</Text>
                                    </View>
                                    <Text style={[stylesPerfil.subtituloCampo, { marginTop: 10 }]}>Calificación</Text>
                                    <View style={stylesPerfil.filaSeccion}>
                                        <FontAwesome name="star" size={20} color="#009fe3" style={stylesPerfil.iconoFila} />
                                        <Text style={stylesPerfil.textoFila}>{usuario.rating || '4.9'}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={stylesPerfil.contenedorBotones}>
                                <TouchableOpacity style={stylesPerfil.botonEditar}>
                                    <Text style={stylesPerfil.textoBotonEditar}>Editar Datos</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={stylesPerfil.botonCerrarSesion} onPress={handleLogout}>
                                    <Text style={stylesPerfil.textoCerrarSesion}>Cerrar Sesión</Text>
                                </TouchableOpacity>
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
        </View>
    );
};

export default PerfilMaestro;
