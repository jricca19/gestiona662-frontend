import { Dimensions, StyleSheet } from 'react-native';
import { colores } from './fuentesyColores';

const { width, height } = Dimensions.get('window');

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
        color: colores.cuarto,
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
        color: colores.primario,
        fontWeight: 'bold',
        fontSize: 14
    },
    titulo: {
        fontSize: 24,
        marginBottom: height * 0.05,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 14,
        marginBottom: height * 0.05,
        textAlign: 'center'
    },
    container: {
        padding: width * 0.07,
        justifyContent: 'center',
        margin: width * 0.08,
        backgroundColor: colores.terceario
    },
    filaInput: {
        marginBottom: width * 0.02,
    },
    input: {
        backgroundColor: colores.cuarto,
        borderColor: colores.tercearioOscuro,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        color: colores.quinto,
    },
    error: {
        marginLeft: width * 0.02,
        color: colores.letrasError,
    }
});
