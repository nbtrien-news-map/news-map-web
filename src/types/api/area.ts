import type { GeocodingLocationResponse } from './geocoding';

export interface AreaResponse {
    id: number;
    name: string;
    displayName: string;
    nameEn: string;
    shortName: string;
    shortCode: string;
    geocodingLocation: GeocodingLocationResponse;
}
