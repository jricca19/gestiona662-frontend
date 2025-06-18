import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { loguear } from '../store/slices/usuarioSlice';
import { stylesLogin } from './styles/stylesLogin';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .required('La contraseña es obligatoria'),
});

const FormularioLogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await fetch('https://gestiona662-backend.vercel.app/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await SecureStore.setItemAsync("token", data.token);
        await SecureStore.setItemAsync("isLogged", "true");

        const profileResp = await fetch('https://gestiona662-backend.vercel.app/v1/users/profile', {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json',
          }
        });

        const profile = await profileResp.json();

        const usuario = {
          name: profile.name,
          lastName: profile.lastName,
          email: profile.email,
          role: profile.role,
          ci: profile.ci,
          phoneNumber: profile.phoneNumber
        };

        await SecureStore.setItemAsync("usuario", JSON.stringify(usuario));
        dispatch(loguear(usuario));

        Alert.alert('Éxito', 'Inicio de sesión correcto');
      } else {
        Alert.alert('Error', data?.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  const irARegistro = () => {
    navigation.replace("registro");
  };

  return (
    <View style={stylesLogin.container}>
      <Image
        source={require('../assets/logo-login.png')}
        style={stylesLogin.logo}
      />
      <Text style={stylesLogin.titulo}>Bienvenido a Gestiona662</Text>
      <Text style={stylesLogin.subtitulo}>Conectamos escuelas con maestros de forma rápida y segura</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesLogin.input}
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={stylesLogin.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesLogin.input}
            placeholder="Contraseña"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={stylesLogin.error}>{errors.password.message}</Text>}
      <TouchableOpacity style={stylesLogin.botonRecuperar}>
        <Text style={stylesLogin.textoBotonRecuperar}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesLogin.botonIniciarSesion} onPress={handleSubmit(onSubmit)}>
        <Text style={stylesLogin.textoBotonIniciarSesión}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesLogin.botonRegistrarse} onPress={irARegistro}>
        <Text style={stylesLogin.textoBotonRegistrarse}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormularioLogin;