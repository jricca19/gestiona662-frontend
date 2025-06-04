import { StyleSheet, Text, View,TextInput,Button,Alert } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const Registro = ({navigation}) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [ci, setCI] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('STAFF');
    const handleSignUp = async () => {
      if (!email || !password || !name || !lastName || !ci || !phoneNumber || !role) {
        Alert.alert('Error', 'Completa todos los campos');
        return;
      }
    
      try {
        const response = await fetch('https://gestiona662-backend.vercel.app/v1/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,lastName,ci,email,password,phoneNumber,role}),
        });
    
        const data = await response.json();
        console.log(data);
        if ((response.status === 201)) {
          Alert.alert('Éxito', 'Se ha registrado el usuario correctamente');
          // Aquí puedes guardar el token, navegar, etc.
        } else {
          Alert.alert('Error', data?.message || 'Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error en registro:', error);
        Alert.alert('Error', 'No se pudo conectar con el servidor');
      }
    };
    const handleLogin = () => {
    navigation.push("login")
  }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholder="C.I"
                value={ci}
                onChangeText={setCI}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <Text style={styles.label}>Rol</Text>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="STAFF" value="STAFF" />
                <Picker.Item label="TEACHER" value="TEACHER" />
            </Picker>

            <Button title="Registrar" onPress={handleSignUp} />
            <Button title="Ir al login" onPress={handleLogin} />
        </View>
    )
}

export default Registro

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
    picker: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
    }
})