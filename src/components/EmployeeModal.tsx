import React, { useState, useEffect } from 'react';

interface Company {
    ID: number;
    name: string;
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (employeeData: { id?: number, name: string; email: string, phone: string, companyID?: number }) => void;
    companies: Company[];
    initialData?: { id: number, name: string; email: string, phone: string, companyID: number };
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSubmit, companies, initialData }) => {
    const [id, setID] = useState<number | undefined>(undefined);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyID, setCompanyID] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setID(initialData.id)
            setName(initialData.name);
            setEmail(initialData.email);
            setPhone(initialData.phone);
            setCompanyID(initialData.companyID);
        } else {
            setID(undefined)
            setName('');
            setEmail('');
            setPhone('');
            if (companies.length > 0) {
                setCompanyID(companies[0].ID); // Set default company ID to the first in the list
            }
        }
    }, [initialData, companies]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("companyID", companyID)
        onSubmit({ id, name, email, phone, companyID });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? 'Edit Employee' : 'Create Employee'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Company</label>
                        <select
                            value={companyID !== null ? companyID : 0}
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

export default EmployeeModal;
