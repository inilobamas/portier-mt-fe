import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import Table from '../components/Table';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { AxiosError } from 'axios';

interface User {
    id: number;
    username: string;
    password: string;
    company_id: number;
    role_id: number;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get('/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Check if response.data is in the expected structure
                if (response.data && Array.isArray(response.data.data)) {
                    setUsers(response.data.data); // Access the actual array within response.data.data
                } else {
                    console.error('Expected an array but got:', response.data);
                }
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

        fetchUsers();
    }, [token, navigate, logout]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl mb-4">Manage Users</h1>
                {users.length > 0 ? (
                    <Table headers={['ID', 'username', 'role_id']} data={users} />
                ) : (
                    <p>No users available.</p>
                )}
            </div>
        </div>
    );
};

export default Users;
