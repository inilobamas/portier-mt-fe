import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Table from '../components/table/Index';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sideBar/Index';
import { AxiosError } from 'axios';
import EmployeeModal from '../components/employee/IndexModal';

interface Company {
    ID: number;
    name: string;
}

interface Employee {
    ID: number;
    name: string;
    email: string;
    phone: string;
    company_id: number;
}

const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
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

    const fetchEmployees = async () => {
        try {
            const response = await apiClient.get('/employees', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data.data);
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

    useEffect(() => {
        fetchCompanies();
        fetchEmployees();
    }, [token, navigate, logout]);

    // Handle Create and Update submissions
    const handleSubmitEmployee = async (companyData: { id?: number; name: string; email: string, phone: string, company_id?: number; }) => {
        if (selectedEmployee) {
            // Update company
            await apiClient.put(`/employees/${selectedEmployee.ID}`, companyData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Create new company
            await apiClient.post('/employees', companyData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setIsModalOpen(false);
        setSelectedEmployee(null);
        fetchEmployees(); // Refresh the list
    };

    // Handle delete
    const handleDeleteEmployee = async (id: number) => {
        await apiClient.delete(`/employees/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchEmployees();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl">Manage Employees</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Employee
                    </button>
                </div>

                {employees.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="p-3 text-gray-700">ID</th>
                                <th className="p-3 text-gray-700">Name</th>
                                <th className="p-3 text-gray-700">Email</th>
                                <th className="p-3 text-gray-700">Phone</th>
                                <th className="p-3 text-gray-700">Company ID</th>
                                <th className="p-3 text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.ID} className="border-b">
                                    <td className="p-3">{employee.ID}</td>
                                    <td className="p-3">{employee.name}</td>
                                    <td className="p-3">{employee.email}</td>
                                    <td className="p-3">{employee.phone}</td>
                                    <td className="p-3">{employee.company_id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setSelectedEmployee(employee);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEmployee(employee.ID)}
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
                    <p>No employees available.</p>
                )}

                <EmployeeModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedEmployee(null);
                    }}
                    onSubmit={handleSubmitEmployee}
                    companies={companies} // Pass the companies list to the modal
                    initialData={
                        selectedEmployee
                            ? { id: selectedEmployee.ID, name: selectedEmployee.name, email: selectedEmployee.email, phone: selectedEmployee.phone, company_id: selectedEmployee.company_id }
                            : undefined
                    }
                />
            </div>
        </div>
    );
};

export default Employees;