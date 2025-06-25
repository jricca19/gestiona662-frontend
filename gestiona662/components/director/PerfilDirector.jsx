import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { desloguear } from '../../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';
import { stylesPerfil } from '../styles/stylesPerfil';
import FotoPerfilUploader from '../FotoPerfilUploader';

const PerfilDirector = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();

    // Estado para escuelas (simulado, deberías traerlo de tu backend)
    const [escuelas, setEscuelas] = useState(['335']);
    const [nuevaEscuela, setNuevaEscuela] = useState('');
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

    const handleAgregarEscuela = () => {
        if (nuevaEscuela && !escuelas.includes(nuevaEscuela)) {
            setEscuelas([...escuelas, nuevaEscuela]);
            setNuevaEscuela('');
        }
    };

    const handleEliminarEscuela = (codigo) => {
        setEscuelas(escuelas.filter(e => e !== codigo));
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
                        {/* Foto y nombre */}
                        <View style={stylesPerfil.avatarContainer}>
                            <FotoPerfilUploader
                                avatarStyle={stylesPerfil.avatar}
                                ciUsuario={usuario.ci}
                                profilePhoto={perfil?.profilePhoto}
                            />
                            <View>
                                <Text style={stylesPerfil.nombre}>{usuario.name} {usuario.lastName}</Text>
                                <Text style={stylesPerfil.rol}>Director</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={stylesPerfil.tituloSeccion}>Tus Datos</Text>
                            <View style={stylesPerfil.datosSeccion}>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="email" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.email || 'correo@dominio.com'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="phone" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.phoneNumber || '+59892654987'}</Text>
                                </View>
                                <View style={stylesPerfil.filaSeccion}>
                                    <MaterialIcons name="badge" size={18} color="#009fe3" style={stylesPerfil.iconoFila} />
                                    <Text style={stylesPerfil.textoFila}>{usuario.ci || '49088546'}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={stylesPerfil.botonEditar}>
                            <Text style={stylesPerfil.textoBotonEditar}>Editar Datos</Text>
                        </TouchableOpacity>

                        <Text style={stylesPerfil.tituloSeccion}>Tus Escuelas</Text>
                        <View style={stylesPerfil.escuelasContainer}>
                            <View style={stylesPerfil.filaEscuelaInput}>
                                <TextInput
                                    style={stylesPerfil.inputEscuela}
                                    value={nuevaEscuela}
                                    onChangeText={setNuevaEscuela}
                                    placeholder="Código"
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity onPress={handleAgregarEscuela} style={stylesPerfil.botonIcono}>
                                    <MaterialIcons name="add" size={24} color="#009fe3" />
                                </TouchableOpacity>
                            </View>
                            {escuelas.map((codigo, idx) => (
                                <View key={codigo} style={stylesPerfil.filaEscuela}>
                                    <Text style={stylesPerfil.codigoEscuela}>{codigo}</Text>
                                    <TouchableOpacity onPress={() => handleEliminarEscuela(codigo)} style={stylesPerfil.botonIcono}>
                                        <MaterialIcons name="delete" size={22} color="#009fe3" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        <View style={stylesPerfil.filaCalificacion}>
                            <FontAwesome name="star" size={20} color="#009fe3" style={stylesPerfil.icono} />
                            <Text style={stylesPerfil.textoCalificacion}>4.9</Text>
                        </View>

                        <TouchableOpacity style={stylesPerfil.botonCerrarSesion} onPress={handleLogout}>
                            <Text style={stylesPerfil.textoCerrarSesion}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default PerfilDirector;
