export interface GeocodingLocationResponse {
    placeId: string;
    latitude: number;
    longitude: number;
    placeRank: number;
    importance: number;
    addressType: string;
    name: string;
    displayName: string;
    boundingBox: number[];
}
