import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sideBar/Index';
import { AxiosError } from 'axios';
import RoomModal from '../components/room/IndexModal';

interface Company {
    ID: number;
    name: string;
}

interface Floor {
    ID: number;
    name: string;
    number: string;
    building_id: number;
}

interface Room {
    ID: number;
    name: string;
    number: string;
    floor_id: number;
}

const Rooms = () => {
    const [floors, setFloors] = useState<Floor[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
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
                console.error('Error fetching Floors', error);
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

    const fetchFloors = async () => {
        try {
            const response = await apiClient.get('/floors', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFloors(response.data.data);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching Floors', error);
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
        fetchRooms();
        fetchCompanies();
        fetchFloors();
    }, [token, navigate, logout]);

    // Handle Create and Update submissions
    const handleSubmitRoom = async (roomData: { id?: number; name: string; number: string; floor_id?: number; }) => {
        if (selectedRoom) {
            // Update company
            await apiClient.put(`/rooms/${selectedRoom.ID}`, roomData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Create new company
            await apiClient.post('/rooms', roomData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedRoom(null);
        fetchRooms(); // Refresh the list
    };

    // Handle delete
    const handleDeleteFloor = async (id: number) => {
        await apiClient.delete(`/rooms/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchRooms();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Rooms</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Room
                    </button>
                </div>

                {rooms.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">ID</th>
                                <th className="p-3 text-gray-700">Name</th>
                                <th className="p-3 text-gray-700">Address</th>
                                <th className="p-3 text-gray-700">Floor ID</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.ID} className="border-b">
                                    <td className="p-3">{room.ID}</td>
                                    <td className="p-3">{room.name}</td>
                                    <td className="p-3">{room.number}</td>
                                    <td className="p-3">{room.floor_id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedRoom(room);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFloor(room.ID)}
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
                    <p>No rooms available.</p>
                )}

                <RoomModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedRoom(null);
                    }}
                    onSubmit={handleSubmitRoom}
                    companies={companies} // Pass the companies list to the modal
                    rooms={rooms}
                    floors={floors}
                    initialData={
                        selectedRoom
                            ? { id: selectedRoom.ID, name: selectedRoom.name, number: selectedRoom.number, floor_id: selectedRoom.floor_id }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Rooms;