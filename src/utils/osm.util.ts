import type { LatLngExpression } from 'leaflet';

const OSM_AREA_TYPE_PREFIXES: Record<string, string> = {
    node: 'N',
    way: 'W',
    relation: 'R',
};

export function buildOsmIdsParam(osmType: string, osmId: number): string {
    const prefix = OSM_AREA_TYPE_PREFIXES[osmType.toLowerCase()];
    if (!prefix) throw new Error(`Unsupported osmType: ${osmType}`);

    return `${prefix}${osmId}`;
}

export function convertGeoJsonToLatLngArray(geojson: any): LatLngExpression[][] {
    if (!geojson || !geojson.type || !geojson.coordinates) return [];

    if (geojson.type === 'MultiPolygon') {
        return geojson.coordinates.flat().map((ring: number[][]) => ring.map(([lng, lat]) => [lat, lng]));
    }

    if (geojson.type === 'Polygon') {
        return geojson.coordinates.map((ring: number[][]) => ring.map(([lng, lat]) => [lat, lng]));
    }

    return [];
}
