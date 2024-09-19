import apiClient from '../apiClient';
import { AxiosResponse } from 'axios';

export const fetchCompanies = async (token: string): Promise<AxiosResponse> => {
    return await apiClient.get('/companies', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createCompany = async (companyData: { name: string; description: string; }, token: string): Promise<AxiosResponse> => {
    return await apiClient.post('/companies', companyData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateCompany = async (id: number, companyData: { name: string; description: string; }, token: string): Promise<AxiosResponse> => {
    return await apiClient.put(`/companies/${id}`, companyData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteCompany = async (id: number, token: string): Promise<AxiosResponse> => {
    return await apiClient.delete(`/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
