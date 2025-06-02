import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Completa todos los campos');
    return;
  }

  try {
    const response = await fetch('https://gestiona662-backend.vercel.app/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Éxito','Inicio de sesión correcto');
      // Aquí puedes guardar el token, navegar, etc.
    } else {
      Alert.alert('Error', data?.message || 'Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error en login:', error);
    Alert.alert('Error', 'No se pudo conectar con el servidor');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    marginTop: 100,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});