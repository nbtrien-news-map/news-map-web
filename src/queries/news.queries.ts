import { useQuery } from '@tanstack/react-query';
import { fetchNewsByAreaId, fetchNewsByAreaIdAndCategoryIds } from '~/api/endpoints/news.api';
import type { NewsResponse } from '~/types/api/news';

export const useNewsByAreaIdQuery = (areaId: number | null) => {
    return useQuery<NewsResponse[]>({
        queryKey: ['news', 'area', areaId],
        queryFn: () => fetchNewsByAreaId(areaId!),
        enabled: areaId !== null,
    });
};

export const useNewsByAreaIdAndCategoryIdsQuery = (areaId: number | null, categoryIds: number[]) => {
    return useQuery<NewsResponse[]>({
        queryKey: ['news', 'area', areaId, 'categories', categoryIds],
        queryFn: () => fetchNewsByAreaIdAndCategoryIds(areaId!, categoryIds),
        enabled: areaId !== null,
    });
};
