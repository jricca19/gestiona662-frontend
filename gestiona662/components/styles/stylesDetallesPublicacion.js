import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const estilosDetalles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    encabezado: {
        backgroundColor: '#009BDB',
        paddingVertical: height * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.04,
    },
    tituloEncabezado: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    contenidoScroll: {
        alignItems: 'center',
        padding: 20,
    },
    nombreEscuela: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 10,
        marginBottom: 8,
        textAlign: 'center',
    },
    tituloSeccion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 8,
        textAlign: 'center',
    },
    direccion: {
        fontSize: 15,
        color: '#444',
        marginBottom: 18,
        textAlign: 'center',
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
        marginTop: 8,
    },
    tarjeta: {
        backgroundColor: '#E6F4FB',
        borderRadius: 12,
        padding: 18,
        width: width * 0.4,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 2,
    },
    etiquetaTarjeta: {
        color: '#009BDB',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    valorTarjeta: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
    },
    subValorTarjeta: {
        fontSize: 13,
        color: '#444',
        marginTop: 2,
    },
    tituloMes: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
        alignSelf: 'flex-start',
        marginLeft: 8,
    },
    filaDia: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3E0F7',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        width: '100%',
    },
    etiquetaDia: {
        fontSize: 16,
        color: '#222',
    },
    boton: {
        backgroundColor: '#009BDB',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 24,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 2,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    checkbox: {
        // Puedes personalizar si lo deseas, o dejar vacío si solo se usa para el View
    }
})
