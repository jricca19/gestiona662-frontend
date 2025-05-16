import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/Test';

export default function App() {
  let nombre = 'Gestión de Activos';
  return (
    <>
      <View style={styles.container}>
        <Text>Título</Text>
        <Text>{nombre}</Text>
        <Test />
        <StatusBar style="auto" />
      </View>



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
