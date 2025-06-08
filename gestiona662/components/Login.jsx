import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loguear } from '../store/slices/usuarioSlice';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const handleLogin = async () => {
        if (!email || !password) {
            setError('Completa todos los campos');
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
                await SecureStore.setItemAsync("token", data.token);
                await SecureStore.setItemAsync("isLogged", "true");
                // Obtener perfil de usuario
                const profileResp = await fetch('https://gestiona662-backend.vercel.app/v1/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                        'Content-Type': 'application/json',
                    }
                });
                const profile = await profileResp.json();
                // Guardar perfil en SecureStore y store
                await SecureStore.setItemAsync("usuario", JSON.stringify({
                    name: profile.name,
                    lastName: profile.lastName,
                    email: profile.email,
                    role: profile.role,
                    ci: profile.ci,
                    phoneNumber: profile.phoneNumber
                }));
                dispatch(loguear({
                    name: profile.name,
                    lastName: profile.lastName,
                    email: profile.email,
                    role: profile.role,
                    ci: profile.ci,
                    phoneNumber: profile.phoneNumber
                }));
                Alert.alert('Éxito', 'Inicio de sesión correcto');
            } else {
                setError(data?.message || 'Credenciales inválidas');
            }
        } catch (error) {
            setError('No se pudo conectar con el servidor', error);
            console.error('Error en login:', error);
        }
    };
    const handleRegistro = () => {
        navigation.replace("registro");
    }
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
            <Button title="Registrarse" onPress={handleRegistro} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
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
    error: {

    }
});