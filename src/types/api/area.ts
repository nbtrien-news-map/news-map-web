export interface AreaResponse {
    id: number;
    name: string;
    displayName: string;
    nameEn: string;
    shortName: string;
    shortCode: string;
    latitude: number;
    longitude: number;
    placeRank: number;
    importance: number;
    addressType: string;
    boundingBox: number[];
    osmType: string;
    osmId: number;
    adminLevel: string;
    osmClass: string;
    osmTypeName: string;
}
