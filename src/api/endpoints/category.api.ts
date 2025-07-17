import type { CategoryResponse } from '~/types/api/category';
import axiosInstance from '../axiosInstance';

export const fetchAllCategories = async (): Promise<CategoryResponse[]> => {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
};
