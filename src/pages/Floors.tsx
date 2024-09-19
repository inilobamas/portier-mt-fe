import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sideBar/Index';
import { AxiosError } from 'axios';
import FloorModal from '../components/floor/IndexModal';

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

interface Building {
    ID: number;
    name: string;
    address: string;
    company_id: number;
}

const Floors = () => {
    const [floors, setFloors] = useState<Floor[]>([]);
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
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

    const fetchBuildings = async () => {
        try {
            const response = await apiClient.get('/buildings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBuildings(response.data.data);
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
        fetchBuildings();
        fetchCompanies();
        fetchFloors();
    }, [token, navigate, logout]);

    // Handle Create and Update submissions
    const handleSubmitFloor = async (floorData: { id?: number; name: string; number: string; building_id?: number; }) => {
        if (selectedFloor) {
            // Update company
            await apiClient.put(`/floors/${selectedFloor.ID}`, floorData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Create new company
            await apiClient.post('/floors', floorData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedFloor(null);
        fetchFloors(); // Refresh the list
    };

    // Handle delete
    const handleDeleteFloor = async (id: number) => {
        await apiClient.delete(`/floors/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchFloors();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Floors</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Floor
                    </button>
                </div>

                {floors.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">ID</th>
                                <th className="p-3 text-gray-700">Name</th>
                                <th className="p-3 text-gray-700">Address</th>
                                <th className="p-3 text-gray-700">Company ID</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {floors.map((building) => (
                                <tr key={building.ID} className="border-b">
                                    <td className="p-3">{building.ID}</td>
                                    <td className="p-3">{building.name}</td>
                                    <td className="p-3">{building.number}</td>
                                    <td className="p-3">{building.building_id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedFloor(building);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFloor(building.ID)}
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
                    <p>No floors available.</p>
                )}

                <FloorModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedFloor(null);
                    }}
                    onSubmit={handleSubmitFloor}
                    companies={companies} // Pass the companies list to the modal
                    buildings={buildings}
                    floors={floors}
                    initialData={
                        selectedFloor
                            ? { id: selectedFloor.ID, name: selectedFloor.name, number: selectedFloor.number, building_id: selectedFloor.building_id }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Floors;