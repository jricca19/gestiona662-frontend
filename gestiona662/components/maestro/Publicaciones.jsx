import { FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { colores } from '../styles/fuentesyColores'
import { stylesPublicaciones } from '../styles/stylesPublicaciones'

const urlPublicaciones = 'https://gestiona662-backend.vercel.app/v1/publications?page=1&limit=2'

const Publicaciones = ({ navigation }) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                const publicaciones = await fetch(urlPublicaciones, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await publicaciones.json();
                if (publicaciones.status === 200) {
                    setDatos(data.publications);
                } else {
                    setDatos([]);
                    setError('Error al obtener publicaciones');
                }
            } catch (err) {
                setDatos([]);
                setError('Error de red o servidor');
            }
            setLoading(false);
        };
        fetchPublicaciones();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesPublicaciones.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={stylesPublicaciones.headerTitle}>Búsqueda</Text>
                <View style={{ width: 28 }} />
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={stylesPublicaciones.container}>
                    <View style={stylesPublicaciones.row}>
                        <Text style={stylesPublicaciones.titulo}>Publicaciones</Text>
                        <TouchableOpacity style={stylesPublicaciones.filtrarBtn}>
                            <Text style={stylesPublicaciones.filtrarTxt}>Filtrar</Text>
                        </TouchableOpacity>
                    </View>
                    {loading ? (
                        <Text style={stylesPublicaciones.cargando}>Cargando publicaciones...</Text>
                    ) : error ? (
                        <Text style={stylesPublicaciones.error}>{error}</Text>
                    ) : (
                        datos.map(item => (
                            <View style={stylesPublicaciones.card} key={item._id}>
                                <View style={stylesPublicaciones.cardHeader}>
                                    <Text style={stylesPublicaciones.nombreEscuela}>Escuela Nº{item.schoolId?.slice(-3) || '---'}</Text>
                                    <View style={stylesPublicaciones.rating}>
                                        <FontAwesome name="star" size={20} color="#FFD700" />
                                        <Text style={stylesPublicaciones.ratingTxt}>{item.rating ?? '4.5'}</Text>
                                    </View>
                                </View>
                                <View style={stylesPublicaciones.cardRow}>
                                    <MaterialIcons name="trending-up" size={18} color={colores.primario} />
                                    <Text style={stylesPublicaciones.cardText}>{item.grade}° - {item.shift === 'MORNING' ? 'Mañana' : item.shift === 'AFTERNOON' ? 'Tarde' : item.shift === 'FULL' ? 'Tiempo Completo' : item.shift}</Text>
                                </View>
                                <View style={stylesPublicaciones.cardRow}>
                                    <MaterialIcons name="access-time" size={18} color={colores.primario} />
                                    <Text style={stylesPublicaciones.cardText}>
                                        {item.shift === 'MORNING' && '08:00 a 12:00'}
                                        {item.shift === 'AFTERNOON' && '12:00 a 17:00'}
                                        {item.shift === 'FULL' && '09:00 a 15:00'}
                                    </Text>
                                </View>
                                <View style={stylesPublicaciones.cardRow}>
                                    <MaterialIcons name="event" size={18} color={colores.primario} />
                                    <Text style={stylesPublicaciones.cardText}>
                                        {item.startDate?.slice(8, 10)}-{item.endDate?.slice(8, 10)} {item.endDate?.slice(5, 8).toUpperCase()} {item.endDate?.slice(0, 4)}
                                    </Text>
                                </View>
                                <View style={stylesPublicaciones.cardRow}>
                                    <MaterialIcons name="person" size={18} color={colores.primario} />
                                    <Text style={stylesPublicaciones.cardText}>
                                        {item.schoolAddress || 'Calle ...'}
                                    </Text>
                                </View>
                                <TouchableOpacity style={stylesPublicaciones.detallesBtn}>
                                    <Ionicons name="eye-outline" size={18} color="#fff" />
                                    <Text style={stylesPublicaciones.detallesTxt}>Ver Detalles</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default Publicaciones