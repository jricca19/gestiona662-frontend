import { StyleSheet, Text, View, TextInput, Button, Alert,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { loguear } from '../store/slices/usuarioSlice';
import { stylesRegistro } from './styles/stylesRegistro';
import Ionicons from 'react-native-vector-icons/Ionicons';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),
  lastName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),
  ci: yup.string().required('La cédula es obligatoria'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
  phoneNumber: yup.string().required('El teléfono es obligatorio'),
  role: yup.string().oneOf(['STAFF', 'TEACHER'], 'Rol inválido').required(),
  aceptarTerminos: yup
    .bool()
    .oneOf([true], 'Debes aceptar los términos y condiciones')
});

const FormularioRegistro = ({ navigation }) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      lastName: '',
      ci: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      role: 'STAFF',
      aceptarTerminos: false
    },
  });

  const onSubmit = async (formData) => {
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await fetch('https://gestiona662-backend.vercel.app/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.status === 201) {
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
          phoneNumber: profile.phoneNumber,
        };

        await SecureStore.setItemAsync("usuario", JSON.stringify(usuario));
        dispatch(loguear(usuario));

        Alert.alert('Éxito', 'Se ha registrado el usuario correctamente');
      } else {
        Alert.alert('Error', data?.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View>
      <View style={stylesRegistro.encabezado}>
        <Text style={stylesRegistro.textoEncabezado}>Registro</Text>
      </View>
      <Text style={stylesRegistro.titulo}>Tus datos</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="Nombre"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={stylesRegistro.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="Apellido"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.lastName && <Text style={stylesRegistro.error}>{errors.lastName.message}</Text>}

      <Controller
        control={control}
        name="ci"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="C.I"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.ci && <Text style={stylesRegistro.error}>{errors.ci.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={stylesRegistro.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="Contraseña"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={stylesRegistro.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && <Text style={stylesRegistro.error}>{errors.confirmPassword.message}</Text>}

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={stylesRegistro.input}
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.phoneNumber && <Text style={stylesRegistro.error}>{errors.phoneNumber.message}</Text>}

      <Text style={stylesRegistro.label}>Rol</Text>
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={stylesRegistro.picker}
          >
            <Picker.Item label="STAFF" value="STAFF" />
            <Picker.Item label="TEACHER" value="TEACHER" />
          </Picker>
        )}
      />
      {errors.role && <Text style={stylesRegistro.error}>{errors.role.message}</Text>}

        <Controller
  control={control}
  name="aceptarTerminos"
  render={({ field: { onChange, value } }) => (
    <TouchableOpacity
      style={stylesRegistro.checkboxContainer}
      onPress={() => onChange(!value)}
    >
      <Ionicons
        name={value ? 'checkbox-outline' : 'square-outline'}
        size={24}
        color="black"
      />
      <Text style={stylesRegistro.checkboxLabel}>Acepto los términos y condiciones</Text>
    </TouchableOpacity>
  )}
/>
{errors.aceptarTerminos && (
  <Text style={stylesRegistro.error}>{errors.aceptarTerminos.message}</Text>
)}

      <TouchableOpacity style={stylesRegistro.botonRegistrarse} onPress={handleSubmit(onSubmit)}>
              <Text style={stylesRegistro.textoBotonRegistrarse}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesRegistro.botonRegistrarse} onPress={() => navigation.replace("login")}>
              <Text style={stylesRegistro.textoBotonRegistrarse}>Ir al login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormularioRegistro;