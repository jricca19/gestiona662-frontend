import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Menu = ({ navigation }) => {
    const usuario = useSelector(state => state.usuario);
    const { role } = usuario;
    const rutaActual = navigation.getState().routes[navigation.getState().index].name;

    const handleNavigate = (screen, nombreRuta) => {
        // Si la pantalla actual es la misma que la que se quiere navegar, no hacer nada
        if (rutaActual === nombreRuta) return;
        if (role === 'TEACHER') {
            if (screen === 'home') navigation.replace('homeMaestro');
            else if (screen === 'list') navigation.navigate('misPostulaciones');
            else if (screen === 'profile') { navigation.navigate('perfilMaestro'); }
        }
        if (role === 'STAFF') {
            if (screen === 'home') navigation.replace('homeDirector');
            else if (screen === 'list') navigation.navigate('misPublicaciones');
            else if (screen === 'profile') navigation.navigate('perfilDirector');
        }
    };

    const rutas = role === 'TEACHER'
        ? { home: 'homeMaestro', list: 'misPostulaciones', profile: 'perfilMaestro' }
        : { home: 'homeDirector', list: 'misPublicaciones', profile: 'perfilDirector' };

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => handleNavigate('home', rutas.home)}>
                <Ionicons name="home" size={28} color="#009fe3" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('list', rutas.list)}>
                <Ionicons name="list-outline" size={28} color="#009fe3" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('profile', rutas.profile)}>
                <Ionicons name="person-circle-outline" size={28} color="#009fe3" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 10,
        zIndex: 100,
    },
});

export default Menu;