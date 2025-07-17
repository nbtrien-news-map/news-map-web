import { useQuery } from '@tanstack/react-query';
import { fetchAllAreas } from '~/api/endpoints/area.api';
import type { AreaResponse } from '~/types/api/area';

export const useAreasQuery = () => {
    return useQuery<AreaResponse[]>({
        queryKey: ['areas'],
        queryFn: () => fetchAllAreas(),
    });
};
