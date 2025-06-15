import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const estilosPostulacionExitosa = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 0,
    },
    encabezado: {
        width: '100%',
        backgroundColor: '#009BDB',
        paddingVertical: height * 0.035,
        alignItems: 'center',
        marginBottom: 16,
    },
    tituloEncabezado: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    iconoContainer: {
        marginVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mensajePrincipal: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        marginHorizontal: 16,
    },
    mensajeSecundario: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 18,
        marginHorizontal: 16,
    },
    tituloDetalle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 4,
        textAlign: 'center',
    },
    detalle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 2,
        marginHorizontal: 16,
    },
    tituloDias: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
        textAlign: 'center',
    },
    dia: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 2,
    },
    mensajeCancelar: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 18,
        marginHorizontal: 16,
    },
    boton: {
        backgroundColor: '#009BDB',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 2,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
