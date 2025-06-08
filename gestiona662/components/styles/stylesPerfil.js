import { StyleSheet } from 'react-native';

export const stylesPerfil = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    encabezado: {
        width: '100%',
        backgroundColor: '#009fe3',
        paddingTop: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    botonAtras: {
        marginLeft: 10,
        marginRight: 10,
    },
    textoEncabezado: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    contenidoScroll: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
        gap: 15,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#e0f2fb',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        position: 'relative',
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
    tituloSeccion: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 8,
    },
    datosSeccion: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 1,
    },
    filaSeccion: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
    iconoFila: {
        marginRight: 8,
    },
    textoFila: {
        fontSize: 15,
        color: '#333',
    },
    botonEditar: {
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 18,
        marginTop: 5,
    },
    textoBotonEditar: {
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
    filaEscuelaInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputEscuela: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginRight: 8,
        backgroundColor: '#f7f7f7',
    },
    botonIcono: {
        padding: 4,
    },
    filaEscuela: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    codigoEscuela: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    filaCalificacion: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 2,
    },
    textoCalificacion: {
        fontSize: 16,
        color: '#009fe3',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    botonCerrarSesion: {
        alignItems: 'center',
        marginTop: 10,
    },
    textoCerrarSesion: {
        color: '#009fe3',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
