import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { estilosHome } from '../styles/stylesHome';

const HomeMaestro = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);

    return (
        <View style={estilosHome.contenedor}>

            <View style={estilosHome.encabezado}>
                <Text style={estilosHome.textoEncabezado}>Gestiona 662</Text>
            </View>

            <Text style={estilosHome.bienvenida}>Bienvenido</Text>
            <Text style={estilosHome.nombre}>{`${name} ${lastName}`}</Text>

            <View style={estilosHome.contenedorIndicadores}>
                <View style={estilosHome.indicadorYEtiqueta}>
                    <View style={estilosHome.indicador}>
                        <MaterialIcons name="event-note" size={40} color="#009fe3" />
                        <Text style={estilosHome.numeroIndicador}>4</Text>
                    </View>
                    <Text style={estilosHome.etiquetaIndicador}>Postulaciones{"\n"}en Curso</Text>
                </View>
                <View style={estilosHome.indicadorYEtiqueta}>
                    <View style={estilosHome.indicador}>
                        <MaterialIcons name="warning" size={40} color="#009fe3" />
                        <Text style={estilosHome.numeroIndicador}>1</Text>
                    </View>
                    <Text style={estilosHome.etiquetaIndicador}>Nuevas{"\n"}Publicaciones</Text>
                </View>
                <View style={estilosHome.indicadorYEtiqueta}>
                    <View style={estilosHome.indicador}>
                        <MaterialIcons name="pending-actions" size={40} color="#009fe3" />
                        <Text style={estilosHome.numeroIndicador}>2</Text>
                    </View>
                    <Text style={estilosHome.etiquetaIndicador}>A Cubrir</Text>
                </View>
            </View>

            <TouchableOpacity style={estilosHome.boton}>
                <MaterialIcons name="search" size={24} color="#fff" />
                <Text style={estilosHome.textoBoton}>Buscar Publicación</Text>
            </TouchableOpacity>

        </View>
    );
};

export default HomeMaestro;
