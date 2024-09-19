import React, { useState, useEffect } from 'react';

interface Company {
    ID: number;
    name: string;
}

interface Lock {
    ID: number;
    name: string;
    brand: string;
    room_id: number;
}

interface Room {
    ID: number;
    name: string;
    number: string;
    floor_id: number;
}

interface LockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (lockData: { id?: number, name: string; brand: string; room_id?: number }) => void;
    companies: Company[];
    locks: Lock[];
    rooms: Room[];
    initialData?: { id: number, name: string; brand: string; room_id: number };
}

const LockModal: React.FC<LockModalProps> = ({ isOpen, onClose, onSubmit, companies, rooms, locks, initialData }) => {
    const [id, setID] = useState<number | undefined>(undefined);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    // const [company_id, setCompanyID] = useState<number | undefined>(undefined);
    const [room_id, setRoomID] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setID(initialData.id)
            setName(initialData.name);
            setBrand(initialData.brand);
            // setCompanyID(initialData.company_id);
            setRoomID(initialData.room_id);
        } else {
            setID(undefined)
            setName('');
            setBrand('');
            // if (companies.length > 0) {
            //     setCompanyID(companies[0].ID); // Set default company ID to the first in the list
            // }
            if (locks.length > 0) {
                setRoomID(locks[0].ID); // Set default company ID to the first in the list
            }
        }
    }, [initialData, companies, locks, rooms]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id, name, brand, room_id });
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
                        <label className="block text-gray-700">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Building</label>
                        <select
                            value={room_id !== null ? room_id : 0}
                            onChange={
                                (e) => {
                                    setRoomID(Number(e.target.value))
                                }
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            {rooms.map((room) => (
                                <option key={room.ID} value={room.ID}>
                                    {room.name}
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

export default LockModal;
