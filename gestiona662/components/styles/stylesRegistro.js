import { StyleSheet, Dimensions } from 'react-native';
import { fuentes, colores, tamanos } from './fuentesyColores';
const { width, height } = Dimensions.get('window');

export const stylesRegistro = StyleSheet.create({
    contenedor: {
        padding: 20,
        justifyContent: 'center',
        marginBottom: 100,
        backgroundColor: colores.terceario,
    },
    encabezado: {
        width: '100%',
        backgroundColor: '#009fe3',
        paddingTop: 40,
        paddingBottom: 10,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    textoEncabezado: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#009fe3',
    },
    label: {
        color: '#009fe3',
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 14,
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    picker: {
        marginBottom: 10,
    },
    botonRegistrarse: {
        backgroundColor: '#009fe3',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    textoBotonRegistrarse: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    filaIcono: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconSeparado: {
        marginRight: 10,
    },
    encabezadoConFlecha: {
  width: '100%',
  backgroundColor: colores.primario,
  paddingVertical: height * 0.01,
  justifyContent: 'center',
  position: 'relative',
},

iconoAtrasWrapper: {
  position: 'absolute',
  left: width * 0.05,
  zIndex: 2,
},

textoEncabezadoConFlecha: {
  textAlign: 'center',
  color: colores.terceario,
  fontSize: tamanos.titulo1,
  fontWeight: 'bold',
},
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    checkboxLabel: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
    },
    inputWrapper: {
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
},

inputConOjo: {
  backgroundColor: 'white',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 15,
  paddingRight: 40,
  fontSize: 16,
  color: '#333',
  width: '100%',
  height: 48, // Fijamos altura
},

iconoOjo: {
  position: 'absolute',
  right: 10,
  top: 12, // Cálculo manual exacto
  zIndex: 1,
},
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botonAgregarEscuela: {
    width: 40,
    height: 40,
    backgroundColor: colores.primario,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  botonAgregarTexto: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -2
  },
});
