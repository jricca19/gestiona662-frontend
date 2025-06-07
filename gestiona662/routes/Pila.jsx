import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/Login'
import Registro from '../components/Registro'
import HomeMaestro from '../components/maestro/HomeMaestro'
import HomeDirector from '../components/director/HomeDirector'
import PerfilMaestro from '../components/maestro/PerfilMaestro'
import PerfilDirector from '../components/director/PerfilDirector'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator();

function PilaMaestro() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeMaestro" component={HomeMaestro} options={{ headerShown: false }} />
      <Stack.Screen name="perfilMaestro" component={PerfilMaestro} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function PilaDirector() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeDirector" component={HomeDirector} options={{ headerShown: false }} />
      <Stack.Screen name="perfilDirector" component={PerfilDirector} options={{ headerShown: false }} />
    </Stack.Navigator>
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

const Pila = () => {
  const { logueado, role } = useSelector(state => state.usuario);

  if (!logueado) return <PilaInicio />;
  if (role === 'TEACHER') return <PilaMaestro />;
  return <PilaDirector />;
}

export default Pila

const styles = StyleSheet.create({})