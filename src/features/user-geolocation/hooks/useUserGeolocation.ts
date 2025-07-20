import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeSelectedArea } from '~/features/area/slices/selectedAreaSlice';
import {
    removeUserPosition,
    setUserPosition,
    type UserPosition,
} from '~/features/user-geolocation/slices/userPositionSlice';

export const GEOLOCATION_PERMISSION_STATE = {
    GRANTED: 'granted',
    DENIED: 'denied',
    PROMPT: 'prompt',
} as const;
type GeolocationPermissionState = 'granted' | 'denied' | 'prompt' | null;

export const useUserGeolocation = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [permissionState, setPermissionState] = useState<GeolocationPermissionState>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        if (navigator.permissions) {
            navigator.permissions
                .query({ name: 'geolocation' as PermissionName })
                .then((result) => {
                    setPermissionState(result.state as GeolocationPermissionState);
                    result.onchange = () => {
                        setPermissionState(result.state as GeolocationPermissionState);
                    };
                })
                .catch((err) => {
                    console.warn('Cannot query geolocation permission:', err);
                    setPermissionState(null);
                });
        } else {
            setPermissionState(null);
        }

        navigator.geolocation.getCurrentPosition(
            () => {},
            () => {}
        );
    }, []);

    useEffect(() => {
        if (permissionState === GEOLOCATION_PERMISSION_STATE.GRANTED) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userPosition: UserPosition = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                        altitude: pos.coords.altitude || null,
                        altitudeAccuracy: pos.coords.altitudeAccuracy || null,
                        heading: pos.coords.heading || null,
                        speed: pos.coords.speed || null,
                        timestamp: pos.timestamp,
                    };
                    dispatch(setUserPosition(userPosition));
                    dispatch(removeSelectedArea());
                    setError(null);
                    setLoading(false);
                },
                (err) => {
                    setError(err.message);
                    setLoading(false);
                },
                { enableHighAccuracy: true }
            );
        } else {
            setLoading(false);
            dispatch(removeUserPosition());
        }
    }, [permissionState, dispatch]);

    return { error, loading, permissionState };
};
