import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';
import { AxiosError } from 'axios';

interface Company {
    ID: number;
    name: string;
}

interface Building {
    ID: number;
    name: string;
    address: string;
    company_id: number;
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

interface Lock {
    ID: number;
    name: string;
    brand: string;
    room_id: number;
}

const BuildingDetails = () => {
    const { buildingId } = useParams<{ buildingId: string }>();
    const [floorsBuilding, setFloorsBuilding] = useState<Floor[]>([]);
    const [buildingName, setBuildingName] = useState('');
    const [floors, setFloors] = useState<Floor[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [locks, setLocks] = useState<Lock[]>([]);
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);  // Navigate to the previous page
    };

    const fetchBuilding = async () => {
        try {
            const response = await apiClient.get(`/buildings/${buildingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBuildingName(response.data.data.name);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching Buildings', error);
                if (error.response?.status === 401) {
                    logout(); // Log out and clear the token
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    const fetchFloorsInBuilding = async () => {
        try {
            const response = await apiClient.get(`/floors/building/${buildingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFloorsBuilding(response.data.data);
            setFloors(response.data.data);
        } catch (error) {
            // Check if error is an AxiosError
            if (error instanceof AxiosError) {
                console.error('Error fetching Buildings', error);
                if (error.response?.status === 401) {
                    logout(); // Log out and clear the token
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    const fetchRoomsInFloor = async (floor_id: number) => {
        try {
            const response = await apiClient.get(`/rooms/floor/${floor_id}`, {
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

    const fetchLocksInRoom = async (room_id: number) => {
        try {
            const response = await apiClient.get(`/locks/room/${room_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLocks(response.data.data);
            console.log("response.data.data", response.data.data)
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

    useEffect(() => {
        fetchFloorsInBuilding();
        fetchBuilding();
        if (selectedFloor) {
            fetchRoomsInFloor(selectedFloor);
        }
        if (selectedRoom) {
            fetchLocksInRoom(selectedRoom);
        }
    }, [token, navigate, logout]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">
                        <span onClick={handleBackClick} style={{ cursor: 'pointer', color: 'blue' }}>
                            Manage Buildings
                        </span>
                        {" / "}
                        <span className="text-2xl">
                            {buildingName}
                        </span>
                    </h1>
                </div>

                <div className="flex justify-start items-center mb-4">
                    {/* Floor Dropdown */}
                    <div className="p-3">
                        <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Floor:
                        </label>
                        <select
                            id="floor"
                            value={selectedFloor || ''}
                            onChange={(e) => {
                                const floorId = Number(e.target.value);
                                setSelectedFloor(floorId); // Set the selected floor
                                fetchRoomsInFloor(floorId);
                            }}
                            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">-- Select a Floor --</option>
                            {floors.map((floor) => (
                                <option key={floor.ID} value={floor.ID}>
                                    {floor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Room Dropdown (only show if a floor is selected) */}
                    {selectedFloor && (
                        <div className="p-3">
                            <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Room:
                            </label>
                            <select
                                id="room"
                                value={selectedRoom || ''}
                                onChange={(e) => {
                                    const roomId = Number(e.target.value);
                                    console.log("roomId", roomId)
                                    setSelectedRoom(roomId); // Set the selected Room
                                    fetchLocksInRoom(roomId);
                                }}
                                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">-- Select a Room --</option>
                                {rooms
                                    .filter((room) => room.floor_id === selectedFloor) // Filter rooms based on the selected floor
                                    .map((room) => (
                                        <option key={room.ID} value={room.ID}>
                                            {room.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Locks</h1>
                </div>

                {/* Lock Table List (only show if a room is selected) */}
                {locks.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">Lock Name</th>
                                <th className="p-3 text-gray-700">Lock Brand</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locks.map((lock) => (
                                <tr key={lock.ID} className="border-b">
                                    <td className="p-3">{lock.name}</td>
                                    <td className="p-3">{lock.brand}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                // setSelectedEmployee(employee);
                                                // setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Assign Key-Copies
                                        </button>
                                        <button
                                            onClick={() => {
                                                // setSelectedEmployee(employee);
                                                // setIsModalOpen(true);
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Revoke Key-Copies
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No locks available.</p>
                )}


            </div>
        </div >
    );
};

export default BuildingDetails;
