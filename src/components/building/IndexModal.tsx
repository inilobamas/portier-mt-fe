import React, { useState, useEffect } from 'react';

interface Company {
    ID: number;
    name: string;
}

interface BuildingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (buildingData: { id?: number, name: string; address: string; company_id?: number }) => void;
    companies: Company[];
    initialData?: { id: number, name: string; address: string; company_id: number };
}

const BuildingModal: React.FC<BuildingModalProps> = ({ isOpen, onClose, onSubmit, companies, initialData }) => {
    const [id, setID] = useState<number | undefined>(undefined);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [company_id, setCompanyID] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setID(initialData.id)
            setName(initialData.name);
            setAddress(initialData.address);
            setCompanyID(initialData.company_id);
        } else {
            setID(undefined)
            setName('');
            setAddress('');
            if (companies.length > 0) {
                setCompanyID(companies[0].ID); // Set default company ID to the first in the list
            }
        }
    }, [initialData, companies]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id, name, address, company_id });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? 'Edit Building' : 'Create Building'}
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
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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

export default BuildingModal;
