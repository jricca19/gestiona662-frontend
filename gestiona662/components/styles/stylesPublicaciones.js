import { StyleSheet, Dimensions } from 'react-native'
import { colores, tamanos } from './fuentesyColores'

const { width, height } = Dimensions.get('window');

export const estilosPublicaciones = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: '90%',
        backgroundColor: colores.terceario,
        paddingTop: 0,
    },
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colores.primario,
        paddingVertical: height * 0.01,
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    tituloEncabezado: {
        color: '#fff',
        fontSize: tamanos.titulo2,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        marginTop: 8,
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
        elevation: 2,
    },
    textoFiltrar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: tamanos.texto,
    },
    tarjeta: {
        backgroundColor: colores.secundarioClaro,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        marginBottom: 4,
        gap: 8,
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
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginTop: 8,
    },
    textoDetalles: {
        color: '#fff',
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
