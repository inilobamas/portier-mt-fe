import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sideBar/Index';
import { AxiosError } from 'axios';
import BuildingModal from '../components/building/IndexModal';

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

const Buildings = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
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

    useEffect(() => {
        fetchCompanies();
        fetchBuildings();
    }, [token, navigate, logout]);

    // Handle Create and Update submissions
    const handleSubmitBuilding = async (buildingData: { id?: number; name: string; address: string, company_id?: number; }) => {
        if (selectedBuilding) {
            // Update company
            await apiClient.put(`/buildings/${selectedBuilding.ID}`, buildingData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Create new company
            await apiClient.post('/buildings', buildingData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedBuilding(null);
        fetchBuildings(); // Refresh the list
    };

    // Handle delete
    const handleDeleteBuilding = async (id: number) => {
        await apiClient.delete(`/buildings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchBuildings();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Buildings</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Building
                    </button>
                </div>

                {buildings.length > 0 ? (
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
                            {buildings.map((building) => (
                                <tr key={building.ID} className="border-b">
                                    <td className="p-3">{building.ID}</td>
                                    <td className="p-3">{building.name}</td>
                                    <td className="p-3">{building.address}</td>
                                    <td className="p-3">{building.company_id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedBuilding(building);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBuilding(building.ID)}
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
                    <p>No buildings available.</p>
                )}

                <BuildingModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedBuilding(null);
                    }}
                    onSubmit={handleSubmitBuilding}
                    companies={companies} // Pass the companies list to the modal
                    initialData={
                        selectedBuilding
                            ? { id: selectedBuilding.ID, name: selectedBuilding.name, address: selectedBuilding.address, company_id: selectedBuilding.company_id }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Buildings;