import axios from 'axios';
import type { NominatimLookupResponse } from '~/types/api/nominatim';
const baseURL = import.meta.env.VITE_NOMINATION_API_URL;

export const fetchNominatimLookup = async (osmIds: string): Promise<NominatimLookupResponse[]> => {
    const url = `${baseURL}/lookup`;
    const params = {
        osm_ids: osmIds,
        format: 'json',
        polygon_geojson: 1,
    };

    const response = await axios.get<NominatimLookupResponse[]>(url, { params });
    return response.data;
};
