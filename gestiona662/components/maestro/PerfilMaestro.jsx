import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { desloguear } from '../../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';

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
                    </View>
                    <View>
                        <Text style={styles.nombre}>{usuario.name} {usuario.lastName}</Text>
                        <Text style={styles.rol}>Maestra</Text>
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
                    <View style={styles.datoRow}>
                        <Entypo name="location-pin" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>Calle 1234</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="event" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>10/05/2024</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="star" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>90</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="verified-user" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>Efectivo</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="health-and-safety" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>Vigente</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="description" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>20/06/2025</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <MaterialIcons name="schedule" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>Tarde</Text>
                    </View>
                    <View style={styles.datoRow}>
                        <FontAwesome name="star" size={18} color="#009fe3" style={styles.icon} />
                        <Text style={styles.datoText}>4.9</Text>
                    </View>
                </View>
                {/* Botón Editar Datos */}
                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Editar Datos</Text>
                </TouchableOpacity>
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
        marginBottom: 10,
    },
    editBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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

export default PerfilMaestro;
