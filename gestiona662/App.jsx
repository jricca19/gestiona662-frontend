import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Pantallas from './routes/Pantallas';
import { store } from './store/store';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { loguear, desloguear } from './store/slices/usuarioSlice';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const isLoggedStorage = await SecureStore.getItemAsync("isLogged");
        if (isLoggedStorage === "true") {
          // Restaurar perfil de usuario
          const usuarioStr = await SecureStore.getItemAsync("usuario");
          if (usuarioStr) {
            const usuario = JSON.parse(usuarioStr);
            dispatch(loguear(usuario));
          } else {
            // Si no hay datos de usuario en SecureStore, limpiar el estado del store
            dispatch(desloguear());
          }
        } else {
          // Si no está logueado limpiar el estado del store
          dispatch(desloguear());
        }
      } catch (error) {
        dispatch(desloguear());
      } finally {
        setLoading(false);
      }
    }
    verificarSesion();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Pantallas />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
