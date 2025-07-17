import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCategoriesQuery } from '~/queries/category.queries';
import type { RootState } from '~/store';
import { initializeSelectedCategories } from '../slices/selectedCategoriesSlice';

export const useCategorySelector = () => {
    const { data, isLoading, error } = useCategoriesQuery();
    const dispatch = useDispatch();

    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.ids);

    useEffect(() => {
        if (data && data.length > 0 && selectedCategories.length === 0) {
            const allCategoryIds = data.map((cat: { id: number }) => cat.id);
            dispatch(initializeSelectedCategories(allCategoryIds));
        }
    }, [data, dispatch]);
    return {
        state: {
            categories: data,
            isLoading: isLoading,
            error: error,
        },
    };
};
