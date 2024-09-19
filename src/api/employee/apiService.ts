import apiClient from '../apiClient';
import { AxiosResponse } from 'axios';

export const fetchEmployees = async (token: string): Promise<AxiosResponse> => {
    return await apiClient.get('/employees', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createEmployee = async (employeeData: { name: string; email: string; phone: string; company_id: number; }, token: string): Promise<AxiosResponse> => {
    return await apiClient.post('/employees', employeeData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateEmployee = async (id: number, employeeData: { name: string; email: string; phone: string; company_id: number; }, token: string): Promise<AxiosResponse> => {
    return await apiClient.put(`/employees/${id}`, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteEmployee = async (id: number, token: string): Promise<AxiosResponse> => {
    return await apiClient.delete(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
