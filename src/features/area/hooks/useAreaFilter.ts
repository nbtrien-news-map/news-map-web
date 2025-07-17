import { useAreasQuery } from '~/queries/area.queries';

export const useAreaFilter = () => {
    const { data: areas, isLoading, error } = useAreasQuery();

    return {
        state: {
            areas,
            isLoading,
            error: error,
        },
    };
};
