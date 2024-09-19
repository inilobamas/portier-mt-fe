import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/SideBar';
import { AxiosError } from 'axios';
import LockModal from '../components/lock/IndexModal';

interface Company {
    ID: number;
    name: string;
}

interface Room {
    ID: number;
    name: string;
    number: string;
    floor_id: number;
}

interface Lock {
    ID: number;
    name: string;
    brand: string;
    room_id: number;
}

const Locks = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [locks, setLocks] = useState<Lock[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLock, setSelectedLock] = useState<Lock | null>(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetchCompanies = async () => {
        try {
            const response = await apiClient.get('/companies', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCompanies(response.data.data);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching Rooms', error);
                if (error.response?.status === 401) {
                    logout(); // Log out and clear the token
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    const fetchLocks = async () => {
        try {
            const response = await apiClient.get('/locks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLocks(response.data.data);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching Locks', error);
                if (error.response?.status === 401) {
                    logout(); // Log out and clear the token
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await apiClient.get('/rooms', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRooms(response.data.data);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching Rooms', error);
                if (error.response?.status === 401) {
                    logout(); // Log out and clear the token
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    useEffect(() => {
        fetchLocks();
        fetchCompanies();
        fetchRooms();
    }, [token, navigate, logout]);

    // Handle Create and Update submissions
    const handleSubmitLock = async (lockData: { id?: number; name: string; brand: string; room_id?: number; }) => {
        if (selectedLock) {
            // Update company
            await apiClient.put(`/locks/${selectedLock.ID}`, lockData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Create new company
            await apiClient.post('/locks', lockData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedLock(null);
        fetchLocks(); // Refresh the list
    };

    // Handle delete
    const handleDeleteRoom = async (id: number) => {
        await apiClient.delete(`/locks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchLocks();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Locks</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Lock
                    </button>
                </div>

                {locks.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">ID</th>
                                <th className="p-3 text-gray-700">Name</th>
                                <th className="p-3 text-gray-700">Brand</th>
                                <th className="p-3 text-gray-700">Room ID</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locks.map((room) => (
                                <tr key={room.ID} className="border-b">
                                    <td className="p-3">{room.ID}</td>
                                    <td className="p-3">{room.name}</td>
                                    <td className="p-3">{room.brand}</td>
                                    <td className="p-3">{room.room_id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedLock(room);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room.ID)}
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
                    <p>No locks available.</p>
                )}

                <LockModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedLock(null);
                    }}
                    onSubmit={handleSubmitLock}
                    companies={companies} // Pass the companies list to the modal
                    locks={locks}
                    rooms={rooms}
                    initialData={
                        selectedLock
                            ? { id: selectedLock.ID, name: selectedLock.name, brand: selectedLock.brand, room_id: selectedLock.room_id }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Locks;