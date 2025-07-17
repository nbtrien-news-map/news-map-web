import type { NewsResponse } from '~/types/api/news';
import axiosInstance from '../axiosInstance';

export const fetchNewsByAreaId = async (areaId: number): Promise<NewsResponse[]> => {
    const response = await axiosInstance.get(`/areas/${areaId}/news`);
    return response.data;
};

export const fetchNewsByAreaIdAndCategoryIds = async (
    areaId: number,
    categoryIds: number[]
): Promise<NewsResponse[]> => {
    const response = await axiosInstance.get(`/news/filter?areaId=${areaId}&categoryIds=${categoryIds}`);
    return response.data;
};
