import type { CategoryResponse } from './category';
import type { GeocodingLocationResponse } from './geocoding';

export interface NewsResponse {
    id: number;
    title: string;
    description: string;
    address: string;
    provider: string;
    sourceUrl: string;
    publishedAt: string;
    geocodingLocation: GeocodingLocationResponse;
    category: CategoryResponse;
}
