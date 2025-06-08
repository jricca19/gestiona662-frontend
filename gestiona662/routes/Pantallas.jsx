import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../components/Login'
import Registro from '../components/Registro'
import HomeMaestro from '../components/maestro/HomeMaestro'
import HomeDirector from '../components/director/HomeDirector'
import PerfilMaestro from '../components/maestro/PerfilMaestro'
import PerfilDirector from '../components/director/PerfilDirector'
import PostulacionesMaestro  from '../components/maestro/PostulacionesMaestro'
import PublicacionesDirector from '../components/director/PublicacionesDirector'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MaestroTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#009fe3',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 60 },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'homeMaestro') return <Ionicons name="home" size={size} color={color} />;
          if (route.name === 'misPostulaciones') return <Ionicons name="list-outline" size={size} color={color} />;
          if (route.name === 'perfilMaestro') return <Ionicons name="person-circle-outline" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="homeMaestro" component={HomeMaestro} options={{ title: 'Inicio' }} />
      <Tab.Screen name="misPostulaciones" component={PostulacionesMaestro} options={{ title: 'Postulaciones' }} />
      <Tab.Screen name="perfilMaestro" component={PerfilMaestro} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

function DirectorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#009fe3',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 60 },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'homeDirector') return <Ionicons name="home" size={size} color={color} />;
          if (route.name === 'misPublicaciones') return <Ionicons name="list-outline" size={size} color={color} />;
          if (route.name === 'perfilDirector') return <Ionicons name="person-circle-outline" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="homeDirector" component={HomeDirector} options={{ title: 'Inicio' }} />
      <Tab.Screen name="misPublicaciones" component={PublicacionesDirector} options={{ title: 'Publicaciones' }} />
      <Tab.Screen name="perfilDirector" component={PerfilDirector} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

function PilaInicio() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="registro" component={Registro} />
    </Stack.Navigator>
  );
}

const Pantallas = () => {
  const { logueado, role } = useSelector(state => state.usuario);

  if (!logueado) return <PilaInicio />;
  if (role === 'TEACHER') return <MaestroTabs />;
  return <DirectorTabs />;
}

export default Pantallas