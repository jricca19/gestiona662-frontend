import { StyleSheet, Dimensions } from 'react-native';
import { fuentes, colores, tamanos } from './fuentesyColores';

const { width, height } = Dimensions.get('window');

export const stylesPerfil = StyleSheet.create({
    encabezado: {
        width: '100%',
        backgroundColor: colores.primario,
        paddingVertical: height * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    botonAtras: {
        marginHorizontal: width * 0.04,
    },
    contenedor: {
        flex: 1,
        backgroundColor: colores.terceario,
    },
    textoEncabezado: {
        color: colores.terceario,
        fontSize: tamanos.titulo1,
        fontWeight: 'bold',
    },
    contenidoScroll: {
        paddingTop: height * 0.025,
        paddingHorizontal: width * 0.05,
        gap: height * 0.018,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.012,
    },
    avatar: {
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: width * 0.04,
        backgroundColor: colores.secundarioClaro,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.04,
        position: 'relative',
    },
    nombre: {
        fontSize: tamanos.titulo2,
        fontWeight: 'bold',
        color: colores.primarioOscuro,
    },
    rol: {
        fontSize: tamanos.menu,
        color: colores.primario,
        fontWeight: '600',
    },
    tituloSeccion: {
        color: colores.primario,
        fontWeight: 'bold',
        fontSize: tamanos.subtitulo,
        marginTop: height * 0.012,
        marginBottom: height * 0.008,
    },
    datosSeccion: {
        backgroundColor: colores.terceario,
        borderRadius: width * 0.025,
        padding: width * 0.04,
        marginBottom: height * 0.018,
        elevation: 1,
        borderWidth: 1,
        borderColor: colores.tercearioOscuro,
    },
    filaSeccion: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.008,
    },
    iconoFila: {
        marginRight: width * 0.02,
    },
    textoFila: {
        fontSize: tamanos.texto,
        color: colores.primarioOscuro,
    },
    botonEditar: {
        backgroundColor: colores.primario,
        borderRadius: width * 0.02,
        paddingVertical: height * 0.018,
        alignItems: 'center',
        marginBottom: height * 0.025,
        marginTop: height * 0.012,
        elevation: 2,
    },
    textoBotonEditar: {
        color: colores.terceario,
        fontWeight: 'bold',
        fontSize: tamanos.texto,
    },
    escuelasContainer: {
        backgroundColor: colores.terceario,
        borderRadius: width * 0.025,
        padding: width * 0.04,
        marginBottom: height * 0.018,
        elevation: 1,
        borderWidth: 1,
        borderColor: colores.tercearioOscuro,
    },
    filaEscuelaInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.012,
    },
    inputEscuela: {
        flex: 1,
        borderColor: colores.secundario,
        borderWidth: 1,
        borderRadius: width * 0.015,
        padding: width * 0.02,
        marginRight: width * 0.02,
        backgroundColor: colores.terceario,
        color: colores.primarioOscuro,
    },
    botonIcono: {
        padding: width * 0.01,
    },
    filaEscuela: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.008,
    },
    codigoEscuela: {
        fontSize: tamanos.texto,
        color: colores.primarioOscuro,
        marginRight: width * 0.025,
    },
    filaCalificacion: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.018,
        marginLeft: width * 0.01,
    },
    textoCalificacion: {
        fontSize: tamanos.subtitulo,
        color: colores.primario,
        fontWeight: 'bold',
        marginLeft: width * 0.01,
    },
    botonCerrarSesion: {
        alignItems: 'center',
        marginTop: height * 0.012,
    },
    textoCerrarSesion: {
        color: colores.primario,
        fontWeight: 'bold',
        fontSize: tamanos.texto,
        textDecorationLine: 'underline',
    },
});
