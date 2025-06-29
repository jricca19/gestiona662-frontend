import { useEffect, useRef, useState } from 'react';
import { Alert, Platform, Text, StyleSheet, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configuramos cómo se mostrarán las notificaciones cuando la app esté abierta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificacionesPush() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const registrarNotificaciones = async () => {
      let token;

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          Alert.alert('Permiso denegado', 'No se puede obtener token de notificación');
          return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('📱 Expo Push Token:', token);
        setExpoPushToken(token);
      } else {
        Alert.alert('Error', 'Debe usar un dispositivo físico para notificaciones push');
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    registrarNotificaciones();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('🔔 Notificación recibida:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('📲 Usuario tocó la notificación:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      console.log('Token para notificaciones:', expoPushToken);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expo Push Token</Text>
      <Text selectable style={styles.token}>{expoPushToken}</Text>
      <Text style={styles.sub}>Copialo para usarlo en Postman</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  token: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8
  },
  sub: {
    marginTop: 10,
    color: 'gray'
  }
});