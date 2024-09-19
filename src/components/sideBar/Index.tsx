import React from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaBook, FaBuilding, FaFolder, FaKey, FaMale, FaPersonBooth, FaPoo, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface SideBarIconProps {
    icon: React.ReactNode;
    text?: string;
    to: string;  // Add a route path as a prop
}

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-blue dark:bg-gray-900 shadow-lg">
            <SideBarIcon icon={<FaKey size="28" />} text="Key Lock Management" to="/" />
            <Divider />
            <SideBarIcon icon={<FaMale size="32" />} text="Manage Users" to="/users" />
            <SideBarIcon icon={<FaBook size="20" />} text="Manage Companies" to="/companies" />
            <SideBarIcon icon={<FaPersonBooth size="20" />} text="Manage Employees" to="/employees" />
            <SideBarIcon icon={<FaBuilding size="20" />} text="Manage Building" to="/buildings" />
            <SideBarIcon icon={<FaFolder size="20" />} text="Manage Floors" to="/floors" />
            <Divider />
            <SideBarIcon icon={<FaSignOutAlt size="22" />} text="Logout" to="/login" />
        </div>
    );
};

// Modified SideBarIcon to support routing with the `to` prop
const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text = 'Tooltip 💡', to }) => (
    <Link to={to} className="sidebar-icon group text-white hover:bg-blue-800 hover:text-white flex items-center justify-center h-12 w-12 mx-auto my-2 rounded-lg transition-all duration-300 ease-linear">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </Link>
);

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
