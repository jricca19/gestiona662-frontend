import { StyleSheet, Dimensions } from 'react-native'
import { colores, tamanos } from './fuentesyColores'
import { he } from 'date-fns/locale';

const { width, height } = Dimensions.get('window');

export const estilosPublicacionesDirector = StyleSheet.create({
    encabezado: {
        width: '100%',
        backgroundColor: colores.primario,
        paddingVertical: height * 0.01,
        justifyContent: 'center',
        position: 'relative',
    },
    textoEncabezado: {
        textAlign: 'center',
        color: colores.terceario,
        fontSize: tamanos.titulo1,
        fontWeight: 'bold',
    },
    selectEscuelasDirector: {
        color: 'white',
        width: '100%',
        fontSize: 16,
    },

    pickerWrapper: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 6,
        overflow: 'hidden',
        width: width * 0.30,
        height: height * 0.05,
        justifyContent: 'center',
    },
    filaEncabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    // Agrega a tu StyleSheet
    acciones: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 2,
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconShadow: {
        textShadowColor: '#7ec3d6',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});
