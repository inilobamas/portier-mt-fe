import React, { useState, useEffect } from 'react';

interface Role {
    ID: number;
    name: string;
}

interface Company {
    ID: number;
    name: string;
}

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (employeeData: { id?: number; username: string; password: string; company_id?: number; role_id?: number }) => void;
    companies: Company[];
    roles: Role[];
    initialData?: { id: number, username: string; password: string; company_id: number, role_id: number };
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, companies, roles, initialData }) => {
    const [id, setID] = useState<number | undefined>(undefined);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role_id, setRoleID] = useState<number | undefined>(undefined);
    const [company_id, setCompanyID] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setID(initialData.id)
            setUsername(initialData.username);
            setPassword(initialData.password);
            setCompanyID(initialData.company_id);
            setRoleID(initialData.role_id);
        } else {
            setID(undefined)
            setUsername('');
            setPassword('');
            if (companies.length > 0) {
                setCompanyID(companies[0].ID); // Set default company ID to the first in the list
            }
            if (roles.length > 0) {
                setRoleID(roles[0].ID); // Set default company ID to the first in the list
            }
        }
    }, [initialData, companies, roles]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id, username, password, company_id, role_id });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? 'Edit User' : 'Create User'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Company</label>
                        <select
                            value={company_id !== null ? company_id : 0}
                            onChange={
                                (e) => {
                                    setCompanyID(Number(e.target.value))
                                }
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            {companies.map((company) => (
                                <option key={company.ID} value={company.ID}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            value={role_id !== null ? role_id : 0}
                            onChange={
                                (e) => {
                                    setRoleID(Number(e.target.value))
                                }
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            {roles.map((role) => (
                                <option key={role.ID} value={role.ID}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            {initialData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
