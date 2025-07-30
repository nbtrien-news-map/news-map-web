import { useQuery } from '@tanstack/react-query';
import { fetchNominatimLookup } from '~/api/endpoints/nominatim.api';
import type { NominatimLookupResponse } from '~/types/api/nominatim';

export const useNominatimLookupQuery = (osmIds: string | null) => {
    return useQuery<NominatimLookupResponse[]>({
        queryKey: ['nominatim', 'lookup', osmIds],
        queryFn: () => fetchNominatimLookup(osmIds!),
        enabled: osmIds !== null,
    });
};
