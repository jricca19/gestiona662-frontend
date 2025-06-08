import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Menu from '../Menu';
import { stylesHome } from '../styles/stylesHome';

const HomeMaestro = ({ navigation }) => {
    const { name, lastName } = useSelector(state => state.usuario);

    return (
        <View style={stylesHome.container}>

            <View style={stylesHome.header}>
                <Text style={stylesHome.headerText}>Gestiona 662</Text>
            </View>

            <Text style={stylesHome.welcome}>Bienvenido</Text>
            <Text style={stylesHome.name}>{`${name} ${lastName}`}</Text>

            <View style={stylesHome.indicadoresContainer}>
                <View style={stylesHome.indicadorylabel}>
                    <View style={stylesHome.indicador}>
                        <MaterialIcons name="event-note" size={40} color="#009fe3" />
                        <Text style={stylesHome.indicadorNumero}>4</Text>
                    </View>
                    <Text style={stylesHome.indicadorLabel}>Postulaciones{"\n"}en Curso</Text>
                </View>
                <View style={stylesHome.indicadorylabel}>
                    <View style={stylesHome.indicador}>
                        <MaterialIcons name="warning" size={40} color="#009fe3" />
                        <Text style={stylesHome.indicadorNumero}>1</Text>
                    </View>
                    <Text style={stylesHome.indicadorLabel}>Nuevas{"\n"}Publicaciones</Text>
                </View>
                <View style={stylesHome.indicadorylabel}>
                    <View style={stylesHome.indicador}>
                        <MaterialIcons name="pending-actions" size={40} color="#009fe3" />
                        <Text style={stylesHome.indicadorNumero}>2</Text>
                    </View>
                    <Text style={stylesHome.indicadorLabel}>A Cubrir</Text>
                </View>
            </View>

            <TouchableOpacity style={stylesHome.boton}>
                <MaterialIcons name="search" size={24} color="#fff" />
                <Text style={stylesHome.botonTexto}>Buscar Publicación</Text>
            </TouchableOpacity>

            <Menu navigation={navigation} />
        </View>
    );
};

export default HomeMaestro;
