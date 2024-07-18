import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { username, setUsername } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        setUsername('');
        navigate('/');
    };

    return (
        <header className="bg-white p-4 flex justify-between items-center shadow-md">
            <div className="flex-grow"></div>
            <div className="user-area flex items-center mr-4">
                <div className="flex items-center mr-4">
                    <FaUserCircle className="text-gray-500 text-2xl mr-2" />
                    <span className="text-gray-700">{username}</span> 
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Navbar;
