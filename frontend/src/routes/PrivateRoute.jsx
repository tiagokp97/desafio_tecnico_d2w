import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('access_token');
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
