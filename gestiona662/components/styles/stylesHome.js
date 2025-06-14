import { StyleSheet, Dimensions } from 'react-native';
import { fuentes, colores, tamanos } from './fuentesyColores'

const { width, height } = Dimensions.get('window');

export const estilosHome = StyleSheet.create({
    encabezado: {
        width: '100%',
        backgroundColor: colores.primario,
        paddingVertical: height * 0.01,
        alignItems: 'center',
    },
    textoEncabezado: {
        color: colores.terceario,
        fontSize: tamanos.titulo1,
        fontWeight: 'bold',
    },
    contenedor: {
        flex: 1,
        backgroundColor: colores.terceario,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    bienvenida: {
        padding: height * 0.025,
    },
    bienvenidaContenido: {
        fontSize: tamanos.titulo2,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contenedorEscuela: {
        margin: height * 0.025,
        backgroundColor: colores.cuarto,
        borderRadius: width * 0.015,
        paddingHorizontal: width * 0.025,
        borderWidth: 1,
        borderColor: colores.tercearioOscuro,
        width: width * 0.5,
        height: height * 0.07,
        alignSelf: 'center',
    },
    contenedorIndicadores: {
        width: '100%',
        alignItems: 'center',
    },
    filaIndicadores: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: height * 0.012,
        gap: width * 0.15,
    },
    indicadorYEtiqueta: {
        marginVertical: height * 0.012,
        alignItems: 'center',
        width: width * 0.25,
    },
    indicador: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colores.secundarioClaro,
        width: width * 0.25,
        height: width * 0.25,
        elevation: 5,
        borderRadius: (width * 0.25),
        borderWidth: 2,
        borderColor: colores.primario,
    },
    numeroIndicador: {
        color: colores.primario,
        fontWeight: 'bold',
        fontSize: tamanos.subtitulo,
    },
    etiquetaIndicador: {
        textAlign: 'center',
        color: colores.primarioOscuro,
        fontWeight: '500',
        fontSize: tamanos.menu,
    },
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colores.primario,
        borderRadius: width * 0.02,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.08,
        marginTop: height * 0.012,
        marginBottom: height * 0.037,
        elevation: 2,
    },
    textoBoton: {
        color: colores.terceario,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
        fontSize: tamanos.texto,
    },
});
