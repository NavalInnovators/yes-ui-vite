import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Higher-order component to protect routes
const ProtectedRoutes = ({ children }) => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            toast.error('Please login to access this page');
            setShouldRedirect(true);
        }
    }, [token]);

    if (!token) {
        if (shouldRedirect) {
            return <Navigate to="/login" replace />;
        }
        return null; 
    }

    return children;
};

export default ProtectedRoutes;
