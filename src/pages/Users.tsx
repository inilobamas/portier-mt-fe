import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sideBar/Index';
import { AxiosError } from 'axios';
import UserModal from '../components/user/IndexModal';
import { fetchUsers, createUser, deleteUser, updateUser } from '../api/user/apiService';

interface User {
    ID: number;
    username: string;
    password: string;
    company_id: number;
    role_id: number;
}

interface Company {
    ID: number;
    name: string;
}

interface Role {
    ID: number;
    name: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const { token, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const response = await fetchUsers(token ?? '');
            if (response.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error fetching users', error);
                if (error.response?.status === 401) {
                    logout();
                    navigate('/login');
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await apiClient.get('/companies', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCompanies(response.data.data);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching employees', error);
                if (error.response?.status === 401) {
                    logout(); // Log out and clear the token
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    // Mock API function that returns roles
    const fetchRoles = async (): Promise<Role[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setRoles([
                    { ID: 1, name: 'Super Admin' },
                    { ID: 2, name: 'Admin' },
                    { ID: 3, name: 'Normal User' }
                ]);
            }, 500); // Simulate network latency
        });
    };

    useEffect(() => {
        getUsers();
        fetchCompanies();
        fetchRoles();
    }, [token, navigate, logout]);

    const handleSubmitUser = async (userData: { id?: number; username: string; password: string; company_id?: number, role_id?: number; }) => {
        if (selectedUser) {
            await apiClient.put(`/users/${selectedUser.ID}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await apiClient.post('/users', userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedUser(null);
        getUsers();
    };

    const handleDeleteUser = async (id: number) => {
        await apiClient.delete(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        getUsers();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Users</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New User
                    </button>
                </div>

                {users.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">ID</th>
                                <th className="p-3 text-gray-700">Username</th>
                                <th className="p-3 text-gray-700">Password</th>
                                <th className="p-3 text-gray-700">Company ID</th>
                                <th className="p-3 text-gray-700">Role ID</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.ID} className="border-b">
                                    <td className="p-3">{user.ID}</td>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{'****'}</td>
                                    <td className="p-3">{user.company_id}</td>
                                    <td className="p-3">{user.role_id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.ID)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users available.</p>
                )}

                <UserModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedUser(null);
                    }}
                    onSubmit={handleSubmitUser}
                    companies={companies}
                    roles={roles}
                    initialData={
                        selectedUser
                            ? { id: selectedUser.ID, username: selectedUser.username, password: selectedUser.password, company_id: selectedUser.company_id, role_id: selectedUser.role_id }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Users;
