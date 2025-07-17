import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '~/api/endpoints/category.api';
import type { CategoryResponse } from '~/types/api/category';

export const useCategoriesQuery = () => {
    return useQuery<CategoryResponse[]>({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories(),
    });
};
