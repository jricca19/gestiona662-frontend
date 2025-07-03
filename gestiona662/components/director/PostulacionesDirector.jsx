import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { colores } from '../styles/fuentesyColores';

const PostulacionesPublicacion = ({ navigation, route }) => {
    const postulaciones = route.params?.postulaciones || [];
    const publicacion = route.params?.publicacion || null;
    const [seleccion, setSeleccion] = useState({});
    const [seleccionado, setSeleccionado] = useState(null);
    let fechaFormateada = '';
    if (publicacion.startDate && publicacion.endDate) {
        const inicio = parseISO(publicacion.startDate);
        const fin = parseISO(publicacion.endDate);
        fechaFormateada =
            format(inicio, 'dd', { locale: es }) +
            '-' +
            format(fin, 'dd MMM yyyy', { locale: es }).toUpperCase();
    }

    const onConfirmar = async () => {
        if (!seleccionado || !seleccion[seleccionado] || seleccion[seleccionado].length === 0) {
            alert("Por favor selecciona una postulación y al menos un día.");
            return;
        }

        try {
            const token = await SecureStore.getItemAsync('token');
            const res = await fetch(`https://gestiona662-backend.vercel.app/v1/publications/assignPostulation/multiple`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asignaciones: [
                        {
                            postulationId: seleccionado,
                            selectedDays: seleccion[seleccionado]
                        },
                    ],
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Postulación asignada correctamente');
                setSeleccion({});
                setSeleccionado(null);
            } else {
                alert('Error al asignar: ' + data.message);
            }
        } catch (error) {
            alert('Error de red al asignar la postulación');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Publicación</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={styles.grado}>
                        {publicacion.grade === 0 ? 'NIVEL INICIAL' : `${publicacion.grade}°`}
                    </Text>
                    <Text style={styles.fecha}>{fechaFormateada}</Text>
                </View>

                <Text style={styles.subtitulo}>Postulados</Text>
                {postulaciones.map((post, idx) => {
                    const postulacionId = post._id
                    const perfil = post.teacherId?.teacherProfile || {};
                    const nombreCompleto = `${post.teacherId?.name ?? ''} ${post.teacherId?.lastName ?? ''}`.trim();
                    const fechasDisponibles = post.postulationDays.map(d =>
                        new Date(d.date).toISOString().split('T')[0]
                    );

                    return (
                        <View key={post._id || idx} style={styles.card}>
                            <View style={styles.etiquetasRow}>
                                <View style={[
                                    styles.etiqueta,
                                    perfil.isEffectiveTeacher ? styles.etiquetaEfectivo : styles.etiquetaNoEfectivo
                                ]}>
                                    <Text style={[
                                        styles.etiquetaTexto,
                                        perfil.isEffectiveTeacher ? styles.etiquetaTextoEfectivo : styles.etiquetaTextoNoEfectivo
                                    ]}>
                                        {perfil.isEffectiveTeacher ? 'Efectivo' : 'No efectivo'}
                                    </Text>
                                </View>
                                <View style={styles.etiquetaExp}>
                                    <Text style={styles.etiquetaTextoExp}>
                                        {post.appliesToAllDays ? 'Todos los días' : 'Días específicos'}
                                    </Text>
                                </View>
                                <MaterialIcons name="star" size={20} color={'#FFD600'} style={{ marginLeft: 'auto' }} />
                                <Text style={styles.puntaje}>{perfil.rating}</Text>
                            </View>

                            <Text style={styles.nombre}>{nombreCompleto}</Text>

                            <Text style={styles.disponibilidadLabel}>Disponibilidad</Text>
                            <View style={styles.disponibilidadRow}>
                                {fechasDisponibles.map((fecha, i) => (
                                    <TouchableOpacity
                                        key={fecha + i}
                                        style={styles.radioContainer}
                                        onPress={() => {
                                            const current = seleccion[postulacionId] || [];
                                            const yaSeleccionada = current.includes(fecha);

                                            const nuevasFechas = yaSeleccionada
                                                ? current.filter(f => f !== fecha)
                                                : [...current, fecha];

                                            setSeleccion(prev => ({
                                                ...prev,
                                                [postulacionId]: nuevasFechas
                                            }));
                                        }}
                                    >
                                        <View style={[
                                            styles.radio,
                                            seleccion[postulacionId]?.includes(fecha) && styles.radioSelected
                                        ]} />
                                        <Text style={styles.radioLabel}>{fecha}</Text>
                                    </TouchableOpacity>
                                ))}

                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.seleccionarBtn,
                                    seleccionado === postulacionId && styles.seleccionarBtnActivo
                                ]}
                                onPress={() => setSeleccionado(postulacionId)}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    styles.seleccionarTexto,
                                    seleccionado === postulacionId && styles.seleccionarTextoActivo
                                ]}>
                                    Seleccionar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}

                <TouchableOpacity
                    style={styles.confirmarBtn}
                    onPress={onConfirmar}
                >
                    <Text style={styles.confirmarTexto}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PostulacionesPublicacion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7F8',
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: colores.primario,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    grado: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 2,
    },
    fecha: {
        fontSize: 17,
        color: '#222',
        marginBottom: 10,
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
        marginLeft: 18,
        marginTop: 10,
        marginBottom: 6,
    },
    card: {
        backgroundColor: "#E6F6FE",
        borderRadius: 10,
        padding: 12,
        marginHorizontal: 12,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    etiquetasRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    etiqueta: {
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 6,
    },
    etiquetaEfectivo: {
        backgroundColor: '#B3E5FC',
    },
    etiquetaNoEfectivo: {
        backgroundColor: '#E0E0E0',
    },
    etiquetaTexto: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    etiquetaTextoEfectivo: {
        color: colores.primario,
    },
    etiquetaTextoNoEfectivo: {
        color: '#B0BEC5',
    },
    etiquetaExp: {
        backgroundColor: '#E1F5FE',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 6,
    },
    etiquetaTextoExp: {
        color: colores.primario,
        fontWeight: 'bold',
        fontSize: 13,
    },
    puntaje: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
        marginLeft: 2,
    },
    nombre: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
        marginBottom: 4,
        marginTop: 2,
    },
    disponibilidadLabel: {
        fontSize: 14,
        color: '#222',
        marginBottom: 2,
    },
    disponibilidadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        marginTop: 2,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colores.primario,
        backgroundColor: '#fff',
        marginRight: 4,
    },
    radioSelected: {
        backgroundColor: colores.primario,
        borderColor: colores.primario,
    },
    radioLabel: {
        fontSize: 14,
        color: '#222',
    },
    seleccionarBtn: {
        alignSelf: 'center',
        marginTop: 2,
        paddingVertical: 2,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    seleccionarBtnActivo: {
        backgroundColor: colores.primario,
    },
    seleccionarTexto: {
        color: colores.primario,
        fontWeight: 'bold',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    seleccionarTextoActivo: {
        color: '#fff',
        textDecorationLine: 'none',
    },
    confirmarBtn: {
        backgroundColor: colores.primario,
        borderRadius: 8,
        paddingVertical: 13,
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    confirmarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});