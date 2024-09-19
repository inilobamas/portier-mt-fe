import React from 'react';

interface ForbiddenPopupProps {
    show: boolean;
    onClose: () => void;
}

const ForbiddenPopup: React.FC<ForbiddenPopupProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Access Denied</h2>
                <p>You don't have permission to access this resource.</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ForbiddenPopup;
