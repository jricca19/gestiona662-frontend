import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/Test';
import Login from './components/Login';
import Registro from './components/Registro';
import { NavigationContainer } from '@react-navigation/native';
import Pila from './routes/Pila';
import { store } from './store/store';
import * as SecureStore from 'expo-secure-store';
import { useState,useEffect} from 'react';
import { Provider } from 'react-redux';

export default function App() {
  const [isLogged, setIsLogged] = useState(null);
  useEffect(() => {
    const verificarSesion = async () =>{
      try {
        const isLoggedStorage=await SecureStore.getItemAsync("isLogged");
        if(isLoggedStorage==="true"){
          setIsLogged(true);
        }
        else{
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Error al verificar la sesión",error);
        setIsLogged(false);
      }
    }
    verificarSesion();
  }, [])
  
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Pila />
        </NavigationContainer>
      </Provider>
    </>
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
