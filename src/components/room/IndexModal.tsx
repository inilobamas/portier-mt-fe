import React, { useState, useEffect } from 'react';

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

interface RoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (buildingData: { id?: number, name: string; number: string; floor_id?: number }) => void;
    companies: Company[];
    floors: Floor[];
    rooms: Room[];
    initialData?: { id: number, name: string; number: string; floor_id: number };
}

const RoomModal: React.FC<RoomModalProps> = ({ isOpen, onClose, onSubmit, companies, rooms, floors, initialData }) => {
    const [id, setID] = useState<number | undefined>(undefined);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    // const [company_id, setCompanyID] = useState<number | undefined>(undefined);
    const [floor_id, setFloorID] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setID(initialData.id)
            setName(initialData.name);
            setNumber(initialData.number);
            // setCompanyID(initialData.company_id);
            setFloorID(initialData.floor_id);
        } else {
            setID(undefined)
            setName('');
            setNumber('');
            // if (companies.length > 0) {
            //     setCompanyID(companies[0].ID); // Set default company ID to the first in the list
            // }
            if (floors.length > 0) {
                setFloorID(floors[0].ID); // Set default company ID to the first in the list
            }
        }
    }, [initialData, companies, floors, floors]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id, name, number, floor_id });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? 'Edit Floor' : 'Create Floor'}
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
                        <label className="block text-gray-700">Number</label>
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Building</label>
                        <select
                            value={floor_id !== null ? floor_id : 0}
                            onChange={
                                (e) => {
                                    setFloorID(Number(e.target.value))
                                }
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            {floors.map((floor) => (
                                <option key={floor.ID} value={floor.ID}>
                                    {floor.name}
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

export default RoomModal;
