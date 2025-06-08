import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Menu from '../Menu';
import { Picker } from '@react-native-picker/picker';
import { stylesHome } from '../styles/stylesHome';

const HomeDirector = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);
    //TODO: reemplazar el array por una consulta
    const escuelas = ['335', '336', '337'];
    const [escuela, setEscuela] = useState(escuelas[0]);

    return (
        <View style={stylesHome.container}>

            <View style={stylesHome.header}>
                <Text style={stylesHome.headerText}>Gestiona 662</Text>
            </View>

            <Text style={stylesHome.welcome}>Bienvenido</Text>
            <Text style={stylesHome.name}>{`${name} ${lastName}`}</Text>

            <View style={stylesHome.escuelaContainer}>
                <Picker
                    selectedValue={escuela}
                    style={{ flex: 1, height: 56, width: '100%' }}
                    onValueChange={(itemValue) => setEscuela(itemValue)}
                    dropdownIconColor="#009fe3"
                >
                    {escuelas.map(e => (<Picker.Item key={e} label={e} value={e} />))}
                </Picker>
            </View>

            <View style={stylesHome.indicadoresContainer}>
                <View style={stylesHome.indicadorylabel}>
                    <View style={stylesHome.indicador}>
                        <MaterialIcons name="event-note" size={40} color="#009fe3" />
                        <Text style={stylesHome.indicadorNumero}>4</Text>
                    </View>
                    <Text style={stylesHome.indicadorLabel}>Publicaciones{"\n"}Activas</Text>
                </View>
                <View style={stylesHome.indicadorylabel}>
                    <View style={stylesHome.indicador}>
                        <MaterialIcons name="warning" size={40} color="#009fe3" />
                        <Text style={stylesHome.indicadorNumero}>1</Text>
                    </View>
                    <Text style={stylesHome.indicadorLabel}>Próximas a{"\n"}Vencer</Text>
                </View>
                <View style={stylesHome.indicadorylabel}>
                    <View style={stylesHome.indicador}>
                        <MaterialIcons name="pending-actions" size={40} color="#009fe3" />
                        <Text style={stylesHome.indicadorNumero}>2</Text>
                    </View>
                    <Text style={stylesHome.indicadorLabel}>Selección{"\n"}Pendiente</Text>
                </View>
            </View>

            <TouchableOpacity style={stylesHome.boton}>
                <MaterialIcons name="post-add" size={24} color="#fff" />
                <Text style={stylesHome.botonTexto}>Crear Publicación</Text>
            </TouchableOpacity>

            <Menu navigation={navigation} />
        </View>
    );
};

export default HomeDirector;
