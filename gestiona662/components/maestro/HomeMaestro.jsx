import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { estilosHome } from '../styles/stylesHome';

const HomeMaestro = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);

    return (
        <View style={{ flex: 1 }}>
            <View style={estilosHome.encabezado}>
                <Text style={estilosHome.textoEncabezado}>Gestiona 662</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={estilosHome.contenedor}>

                    <View style={estilosHome.bienvenida}>
                        <Text style={estilosHome.bienvenidaContenido}>Bienvenid@</Text>
                        <Text style={estilosHome.bienvenidaContenido}>{`${name} ${lastName}`}</Text>
                    </View>

                    <View style={estilosHome.contenedorIndicadores}>
                        <View style={estilosHome.filaIndicadores}>
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
                        </View>
                        <View style={estilosHome.filaIndicadores}>
                            <View style={estilosHome.indicadorYEtiqueta}>
                                <View style={estilosHome.indicador}>
                                    <MaterialIcons name="work" size={40} color="#009fe3" />
                                    <Text style={estilosHome.numeroIndicador}>2</Text>
                                </View>
                                <Text style={estilosHome.etiquetaIndicador}>Aceptadas</Text>
                            </View>
                            <View style={estilosHome.indicadorYEtiqueta}>
                                <View style={estilosHome.indicador}>
                                    <MaterialIcons name="verified" size={40} color="#009fe3" />
                                    <Text style={estilosHome.numeroIndicador}>6</Text>
                                </View>
                                <Text style={estilosHome.etiquetaIndicador}>Concretadas</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={estilosHome.boton}
                        onPress={() => navigation.navigate('Publicaciones')}
                    >
                        <MaterialIcons name="search" size={24} color="#fff" />
                        <Text style={estilosHome.textoBoton}>Buscar Publicación</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeMaestro;
