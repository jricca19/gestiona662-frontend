import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { desloguear } from '../../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';

const PerfilDirector = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();

    // Estado para escuelas (simulado, deberías traerlo de tu backend)
    const [escuelas, setEscuelas] = useState(['335']);
    const [nuevaEscuela, setNuevaEscuela] = useState('');

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
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Perfil</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Foto y nombre */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={60} color="#009fe3" />
                        <Ionicons name="md-checkmark-circle" size={20} color="#009fe3" style={styles.avatarBadge} />
                    </View>
                    <View>
                        <Text style={styles.nombre}>{usuario.name} {usuario.lastName}</Text>
                        <Text style={styles.rol}>Director</Text>
                    </View>
                </View>
                {/* Datos */}
                <Text style={styles.sectionTitle}>Tus Datos</Text>
                <View style={styles.datosContainer}>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="email" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>{usuario.email || 'correo@dominio.com'}</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="phone" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>{usuario.phoneNumber || '+59892654987'}</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="badge" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>{usuario.ci || '49088546'}</Text>
                    </View>
                </View>
                {/* Botón Editar Datos */}
                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Editar Datos</Text>
                </TouchableOpacity>
                {/* Escuelas */}
                <Text style={styles.sectionTitle}>Tus Escuelas</Text>
                <View style={styles.escuelasContainer}>
                    <View style={styles.escuelaInputRow}>
                        <TextInput
                            style={styles.escuelaInput}
                            value={nuevaEscuela}
                            onChangeText={setNuevaEscuela}
                            placeholder="Código"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity onPress={handleAgregarEscuela} style={styles.iconBtn}>
                            <MaterialIcons name="add" size={24} color="#009fe3" />
                        </TouchableOpacity>
                    </View>
                    {escuelas.map((codigo, idx) => (
                        <View key={codigo} style={styles.escuelaRow}>
                            <Text style={styles.escuelaCodigo}>{codigo}</Text>
                            <TouchableOpacity onPress={() => handleEliminarEscuela(codigo)} style={styles.iconBtn}>
                                <MaterialIcons name="delete" size={22} color="#009fe3" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                {/* Calificación */}
                <View style={styles.ratingRow}>
                    <FontAwesome name="star" size={20} color="#009fe3" style={styles.icon} />
                    <Text style={styles.ratingText}>4.9</Text>
                </View>
                {/* Cerrar sesión */}
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        width: '100%',
        backgroundColor: '#009fe3',
        paddingTop: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    backBtn: {
        marginLeft: 10,
        marginRight: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e0f2fb',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        position: 'relative',
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 0,
        right: -8,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    rol: {
        fontSize: 15,
        color: '#009fe3',
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 8,
    },
    datosContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 1,
    },
    datoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
    icon: {
        marginRight: 8,
    },
    datoText: {
        fontSize: 15,
        color: '#333',
    },
    editBtn: {
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 18,
        marginTop: 5,
    },
    editBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    escuelasContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 1,
    },
    escuelaInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    escuelaInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginRight: 8,
        backgroundColor: '#f7f7f7',
    },
    iconBtn: {
        padding: 4,
    },
    escuelaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    escuelaCodigo: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 2,
    },
    ratingText: {
        fontSize: 16,
        color: '#009fe3',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    logoutBtn: {
        alignItems: 'center',
        marginTop: 10,
    },
    logoutText: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default PerfilDirector;
