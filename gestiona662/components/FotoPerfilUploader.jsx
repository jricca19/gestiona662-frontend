import React, { useState } from 'react';
import { TouchableOpacity, Image, View, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const CLOUD_NAME = 'dkbpd912l';
const UPLOAD_PRESET = 'gestiona662';

const FotoPerfilUploader = ({ avatarStyle, initialUrl, userId, token }) => {
    const [imageUrl, setImageUrl] = useState(initialUrl || null);
    const [loading, setLoading] = useState(false);

    const saveImageUrl = async (url) => {
        try {
            await fetch('https://gestiona662-backend.vercel.app/v1/users/profileTeacher', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ address: url, id: userId }),
            });
        } catch (e) {
            // Puedes mostrar un error si quieres
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
            name: 'avatar.jpg',
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
                setImageUrl(data.secure_url);
                await saveImageUrl(data.secure_url);
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
                <ActivityIndicator size="small" color="#009fe3" />
            ) : imageUrl ? (
                <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
            ) : (
                <Ionicons name="person" size={60} color="#009fe3" />
            )}
        </TouchableOpacity>
    );
};

export default FotoPerfilUploader;
