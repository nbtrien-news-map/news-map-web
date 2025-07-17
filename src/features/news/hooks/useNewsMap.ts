import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDefaultArea, fetchNearestAreaByLocation } from '~/api/endpoints/area.api';
import { setSelectedArea } from '~/features/area/slices/selectedAreaSlice';
import { useUserGeolocation } from '~/hooks/useUserGeolocation';
import { useNewsByAreaIdAndCategoryIdsQuery } from '~/queries/news.queries';
import type { RootState } from '~/store';
export const useNewsMap = () => {
    const dispatch = useDispatch();
    const selectedArea = useSelector((state: RootState) => state.selectedArea);
    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.ids);
    const { position } = useUserGeolocation();
    const { id: selectedAreaId, latitude, longitude } = selectedArea;
    const { position: userPosition } = useUserGeolocation();
    const [areaId, setAreaId] = useState<number | null>(null);

    useEffect(() => {
        const fetchArea = async () => {
            if (selectedAreaId != null) {
                setAreaId(selectedAreaId);
            } else if (userPosition != null) {
                const nearestArea = await fetchNearestAreaByLocation(
                    userPosition.coords.latitude,
                    userPosition.coords.longitude
                );
                if (nearestArea) {
                    setAreaId(nearestArea.id);
                    dispatch(setSelectedArea(nearestArea));
                }
            } else {
                const defaultArea = await fetchDefaultArea();
                if (defaultArea) {
                    setAreaId(defaultArea.id);
                    dispatch(setSelectedArea(defaultArea));
                }
            }
        };

        fetchArea();
    }, [selectedAreaId, userPosition, dispatch]);

    const { data: news, isLoading, error } = useNewsByAreaIdAndCategoryIdsQuery(areaId, selectedCategories);
    const center: LatLngExpression = [
        latitude ?? position?.coords?.latitude ?? 0,
        longitude ?? position?.coords?.longitude ?? 0,
    ];

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
