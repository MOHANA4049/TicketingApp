import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        // Retrieve the username from localStorage if it exists
        return localStorage.getItem('username') || '';
    });

    useEffect(() => {
        if (username) {
            // Save the username to localStorage whenever it changes
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
