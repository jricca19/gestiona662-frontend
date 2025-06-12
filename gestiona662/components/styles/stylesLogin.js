import { StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
    logo: {
        width: 100,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    botonIniciarSesion: {
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    textoBotonIniciarSesión: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botonRegistrarse: {
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    textoBotonRegistrarse: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botonRecuperar: {
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 5
    },
    textoBotonRecuperar: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 14
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center'
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#f7f7f7'
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});
