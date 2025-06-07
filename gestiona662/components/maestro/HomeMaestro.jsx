import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Menu from '../Menu';

const HomeMaestro = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Gestiona 662</Text>
            </View>
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.name}>{`${name} ${lastName}`}</Text>
            <View style={styles.section}>
                <View style={styles.circle}>
                    <MaterialIcons name="work-outline" size={40} color="#009fe3" />
                    <Text style={styles.circleNumber}>3</Text>
                </View>
                <Text style={styles.circleLabel}>Postulaciones{"\n"}en Curso</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.circle}>
                    <MaterialIcons name="work-outline" size={40} color="#009fe3" />
                    <Text style={styles.circleNumber}>1</Text>
                </View>
                <Text style={styles.circleLabel}>Nuevas{"\n"}Publicaciones</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.circle}>
                    <MaterialIcons name="work-outline" size={40} color="#009fe3" />
                    <Text style={styles.circleNumber}>2</Text>
                </View>
                <Text style={styles.circleLabel}>Aceptadas</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <MaterialIcons name="search" size={24} color="#fff" />
                <Text style={styles.buttonText}>Buscar Publicación</Text>
            </TouchableOpacity>
            <Menu navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        backgroundColor: '#009fe3',
        paddingTop: 40,
        paddingBottom: 10,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    welcome: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        alignItems: 'center',
        marginVertical: 8,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#009fe3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    circleNumber: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 20,
    },
    circleLabel: {
        textAlign: 'center',
        color: '#009fe3',
        fontWeight: '500',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
});

export default HomeMaestro;
