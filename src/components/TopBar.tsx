import React, { useEffect, useState } from 'react';

const TopBar = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Get the username from localStorage when the component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []); // Empty dependency array means this runs only once after the component mounts

    return (
        <div className="bg-blue dark:bg-gray-900 shadow-lg p-4 text-white flex justify-between items-center">
            <div className="text-lg font-semibold"></div>
            <div>
                {/* Display the username or "Guest" if no username is available */}
                <span>{username ? username : ''}</span>
            </div>
        </div>
    );
};

export default TopBar;
