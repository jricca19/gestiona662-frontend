import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { estilosPublicacionesDirector } from '../styles/stylesPublicacionesDirector';
import { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { estilosPublicaciones } from '../styles/stylesPublicaciones';
import { colores } from '../styles/fuentesyColores';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const PublicacionesDirector = ({ navigation }) => {
    const [datos, setDatos] = useState([]);
    const [escuelas, setEscuelas] = useState([]);
    const [escuelaSeleccionada, setEscuelaSeleccionada] = useState('');
    const [postulaciones, setPostulaciones] = useState({});
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPublicaciones = useCallback(async (pageToLoad = 1, refreshing = false) => {
        if (loading) return;
        if (!refreshing && total && datos.length >= total) return;
        setLoading(true);
        setError(null);
        try {
            const token = await SecureStore.getItemAsync('token');

            const res = await fetch('https://gestiona662-backend.vercel.app/v1/publications/school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    schoolId: escuelaSeleccionada
                })
            });

            const text = await res.text();

            if (res.status === 200 && res.headers.get('content-type')?.includes('application/json')) {
                const data = JSON.parse(text);
                setTotal(data.total ?? 0);
                if (refreshing) {
                    setDatos(data ?? []);
                } else {
                    setDatos(prev => [...prev, ...(data ?? [])]);
                }
            } else {
                setError('Error inesperado al obtener publicaciones');
            }
        } catch (err) {
            setError('Error de red o servidor');
        }
        setLoading(false);
    }, [loading, datos.length, total, escuelaSeleccionada]);

    const cargarPostulaciones = async (publicationId) => {
        try {
            if (postulaciones[publicationId]) return;

            const token = await SecureStore.getItemAsync('token');
            const res = await fetch(`https://gestiona662-backend.vercel.app/v1/postulations/publication/${publicationId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                setPostulaciones(prev => ({ ...prev, [publicationId]: data }));
            }
            else if (res.status === 404) {
                setPostulaciones(prev => ({ ...prev, [publicationId]: [] }));
            }
            else {
                throw new error(`Error al cargar postulaciones de ${publicationId}:`);
            }
        } catch (err) {
            console.error(`Error cargando postulaciones de ${publicationId}:`, err);
        }
    };

    useEffect(() => {
        if (escuelaSeleccionada) {
            setPage(1);
            fetchPublicaciones(1, true);
        }
    }, [escuelaSeleccionada]);

    useEffect(() => {
        const obtenerEscuelas = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');

                const res = await fetch('https://gestiona662-backend.vercel.app/v1/schools/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setEscuelas(data);
                    if (data.length > 0) {
                        setEscuelaSeleccionada(data[0]._id);
                    }
                } else {
                    console.error('Error al obtener escuelas:', data.message || 'Respuesta no OK');
                }
            } catch (error) {
                console.error('Error al cargar escuelas:', error);
            }
        };

        obtenerEscuelas();
    }, []);

    const handleLoadMore = () => {
        if (loading) return;
        if (datos.length >= total) return;
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPublicaciones(nextPage);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setPage(1);
        fetchPublicaciones(1, true).then(() => setRefreshing(false));
    };

    useEffect(() => {
        const cargarTodasLasPostulaciones = async () => {
            for (const pub of datos) {
                if (!postulaciones[pub._id]) {
                    await cargarPostulaciones(pub._id);
                }
            }
        };

        if (datos.length > 0) {
            cargarTodasLasPostulaciones();
        }
    }, [datos]);

    const renderItem = ({ item }) => {
        let fechaFormateada = '';
        if (item.startDate && item.endDate) {
            const inicio = parseISO(item.startDate);
            const fin = parseISO(item.endDate);
            fechaFormateada =
                format(inicio, 'dd MMM', { locale: es }).toUpperCase() +
                '-' +
                format(fin, 'dd MMM yyyy', { locale: es }).toUpperCase();
        }

        return (
            <View style={estilosPublicaciones.tarjeta} key={item._id}>
                <View style={estilosPublicaciones.encabezadoTarjeta}>
                    <View style={estilosPublicaciones.filaTarjeta}>
                        <MaterialIcons name="show-chart" size={18} color="#03A9E0" />
                        <Text style={estilosPublicaciones.textoTarjeta}>
                            {item.grade === 0 ? 'Nivel Inicial' : `${item.grade}°`}
                        </Text>
                    </View>
                    <View style={[
                        estilosPublicaciones.badgeStatus,
                        item.status === 'PENDING'
                            ? estilosPublicaciones.badgePendiente
                            : item.status === 'ASSIGNED'
                                ? estilosPublicaciones.badgeAsignada
                                : estilosPublicaciones.badgeRechazada
                    ]}>
                        <Text style={[
                            estilosPublicaciones.badgeStatusText,
                            item.status === 'PENDING'
                                ? estilosPublicaciones.badgePendienteText
                                : item.status === 'ASSIGNED'
                                    ? estilosPublicaciones.badgeAsignadaText
                                    : estilosPublicaciones.badgeRechazadaText
                        ]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <View style={estilosPublicaciones.filaTarjeta}>
                    <MaterialIcons name="event" size={18} color={colores.primario} />
                    <Text style={estilosPublicaciones.textoTarjeta}>
                        {fechaFormateada}
                    </Text>
                </View>
                <View style={estilosPublicaciones.filaTarjeta}>
                    <MaterialIcons name="event" size={18} color={colores.primario} />
                    <Text style={estilosPublicaciones.textoTarjeta}>
                        {postulaciones[item._id]?.length || 0} postulados
                    </Text>
                </View>
                <View style={estilosPublicacionesDirector.acciones}>
                    <TouchableOpacity
                        style={estilosPublicacionesDirector.iconButton}
                        onPress={() => {
                            const postulacionesArray = Array.isArray(postulaciones[item._id]) ? postulaciones[item._id] : [];
                            navigation.navigate('postulacionesPublicacion', { postulaciones: postulacionesArray, publicacion: item });
                        }}
                        disabled={!Array.isArray(postulaciones[item._id]) || postulaciones[item._id].length === 0}
                    >
                        <MaterialCommunityIcons
                            name="handshake"
                            size={38}
                            color={
                                Array.isArray(postulaciones[item._id]) && postulaciones[item._id].length > 0
                                    ? "#117396"
                                    : "#B0BEC5"
                            }
                            style={estilosPublicacionesDirector.iconShadow}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosPublicacionesDirector.iconButton} onPress={() => {/* acción editar */ }}>
                        <MaterialCommunityIcons name="square-edit-outline" size={38} color="#117396" style={estilosPublicacionesDirector.iconShadow} />
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosPublicacionesDirector.iconButton} onPress={() => {/* acción eliminar */ }}>
                        <MaterialCommunityIcons name="trash-can" size={38} color="#117396" style={estilosPublicacionesDirector.iconShadow} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={estilosPublicacionesDirector.encabezado}>
                <View style={estilosPublicacionesDirector.filaEncabezado}>
                    <Text style={estilosPublicacionesDirector.textoEncabezado}>Escuela</Text>
                    <View style={estilosPublicacionesDirector.pickerWrapper}>
                        <Picker
                            selectedValue={escuelaSeleccionada}
                            onValueChange={(value) => setEscuelaSeleccionada(value)}
                            style={estilosPublicacionesDirector.selectEscuelasDirector}
                            dropdownIconColor="white"
                        >
                            {escuelas.map((escuela) => (
                                <Picker.Item
                                    key={escuela._id}
                                    label={escuela.schoolNumber}
                                    value={escuela._id}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <View style={estilosPublicaciones.contenedor}>
                    <FlatList
                        data={datos.filter(item => Array.isArray(postulaciones[item._id]))}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            loading && !refreshing ? (
                                <View style={estilosPublicaciones.spinnerCargando}>
                                    <ActivityIndicator size="large" color={colores.primario} />
                                </View>
                            ) : datos.length >= total && total > 0 ? (
                                <View style={estilosPublicaciones.spinnerCargando}>
                                    <Text style={estilosPublicaciones.textoFinalLista}>
                                        No hay más publicaciones para mostrar
                                    </Text>
                                </View>
                            ) : null
                        }
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        contentContainerStyle={{ paddingBottom: 50 }}
                    />
                </View>
            </View>
        </View>
    );
}

export default PublicacionesDirector