import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { estilosPublicacionesDirector } from '../styles/stylesPublicacionesDirector';
import { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { estilosPublicaciones } from '../styles/stylesPublicaciones';
import { colores } from '../styles/fuentesyColores';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const PublicacionesDirector = ({ navigation }) => {
    const [datos, setDatos] = useState([]);
    const [escuelas, setEscuelas] = useState([]);
    const [escuelaSeleccionada, setEscuelaSeleccionada] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPublicaciones = useCallback(async (pageToLoad = 1, refreshing = false) => {
        if (loading) return;
        if (!refreshing && total && datos.length >= total) return; // No cargar más si ya se cargó todo
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

            const text = await res.text(); // NO lo intentes parsear aún
            console.log('🔍 Respuesta cruda del backend:', text);

            if (res.status === 200 && res.headers.get('content-type')?.includes('application/json')) {
                const data = JSON.parse(text);
                setTotal(data.total ?? 0);
                if (refreshing) {
                    setDatos(data ?? []);
                } else {
                    setDatos(prev => [...prev, ...(data ?? [])]);
                }
            } else {
                console.error('⚠️ Error inesperado del backend:', text);
                setError('Error inesperado al obtener publicaciones');
            }
        } catch (err) {
            console.error('❌ Error al hacer fetch de publicaciones:', err);
            setError('Error de red o servidor');
        }
        setLoading(false);
    }, [loading, datos.length, total, escuelaSeleccionada]);

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

    const renderItem = ({ item }) => {
        // Formateo de fechas usando date-fns
        let fechaFormateada = '';
        if (item.startDate && item.endDate) {
            const inicio = parseISO(item.startDate);
            const fin = parseISO(item.endDate);
            fechaFormateada =
                format(inicio, 'dd', { locale: es }) +
                '-' +
                format(fin, 'dd MMM yyyy', { locale: es }).toUpperCase();
        }

        return (
            <View style={estilosPublicaciones.tarjeta} key={item._id}>
                <View style={estilosPublicaciones.encabezadoTarjeta}>
                    <Text style={estilosPublicaciones.nombreEscuela}>Escuela Nº{item.schoolId?.schoolNumber}</Text>
                    <View style={estilosPublicaciones.calificacion}>
                        <FontAwesome name="star" size={20} color="#FFD700" />
                        <Text style={estilosPublicaciones.textoCalificacion}>{item.rating ?? '0'}</Text>
                    </View>
                </View>
                <View style={estilosPublicaciones.filaTarjeta}>
                    <MaterialIcons name="access-time" size={18} color={colores.primario} />
                    <Text style={estilosPublicaciones.textoTarjeta}>
                        {item.grade}° -
                        {item.shift === 'MORNING' ? ' Mañana - ' : item.shift === 'AFTERNOON' ? ' Tarde - ' : item.shift === 'FULL' ? ' Tiempo Completo - ' : ` ${item.shift}`}
                        {item.shift === 'MORNING' && '08:00 a 12:00'}
                        {item.shift === 'AFTERNOON' && '12:00 a 17:00'}
                        {item.shift === 'FULL' && '09:00 a 15:00'}
                    </Text>
                </View>
                <View style={estilosPublicaciones.filaTarjeta}>
                    <MaterialIcons name="event" size={18} color={colores.primario} />
                    <Text style={estilosPublicaciones.textoTarjeta}>
                        {fechaFormateada}
                    </Text>
                </View>
                <View style={[estilosPublicaciones.filaTarjeta, { justifyContent: 'space-between' }]}>
                    <MaterialIcons name="place" size={18} color={colores.primario} />
                    <View style={{ flex: 1 }}>
                        <Text style={estilosPublicaciones.textoTarjeta}>
                            {item.schoolId?.departmentId?.name || 'Sin Departamento'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={estilosPublicaciones.botonDetalles}
                        onPress={() => navigation.navigate('detallesPublicacion', { publicacion: item })}
                    >
                        <Ionicons name="eye-outline" size={18} color="#fff" />
                        <Text style={estilosPublicaciones.textoDetalles}>Ver Detalles</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            {/* Encabezado */}
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

            {/* Lista de publicaciones */}
            <View style={{ flex: 1 }}>
                <View style={estilosPublicaciones.contenedor}>
                    <FlatList
                        data={datos}
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