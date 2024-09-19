import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sideBar/Index';
import { AxiosError } from 'axios';
import CompanyModal from '../components/company/IndexModal';

interface Company {
    ID: number;
    name: string;
    description: string;
}

const Companies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
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
                console.error('Error fetching companies', error);
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
    }, [token, navigate, logout]);

    // Handle Create and Update submissions
    const handleSubmitCompany = async (companyData: { id?: number; name: string; description: string }) => {
        if (selectedCompany) {
            // Update company
            await apiClient.put(`/companies/${selectedCompany.ID}`, companyData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Create new company
            await apiClient.post('/companies', companyData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedCompany(null);
        fetchCompanies(); // Refresh the list
    };

    // Handle delete
    const handleDeleteCompany = async (id: number) => {
        await apiClient.delete(`/companies/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchCompanies();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Companies</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Company
                    </button>
                </div>

                {companies.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">ID</th>
                                <th className="p-3 text-gray-700">Name</th>
                                <th className="p-3 text-gray-700">Description</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr key={company.ID} className="border-b">
                                    <td className="p-3">{company.ID}</td>
                                    <td className="p-3">{company.name}</td>
                                    <td className="p-3">{company.description}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedCompany(company);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCompany(company.ID)}
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
                    <p>No companies available.</p>
                )}

                <CompanyModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedCompany(null);
                    }}
                    onSubmit={handleSubmitCompany}
                    initialData={
                        selectedCompany
                            ? { id: selectedCompany.ID, name: selectedCompany.name, description: selectedCompany.description }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Companies;