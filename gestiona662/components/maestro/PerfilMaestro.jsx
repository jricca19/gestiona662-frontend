import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { desloguear } from '../../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';
import { stylesPerfil } from '../styles/stylesPerfil';

const PerfilMaestro = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("isLogged");
        await SecureStore.deleteItemAsync("usuario");
        dispatch(desloguear());
    };
    return (
        <View style={stylesPerfil.contenedor}>
            {/* Header */}
            <View style={stylesPerfil.encabezado}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={stylesPerfil.botonAtras}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={stylesPerfil.textoEncabezado}>Perfil</Text>
            </View>
            <ScrollView contentContainerStyle={stylesPerfil.contenidoScroll}>
                {/* Foto y nombre */}
                <View style={stylesPerfil.avatarContainer}>
                    <View style={stylesPerfil.avatar}>
                        <Ionicons name="person" size={60} color="#009fe3" />
                    </View>
                    <View>
                        <Text style={stylesPerfil.nombre}>{usuario.name} {usuario.lastName}</Text>
                        <Text style={stylesPerfil.rol}>Maestra</Text>
                    </View>
                </View>
                {/* Datos */}
                <View>
                    <Text style={stylesPerfil.tituloSeccion}>Tus Datos</Text>
                    <View style={stylesPerfil.datosSeccion}>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="email" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>{usuario.email || 'correo@dominio.com'}</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="phone" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>{usuario.phoneNumber || '+59800000000'}</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="badge" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>{usuario.ci || '12345678'}</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <Entypo name="location-pin" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>Calle 1234</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="event" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>10/05/2024</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="star" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>90</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="verified-user" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>Efectivo</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="health-and-safety" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>Vigente</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="description" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>20/06/2025</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <MaterialIcons name="schedule" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>Tarde</Text>
                        </View>
                        <View style={stylesPerfil.filaSeccion}>
                            <FontAwesome name="star" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                            <Text style={stylesPerfil.textoFila}>4.9</Text>
                        </View>
                    </View>
                </View>

                {/* Botón Editar Datos */}
                <TouchableOpacity style={stylesPerfil.botonEditar}>
                    <Text style={stylesPerfil.textoBotonEditar}>Editar Datos</Text>
                </TouchableOpacity>

                {/* Cerrar sesión */}
                <TouchableOpacity style={stylesPerfil.botonCerrarSesion} onPress={handleLogout}>
                    <Text style={stylesPerfil.textoCerrarSesion}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PerfilMaestro;
