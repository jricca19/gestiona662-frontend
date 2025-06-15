import { StyleSheet, Dimensions } from 'react-native'
import { colores, tamanos } from './fuentesyColores'

const { width, height } = Dimensions.get('window');

export const estilosPublicaciones = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: '100%',
        backgroundColor: colores.terceario,
        paddingTop: 0,
    },
    encabezado: {
        backgroundColor: colores.primario,
        paddingVertical: height * 0.01,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    tituloEncabezado: {
        color: colores.terceario,
        fontSize: tamanos.titulo1,
        fontWeight: 'bold',
    },
    botonAtras: {
        marginHorizontal: width * 0.04,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.04,
        elevation: 6,
        backgroundColor: colores.terceario,
        borderBottomWidth: 1,
        borderColor: colores.tercearioOscuro,
    },
    titulo: {
        fontSize: tamanos.titulo2,
        fontWeight: 'bold',
        color: colores.quinto,
    },
    botonFiltrar: {
        backgroundColor: colores.primario,
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 16,
        elevation: 6,
    },
    textoFiltrar: {
        color: colores.terceario,
        fontWeight: 'bold',
        fontSize: tamanos.texto,
    },
    tarjeta: {
        backgroundColor: colores.secundarioClaro,
        borderRadius: 16,
        padding: 12,
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.01,
        elevation: 6,
    },
    encabezadoTarjeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nombreEscuela: {
        fontSize: tamanos.subtitulo,
        fontWeight: 'bold',
        color: colores.primarioOscuro,
    },
    calificacion: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    textoCalificacion: {
        marginLeft: 4,
        fontWeight: 'bold',
        color: colores.quinto,
        fontSize: tamanos.texto,
    },
    filaTarjeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.005,
    },
    textoTarjeta: {
        marginLeft: 8,
        fontSize: tamanos.texto,
        color: colores.quinto,
    },
    botonDetalles: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: colores.primario,
        borderRadius: 8,
        paddingHorizontal: 15,
        elevation: 6,
    },
    textoDetalles: {
        color: colores.terceario,
        fontWeight: 'bold',
        marginLeft: 4,
        fontSize: tamanos.menu,
    },
    cargando: {
        marginTop: 32,
        textAlign: 'center',
        fontSize: tamanos.texto,
        color: colores.quinto,
    },
    error: {
        marginTop: 32,
        textAlign: 'center',
        fontSize: tamanos.texto,
        color: 'red',
    }
});
