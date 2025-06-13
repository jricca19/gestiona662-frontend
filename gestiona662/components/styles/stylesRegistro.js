import { StyleSheet } from 'react-native';

export const stylesRegistro = StyleSheet.create({
    encabezado: {
        width: '100%',
        backgroundColor: '#009fe3',
        paddingTop: 40,
        paddingBottom: 10,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    textoEncabezado: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    picker: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#009fe3',
    },
    botonRegistrarse: {
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    textoBotonRegistrarse: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#f7f7f7'
    }
});
