import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { username } = useUserContext();

    return username ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
