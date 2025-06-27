import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { estilosHome } from '../styles/stylesHome';

const HomeDirector = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);
    //TODO: reemplazar el array por una consulta
    const escuelas = ['335', '336', '337'];
    const [escuela, setEscuela] = useState(escuelas[0]);

    return (
        <View style={{ flex: 1 }}>
            <View style={estilosHome.encabezado}>
                <Text style={estilosHome.textoEncabezado}>Gestiona 662</Text>
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32}}>
                <View style={estilosHome.contenedor}>
                    <View>
                        <View style={estilosHome.bienvenida}>
                            <Text style={estilosHome.bienvenidaContenido}>Bienvenid@</Text>
                            <Text style={estilosHome.bienvenidaContenido}>{`${name} ${lastName}`}</Text>
                        </View>
                        <Text style={estilosHome.titiloContenedorEscuela}>Tus Escuelas</Text>
                        <View style={estilosHome.contenedorEscuela}>
                            <Picker
                                selectedValue={escuela}
                                style={{ flex: 1, height: 56, width: '100%' }}
                                onValueChange={(itemValue) => setEscuela(itemValue)}
                                dropdownIconColor="#009fe3"
                            >
                                {escuelas.map(e => (<Picker.Item key={e} label={e} value={e} />))}
                            </Picker>
                        </View>
                    </View>
                    <View style={estilosHome.contenedorIndicadores}>
                        <View style={estilosHome.filaIndicadores}>
                            <View style={estilosHome.indicadorYEtiqueta}>
                                <View style={estilosHome.indicador}>
                                    <MaterialIcons name="event-note" size={40} color="#009fe3" />
                                    <Text style={estilosHome.numeroIndicador}>4</Text>
                                </View>
                                <Text style={estilosHome.etiquetaIndicador}>Publicaciones{"\n"}Activas</Text>
                            </View>
                            <View style={estilosHome.indicadorYEtiqueta}>
                                <View style={estilosHome.indicador}>
                                    <MaterialIcons name="warning" size={40} color="#009fe3" />
                                    <Text style={estilosHome.numeroIndicador}>1</Text>
                                </View>
                                <Text style={estilosHome.etiquetaIndicador}>Próximas a{"\n"}Vencer</Text>
                            </View>
                        </View>
                        <View style={estilosHome.filaIndicadores}>
                            <View style={estilosHome.indicadorYEtiqueta}>
                                <View style={estilosHome.indicador}>
                                    <MaterialIcons name="pending-actions" size={40} color="#009fe3" />
                                    <Text style={estilosHome.numeroIndicador}>2</Text>
                                </View>
                                <Text style={estilosHome.etiquetaIndicador}>Selección{"\n"}Pendiente</Text>
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
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeDirector;
