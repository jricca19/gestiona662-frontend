import { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { colores } from './styles/fuentesyColores';

const CLOUD_NAME = 'dkbpd912l';
const UPLOAD_PRESET = 'gestiona662';

const FotoPerfilUploader = ({ avatarStyle, ciUsuario, profilePhoto }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profilePhoto) {
            setImageUrl(profilePhoto);
        }
    }, [profilePhoto]);

    const saveImageUrl = async (url) => {
        const token = await SecureStore.getItemAsync('token');
        try {
            const response = await fetch('https://gestiona662-backend.vercel.app/v1/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ profilePhoto: url }),
            });
            if (!response.ok) {
                Alert.alert('Error', 'No se pudo guardar la URL en el backend');
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    };

    const pickAndUploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se requiere acceso a la galería para seleccionar una foto.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (result.canceled) return;

        setLoading(true);
        const image = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            name: `${ciUsuario}.jpg`,
            type: 'image/jpeg',
        });
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.secure_url) {
                const ok = await saveImageUrl(data.secure_url);
                if (ok) {
                    setImageUrl(data.secure_url);
                }
            } else {
                Alert.alert('Error', 'No se pudo subir la imagen.');
            }
        } catch (e) {
            Alert.alert('Error', 'Ocurrió un error al subir la imagen.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity style={avatarStyle} onPress={pickAndUploadImage} activeOpacity={0.7}>
            {loading ? (
                <ActivityIndicator size="small" color={colores.primario} />
            ) : (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons name="person" size={60} color={colores.primario} />
                    )}
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        backgroundColor: colores.primario,
                        borderRadius: 100,
                        padding: 1,
                    }}>
                        <MaterialIcons name="autorenew" size={20} color={colores.terceario} />
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default FotoPerfilUploader;
