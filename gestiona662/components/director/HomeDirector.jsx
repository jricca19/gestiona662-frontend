import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Menu from '../Menu';

const HomeDirector = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);
    const [escuela, setEscuela] = useState('335');
    // Puedes reemplazar el array por una consulta real si tienes varias escuelas
    const escuelas = ['335', '336', '337'];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Gestiona 662</Text>
            </View>
            {/* Bienvenida */}
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.name}>[{name} {lastName}]</Text>
            {/* Selector de Escuela */}
            <View style={styles.escuelaContainer}>
                <TextInput
                    style={styles.escuelaInput}
                    value={escuela}
                    editable={false}
                />
                <Entypo name="chevron-down" size={24} color="#009fe3" style={styles.escuelaIcon} />
                {/* Si quieres un Picker real, descomenta esto y comenta el TextInput+Icon
                <Picker
                    selectedValue={escuela}
                    style={styles.escuelaPicker}
                    onValueChange={(itemValue) => setEscuela(itemValue)}
                >
                    {escuelas.map(e => (
                        <Picker.Item key={e} label={e} value={e} />
                    ))}
                </Picker>
                */}
            </View>
            {/* Indicadores */}
            <View style={styles.indicadoresContainer}>
                <View style={styles.indicador}>
                    <MaterialIcons name="event-note" size={40} color="#009fe3" />
                    <Text style={styles.indicadorNumero}>4</Text>
                    <Text style={styles.indicadorLabel}>Publicaciones{"\n"}Activas</Text>
                </View>
                <View style={styles.indicador}>
                    <MaterialIcons name="warning" size={40} color="#009fe3" />
                    <Text style={styles.indicadorNumero}>1</Text>
                    <Text style={styles.indicadorLabel}>Próximas a{"\n"}Vencer</Text>
                </View>
                <View style={styles.indicador}>
                    <MaterialIcons name="pending-actions" size={40} color="#009fe3" />
                    <Text style={styles.indicadorNumero}>2</Text>
                    <Text style={styles.indicadorLabel}>Selección{"\n"}Pendiente</Text>
                </View>
            </View>
            {/* Botón Crear Publicación */}
            <TouchableOpacity style={styles.crearBtn}>
                <MaterialIcons name="post-add" size={24} color="#fff" />
                <Text style={styles.crearBtnText}>Crear Publicación</Text>
            </TouchableOpacity>
            {/* Footer */}
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
    escuelaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: 120,
        alignSelf: 'center',
    },
    escuelaInput: {
        flex: 1,
        height: 36,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    escuelaIcon: {
        marginLeft: 4,
    },
    // escuelaPicker: {
    //     width: 120,
    //     height: 36,
    // },
    indicadoresContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    indicador: {
        alignItems: 'center',
        marginVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 120,
        paddingVertical: 10,
        marginBottom: 10,
        elevation: 1,
    },
    indicadorNumero: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 2,
    },
    indicadorLabel: {
        textAlign: 'center',
        color: '#009fe3',
        fontWeight: '500',
        fontSize: 14,
        marginTop: 2,
    },
    crearBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 10,
        marginBottom: 30,
        elevation: 2,
    },
    crearBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
});

export default HomeDirector;
