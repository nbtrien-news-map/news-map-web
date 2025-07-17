import type { AreaResponse } from '~/types/api/area';
import axiosInstance from '../axiosInstance';

export const fetchAllAreas = async (): Promise<AreaResponse[]> => {
    const response = await axiosInstance.get(`/areas`);
    return response.data;
};

export const fetchNearestAreaByLocation = async (latitude: number, longitude: number): Promise<AreaResponse> => {
    const response = await axiosInstance.get(`/areas/nearest?latitude=${latitude}&longitude=${longitude}`);
    return response.data;
};

export const fetchDefaultArea = async (): Promise<AreaResponse> => {
    const response = await axiosInstance.get(`/areas/default`);
    return response.data;
};
