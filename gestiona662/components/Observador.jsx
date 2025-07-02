import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { establecerPostulaciones } from '../store/slices/postulacionesSlice';
import { establecerPublicaciones } from '../store/slices/publicacionesSlice';
import { URL_BACKEND } from '@env';

const POLL_INTERVAL = 600000; // 1 minuto

const Observador = () => {
    const dispatch = useDispatch();
    const postulaciones = useSelector(state => state.postulaciones.items);
    const publicaciones = useSelector(state => state.publicaciones.items);
    const logueado = useSelector(state => state.usuario.logueado);

    // Guardar los datos previos para comparar
    const prevPostulaciones = useRef(postulaciones);
    const prevPublicaciones = useRef(publicaciones);

    useEffect(() => {
        prevPostulaciones.current = postulaciones;
    }, [postulaciones]);
    useEffect(() => {
        prevPublicaciones.current = publicaciones;
    }, [publicaciones]);

    useEffect(() => {
        if (!logueado) return;

        const interval = setInterval(async () => {
            try {
                const token = await SecureStore.getItemAsync('token');

                // Postulaciones
                const resPost = await fetch(`${URL_BACKEND}/v1/postulations/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const dataPost = await resPost.json();
                if (resPost.status === 200) {
                    // Detectar cambios relevantes
                    if (JSON.stringify(dataPost) !== JSON.stringify(prevPostulaciones.current)) {
                        dispatch(establecerPostulaciones(dataPost));
                        // Ejemplo: notificar si alguna postulación cambió de estado
                        const cambios = dataPost.filter((p, i) =>
                            prevPostulaciones.current[i]?._id === p._id &&
                            prevPostulaciones.current[i]?.status !== p.status
                        );
                        if (cambios.length > 0) {
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: '¡Actualización de postulaciones!',
                                    body: 'El estado de una o más postulaciones ha cambiado.',
                                },
                                trigger: null,
                            });
                        }
                    }
                }

                // Publicaciones
                const resPub = await fetch(`${URL_BACKEND}/v1/publications?page=1&limit=4`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const dataPub = await resPub.json();
                if (resPub.status === 200) {
                    if (JSON.stringify(dataPub.publications) !== JSON.stringify(prevPublicaciones.current)) {
                        dispatch(establecerPublicaciones({ items: dataPub.publications, total: dataPub.total }));
                        // Ejemplo: notificar si hay nuevas publicaciones
                        if (dataPub.total > prevPublicaciones.current.length) {
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: '¡Nuevas publicaciones!',
                                    body: 'Hay nuevas publicaciones disponibles.',
                                },
                                trigger: null,
                            });
                        }
                    }
                }
            } catch (err) {
                // Manejo de error opcional
            }
        }, POLL_INTERVAL);

        return () => clearInterval(interval);
    }, [logueado, dispatch]);

    return null; // No renderiza nada
};

export default Observador;
