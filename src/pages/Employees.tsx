import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import Table from '../components/Table';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { AxiosError } from 'axios';

interface Employees {
    id: number;
    name: string;
    address: string;
}

const Employees = () => {
    const [employees, setEmployees] = useState<Employees[]>([]);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await apiClient.get('/employees', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployees(response.data.data);
            } catch (error) {
                // Check if error is an AxiosError
                if (error instanceof AxiosError) {
                    console.error('Error fetching users', error);
                    if (error.response?.status === 401) {
                        logout(); // Log out and clear the token
                        navigate('/login'); // Redirect to login page
                    }
                } else {
                    console.error('An unexpected error occurred', error);
                }
            }
        };
        fetchEmployees();
    }, [token, navigate, logout]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl mb-4">Manage Employees</h1>
                {employees.length > 0 ? (
                    <Table headers={['name', 'address']} data={employees} />
                ) : (
                    <p>No employees available.</p>
                )}
            </div>
        </div>
    );
};

export default Employees;
