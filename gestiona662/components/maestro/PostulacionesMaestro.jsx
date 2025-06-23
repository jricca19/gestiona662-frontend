import { FlatList, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Ionicons } from '@expo/vector-icons'
import { estilosPostulaciones } from '../styles/stylesPostulacionesMaestro'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { colores } from '../styles/fuentesyColores'

const estados = {
    ACCEPTED: {
        label: 'Aceptada',
        style: estilosPostulaciones.estadoAceptada,
        color: colores.letrasExito
    },
    PENDING: {
        label: 'Pendiente',
        style: estilosPostulaciones.estadoPendiente,
        color: colores.letrasAdvertencia
    },
    FINALIZED: {
        label: 'Finalizada',
        style: estilosPostulaciones.estadoFinalizada,
        color: colores.tercearioOscuro
    },
    REJECTED: {
        label: 'Rechazada',
        style: estilosPostulaciones.estadoRechazada,
        color: colores.lestrasError
    },
}

const PostulacionesMaestro = ({ navigation }) => {
    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    const fetchPostulaciones = async () => {
        setLoading(true)
        setError(null)
        try {
            const token = await SecureStore.getItemAsync('token')
            const res = await fetch('https://gestiona662-backend.vercel.app/v1/postulations/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await res.json()
            if (res.status === 200) {
                setDatos(data)
            } else {
                setError('Error al obtener postulaciones')
            }
        } catch (err) {
            setError('Error de red o servidor')
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPostulaciones()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchPostulaciones().then(() => setRefreshing(false))
    }

    const renderItem = ({ item }) => {
        // Formatear días de postulación
        let fechas = ''
        if (item.appliesToAllDays) {
            fechas = 'Todos los días'
        } else if (item.postulationDays && item.postulationDays.length > 0) {
            fechas = item.postulationDays
                .map(d => format(parseISO(d.date), "d 'de' MMMM 'de' yyyy", { locale: es }))
                .join(', ')
        }

        const estado = estados[item.status] || { label: item.status, style: estilosPostulaciones.estadoPendiente, color: colores.quinto }
        const pub = item.publicationId || {}
        const escuela = pub.schoolId || {}

        return (
            <View style={estilosPostulaciones.tarjeta} key={item._id}>
                <View style={estilosPostulaciones.encabezadoTarjeta}>
                    <Text style={estilosPostulaciones.nombreEscuela}>
                        Escuela N°{escuela.schoolNumber}
                    </Text>
                    <View style={estado.style}>
                        <Text style={[estilosPostulaciones.textoEstado, { color: estado.color }]}>{estado.label}</Text>
                    </View>
                </View>
                <Text style={estilosPostulaciones.fechaTarjeta}>
                    {pub.grade ? `${pub.grade}° - ` : ''}
                    {pub.shift === 'MORNING' ? 'Mañana' : pub.shift === 'AFTERNOON' ? 'Tarde' : pub.shift === 'FULL' ? 'Tiempo Completo' : pub.shift}
                </Text>
                <Text style={estilosPostulaciones.fechaTarjeta}>{fechas}</Text>
                <TouchableOpacity
                    style={estilosPostulaciones.botonDetalles}
                    onPress={() => navigation.navigate('detallesPostulacion', { postulacion: item })}
                >
                    <Text style={estilosPostulaciones.textoDetalles}>Ver Detalles</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={estilosPostulaciones.encabezado}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={estilosPostulaciones.tituloEncabezado}>Postulaciones</Text>
                <View style={{ width: 28 }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={estilosPostulaciones.contenedor}>
                    {error ? (
                        <View style={{ alignItems: 'center', marginTop: 32 }}>
                            <Text style={estilosPostulaciones.error}>{error}</Text>
                            <TouchableOpacity
                                style={[estilosPostulaciones.botonDetalles, { marginTop: 16 }]}
                                onPress={() => {
                                    setError(null)
                                    fetchPostulaciones()
                                }}
                            >
                                <Text style={estilosPostulaciones.textoDetalles}>Reintentar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : loading ? (
                        <View style={estilosPostulaciones.spinnerCargando}>
                            <ActivityIndicator size="large" color="#0099e6" />
                        </View>
                    ) : (
                        <FlatList
                            data={datos}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            ListEmptyComponent={
                                <Text style={estilosPostulaciones.textoFinalLista}>
                                    No hay postulaciones para mostrar
                                </Text>
                            }
                            ListFooterComponent={
                                <Text style={estilosPostulaciones.textoFinalLista}>
                                    No hay más postulaciones para mostrar
                                </Text>
                            }
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            contentContainerStyle={{ paddingBottom: 50 }}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

export default PostulacionesMaestro