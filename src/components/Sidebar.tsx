import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`bg-gray-800 h-screen ${isCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
            <button
                onClick={toggleSidebar}
                className="text-white p-2 focus:outline-none focus:bg-gray-600 w-full"
            >
                {isCollapsed ? '>' : '<'}
            </button>

            <nav className="mt-10">
                <ul>
                    <li className="mb-4">
                        <Link to="/users" className="text-white flex items-center p-2 hover:bg-gray-700">
                            <span className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Manage Users</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/companies" className="text-white flex items-center p-2 hover:bg-gray-700">
                            <span className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Manage Companies</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/employees" className="text-white flex items-center p-2 hover:bg-gray-700">
                            <span className={`${isCollapsed ? 'hidden' : 'inline'} ml-2`}>Manage Employees</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
