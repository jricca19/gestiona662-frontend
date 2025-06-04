import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/Test';
import Login from './components/Login';
import Registro from './components/Registro';
import { NavigationContainer } from '@react-navigation/native';
import Pila from './routes/Pila';

export default function App() {
  return (
    <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Pila/>
        </NavigationContainer>
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
