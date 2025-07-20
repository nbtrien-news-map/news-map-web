import type { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAreaByLocation, fetchDefaultArea } from '~/api/endpoints/area.api';
import { removeSelectedArea, setSelectedArea } from '~/features/area/slices/selectedAreaSlice';
import { useUserGeolocation } from '~/features/user-geolocation/hooks/useUserGeolocation';
import { useNewsByAreaIdAndCategoryIdsQuery } from '~/queries/news.queries';
import type { RootState } from '~/store';

export const useNewsMap = () => {
    const dispatch = useDispatch();
    const selectedArea = useSelector((state: RootState) => state.selectedArea.area);
    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.ids);
    const { loading: locationLoading } = useUserGeolocation();
    const userPosition = useSelector((state: RootState) => state.userPosition.position);
    const areaId = selectedArea?.id ?? null;

    useEffect(() => {
        let isMounted = true;

        const fetchArea = async () => {
            if (!selectedArea && !locationLoading) {
                try {
                    if (userPosition) {
                        const area = await fetchAreaByLocation(userPosition.latitude, userPosition.longitude);
                        if (area && isMounted) {
                            dispatch(setSelectedArea(area));
                        }
                    } else {
                        const defaultArea = await fetchDefaultArea();
                        if (defaultArea && isMounted) {
                            dispatch(setSelectedArea(defaultArea));
                        }
                    }
                } catch (error) {
                    if (isMounted) {
                        dispatch(removeSelectedArea());
                    }
                }
            }
        };

        fetchArea();

        return () => {
            isMounted = false;
        };
    }, [locationLoading, selectedArea, userPosition, dispatch]);

    const { data: news, isLoading, error } = useNewsByAreaIdAndCategoryIdsQuery(areaId, selectedCategories);
    const center: LatLngExpression = [
        selectedArea?.latitude ?? userPosition?.latitude ?? 0,
        selectedArea?.longitude ?? userPosition?.longitude ?? 0,
    ] as LatLngExpression;

    return {
        state: {
            news,
            selectedArea,
            center,
            isLoading,
            error,
        },
    };
};
