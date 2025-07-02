import { Text, View, TextInput, Button, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { loguear } from '../store/slices/usuarioSlice';
import { stylesRegistro } from './styles/stylesRegistro';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),
  lastName: yup
    .string()
    .required('El apellido es obligatorio')
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(20, 'El apellido no puede tener más de 20 caracteres'),
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
  const [escuelas, setEscuelas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [defaultDeptId, setDefaultDeptId] = useState('');
  const [newSchoolNumber, setNewSchoolNumber] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const cargarCiudades = async () => {
      if (modalVisible && defaultDeptId) {
        try {
          const res = await fetch(`https://gestiona662-backend.vercel.app/departments/${defaultDeptId}`);
          const data = await res.json();
          setCiudades(data || []);
        } catch (error) {
          console.error("Error al cargar ciudades por defecto:", error);
          setCiudades([]);
        }
      }
    };

    cargarCiudades();
  }, [modalVisible, defaultDeptId]);

  const handleCreateSchool = async () => {
    if (!newSchoolNumber || !selectedCity || !newAddress || !defaultDeptId) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    try {
      const res = await fetch(`https://gestiona662-backend.vercel.app/schools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          schoolNumber: newSchoolNumber,
          cityName: selectedCity,
          address: newAddress,
          departmentId: defaultDeptId,
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al crear escuela');
      }

      const createdSchool = data.school;
      setEscuelas((prev) => [...prev, createdSchool]);
      setValue("schoolId", createdSchool._id);
      setModalVisible(false);
      setNewSchoolNumber('');
      setNewAddress('');
      setSelectedCity('');
    } catch (err) {
      console.error("Error al crear escuela:", err);
      Alert.alert("Error", err.message || "Error al crear escuela");
    }
  };


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [resEscuelas, resDeptos] = await Promise.all([
          fetch('https://gestiona662-backend.vercel.app/schoolsSelect'),
          fetch('https://gestiona662-backend.vercel.app/departments'),
        ]);

        const escuelasData = await resEscuelas.json();
        const departamentosData = await resDeptos.json();

        setEscuelas(escuelasData);
        setDepartamentos(departamentosData);

        if (departamentosData.length > 0) {
          setDefaultDeptId(departamentosData[0]._id);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    obtenerDatos();
  }, []);
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      lastName: '',
      ci: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      schoolId: '',
      role: 'STAFF',
      aceptarTerminos: false
    },
  });

  const irALogin = () => {
    navigation.replace("login");
  };

  const onSubmit = async (formData) => {
    const { confirmPassword, aceptarTerminos, schoolId, ...rest } = formData;

    const dataToSend = {
      ...rest,
      ...(formData.role === 'STAFF' && { schoolId }),
    };

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
      <View style={stylesRegistro.encabezadoConFlecha}>
        <View style={stylesRegistro.iconoAtrasWrapper}>
          <TouchableOpacity onPress={irALogin}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={stylesRegistro.textoEncabezadoConFlecha}>Registro</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={stylesRegistro.contenedor}>
          <Text style={stylesRegistro.titulo}>Tus datos</Text>
          <Text style={stylesRegistro.label}>Nombre</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="person-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesRegistro.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Nombre"
                    placeholderTextColor="#999"
                  />
                )}
              />
            </View>
            {errors.name && <Text style={stylesRegistro.error}>{errors.name.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Apellido</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="person-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesRegistro.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Apellido"
                    placeholderTextColor="#999"
                  />
                )}
              />
            </View>
            {errors.lastName && <Text style={stylesRegistro.error}>{errors.lastName.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Cédula de Identidad</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="card-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <Controller
                control={control}
                name="ci"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesRegistro.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Cédula de Identidad"
                    placeholderTextColor="#999"
                  />
                )}
              />
            </View>
            {errors.ci && <Text style={stylesRegistro.error}>{errors.ci.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Email</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="mail-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesRegistro.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Email"
                    placeholderTextColor="#999"
                  />
                )}
              />
            </View>
            {errors.email && <Text style={stylesRegistro.error}>{errors.email.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Contraseña</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="lock-closed-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <View style={{ flex: 1, position: 'relative' }}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[stylesRegistro.input, { paddingRight: 40 }]}
                      placeholder="Contraseña"
                      placeholderTextColor="#999"
                      secureTextEntry={!mostrarPassword}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: [{ translateY: -12 }],
                  }}
                  onPress={() => setMostrarPassword(!mostrarPassword)}
                >
                  <Ionicons
                    name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#009fe3"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {errors.password && <Text style={stylesRegistro.error}>{errors.password.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Confirmar contraseña</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="lock-closed-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <View style={{ flex: 1, position: 'relative' }}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[stylesRegistro.input, { paddingRight: 40 }]}
                      placeholder="Confirmar contraseña"
                      placeholderTextColor="#999"
                      secureTextEntry={!mostrarConfirmPassword}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: [{ translateY: -12 }],
                  }}
                  onPress={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                >
                  <Ionicons
                    name={mostrarConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#009fe3"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {errors.confirmPassword && <Text style={stylesRegistro.error}>{errors.confirmPassword.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Teléfono</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="call-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesRegistro.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Teléfono"
                    placeholderTextColor="#999"
                  />
                )}
              />
            </View>
            {errors.phoneNumber && <Text style={stylesRegistro.error}>{errors.phoneNumber.message}</Text>}
          </View>
          <View style={{ height: 10 }} />
          <Text style={stylesRegistro.label}>Rol</Text>
          <View>
            <View style={stylesRegistro.filaIcono}>
              <Ionicons name="briefcase-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
              <Controller
                control={control}
                name="role"
                render={({ field: { onChange, value } }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => onChange('STAFF')}
                      style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                    >
                      <Ionicons name={value === 'STAFF' ? 'radio-button-on' : 'radio-button-off'} size={22} color="#009fe3" />
                      <Text style={{ marginLeft: 6 }}>STAFF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onChange('TEACHER')}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Ionicons name={value === 'TEACHER' ? 'radio-button-on' : 'radio-button-off'} size={22} color="#009fe3" />
                      <Text style={{ marginLeft: 6 }}>TEACHER</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            {errors.role && <Text style={stylesRegistro.error}>{errors.role.message}</Text>}
          </View>
          <View style={{ height: 10 }} />

          {watch('role') === 'STAFF' && (
            <>
              <Text style={stylesRegistro.label}>Escuela</Text>
              <View style={stylesRegistro.filaIcono}>
                <Ionicons name="school-outline" size={24} color="#009fe3" style={stylesRegistro.iconSeparado} />
                <Controller
                  control={control}
                  name="schoolId"
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={stylesRegistro.picker}
                    >
                      <Picker.Item label="Selecciona una escuela" value="" />
                      {escuelas.map((escuela) => (
                        <Picker.Item
                          key={escuela._id}
                          label={`Esc. ${escuela.schoolNumber} - ${escuela.cityName}`}
                          value={escuela._id}
                        />
                      ))}
                    </Picker>
                  )}
                />
                <TouchableOpacity
                  style={stylesRegistro.botonAgregarEscuela}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={stylesRegistro.botonAgregarTexto}>+</Text>
                </TouchableOpacity>
                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                  <View style={stylesRegistro.modalOverlay}>
                    <View style={stylesRegistro.modalContent}>
                      <Text style={stylesRegistro.modalTitle}>Agregar escuela</Text>
                      <TextInput
                        placeholder="Número"
                        value={newSchoolNumber}
                        onChangeText={setNewSchoolNumber}
                      />
                      <Text style={stylesRegistro.label}>Departamento</Text>
                      <Picker
                        selectedValue={defaultDeptId}
                        onValueChange={async (deptId) => {
                          setDefaultDeptId(deptId);
                          setSelectedCity('');

                          try {
                            const res = await fetch(`https://gestiona662-backend.vercel.app/departments/${deptId}`);
                            const data = await res.json();
                            setCiudades(data || []);
                          } catch (error) {
                            console.error("Error al obtener ciudades del departamento:", error);
                            setCiudades([]);
                          }
                        }}
                      >
                        <Picker.Item label="Selecciona un departamento" value="" />
                        {departamentos.map((dep) => (
                          <Picker.Item key={dep._id} label={dep.name} value={dep._id} />
                        ))}
                      </Picker>
                      {ciudades.length > 0 && (
                        <>
                          <Text style={stylesRegistro.label}>Ciudad</Text>
                          <Picker
                            selectedValue={selectedCity}
                            onValueChange={(value) => setSelectedCity(value)}
                          >
                            {ciudades.map((city, index) => (
                              <Picker.Item key={index} label={city.name} value={city.name} />
                            ))}
                          </Picker>
                        </>
                      )}
                      <TextInput
                        placeholder="Dirección"
                        value={newAddress}
                        onChangeText={setNewAddress}
                      />
                      <View style={stylesRegistro.modalButtons}>
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        <Button title="Crear" onPress={handleCreateSchool} />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              {errors.schoolId && <Text style={stylesRegistro.error}>{errors.schoolId.message}</Text>}
            </>

          )}


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
                  color="#009fe3"
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
        </View>
      </ScrollView>
    </View>
  );
};

export default FormularioRegistro;