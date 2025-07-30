import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAreaByLocation, fetchDefaultArea } from '~/api/endpoints/area.api';
import { removeSelectedArea, setSelectedArea } from '~/features/area/slices/selectedAreaSlice';
import { useUserGeolocation } from '~/features/user-geolocation/hooks/useUserGeolocation';
import { useNewsByAreaIdAndCategoryIdsQuery } from '~/queries/news.queries';
import { useNominatimLookupQuery } from '~/queries/nominatim.queries';
import type { RootState } from '~/store';
import { buildOsmIdsParam, convertGeoJsonToLatLngArray } from '~/utils/osm.util';

export const useNewsMap = () => {
    const dispatch = useDispatch();
    const selectedArea = useSelector((state: RootState) => state.selectedArea.area);
    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.ids);
    const { loading: locationLoading } = useUserGeolocation();
    const userPosition = useSelector((state: RootState) => state.userPosition.position);
    const areaId = selectedArea?.id ?? null;
    const [areaPolygon, setAreaPolygon] = useState<LatLngExpression[][]>([]);
    const areaOsmId =
        selectedArea?.osmId && selectedArea?.osmType
            ? buildOsmIdsParam(selectedArea.osmType, selectedArea.osmId)
            : null;
    const { data: news, isLoading, error } = useNewsByAreaIdAndCategoryIdsQuery(areaId, selectedCategories);
    const { data: areaLookupResponses } = useNominatimLookupQuery(areaOsmId);
    const center: LatLngExpression = [
        selectedArea?.latitude ?? userPosition?.latitude ?? 0,
        selectedArea?.longitude ?? userPosition?.longitude ?? 0,
    ] as LatLngExpression;

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
    }, [locationLoading, selectedArea, userPosition]);

    useEffect(() => {
        if (areaLookupResponses?.length) {
            const matched = areaLookupResponses.find((r) => r.osm_id === selectedArea?.osmId && r.geojson);
            if (matched) {
                setAreaPolygon(convertGeoJsonToLatLngArray(matched.geojson));
            }
        }
    }, [areaLookupResponses, selectedArea?.osmId]);

    return {
        state: {
            news,
            selectedArea,
            center,
            isLoading,
            error,
            areaPolygon,
        },
    };
};
