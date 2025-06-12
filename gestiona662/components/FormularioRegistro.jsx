import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { loguear } from '../store/slices/usuarioSlice';

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
  .max(20,'Máximo 20 caracteres')
  .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
  phoneNumber: yup.string().required('El teléfono es obligatorio'),
  role: yup.string().oneOf(['STAFF', 'TEACHER'], 'Rol inválido').required(),
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
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

      <Controller
        control={control}
        name="ci"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="C.I"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.ci && <Text style={styles.error}>{errors.ci.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}

      <Text style={styles.label}>Rol</Text>
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
          >
            <Picker.Item label="STAFF" value="STAFF" />
            <Picker.Item label="TEACHER" value="TEACHER" />
          </Picker>
        )}
      />
      {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}

      <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
      <Button title="Ir al login" onPress={() => navigation.replace("login")} />
    </View>
  );
};

export default FormularioRegistro;

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});