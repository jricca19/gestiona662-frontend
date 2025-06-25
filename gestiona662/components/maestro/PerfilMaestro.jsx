import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { desloguear } from '../../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';
import { stylesPerfil } from '../styles/stylesPerfil';
import FotoPerfilUploader from '../FotoPerfilUploader';
import { useEffect, useState } from 'react';

const PerfilMaestro = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            const token = await SecureStore.getItemAsync('token');
            const resp = await fetch('https://gestiona662-backend.vercel.app/v1/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await resp.json();
            setPerfil(data);
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
            <View style={stylesPerfil.encabezado}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={stylesPerfil.botonAtras}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={stylesPerfil.textoEncabezado}>Perfil</Text>
            </View>
            <ScrollView>
                <View style={stylesPerfil.contenedor}>
                    <ScrollView contentContainerStyle={stylesPerfil.contenidoScroll}>
                        <View style={stylesPerfil.avatarContainer}>
                            <FotoPerfilUploader
                                avatarStyle={stylesPerfil.avatar}
                                ciUsuario={usuario.ci}
                                profilePhoto={perfil?.profilePhoto}
                            />
                            <View>
                                <Text style={stylesPerfil.nombre}>{usuario.name} {usuario.lastName}</Text>
                                <Text style={stylesPerfil.rol}>Maestra</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={stylesPerfil.tituloSeccion}>Tus Datos</Text>
                            <View style={stylesPerfil.datosSeccion}>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="email" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.email || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="phone" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.phoneNumber || '+No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="badge" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.ci || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <Entypo name="location-pin" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.address || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="event" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.birthDate || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="star" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.competitionNumber || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="verified-user" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.isEffectiveTeacher ? 'Efectivo' : 'No Efectivo'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="health-and-safety" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.healthCertificateStatus || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="description" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.criminalRecordDate || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="schedule" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.shift || 'No disponible'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <FontAwesome name="star" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.rating || '0'}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={stylesPerfil.botonEditar}>
                            <Text style={stylesPerfil.textoBotonEditar}>Editar Datos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={stylesPerfil.botonCerrarSesion} onPress={handleLogout}>
                            <Text style={stylesPerfil.textoCerrarSesion}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default PerfilMaestro;
