import { View, Text, StyleSheet } from 'react-native';
import FormularioRegistro from './FormularioRegistro';

const Registro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <FormularioRegistro navigation={navigation} />
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});