import apiClient from '../apiClient';
import { AxiosResponse } from 'axios';

export const fetchUsers = async (token: string): Promise<AxiosResponse> => {
    return await apiClient.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createUser = async (userData: { username: string; password: string; company_id?: number; role_id?: number }, token: string): Promise<AxiosResponse> => {
    return await apiClient.post('/users', userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateUser = async (id: number, userData: { username: string; password: string; company_id?: number; role_id?: number }, token: string): Promise<AxiosResponse> => {
    return await apiClient.put(`/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteUser = async (id: number, token: string): Promise<AxiosResponse> => {
    return await apiClient.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
