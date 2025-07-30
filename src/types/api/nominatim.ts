export interface GeoJsonGeometry {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: any;
}

export interface NominatimLookupResponse {
    place_id: number;
    osm_type: string;
    osm_id: number;
    display_name: string;
    geojson?: GeoJsonGeometry;
}
