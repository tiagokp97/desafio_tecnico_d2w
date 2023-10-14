import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import LandingPage from '../pages/LandingPage';
import PrivateRoute from './PrivateRoute';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route
        path='/landing'
        element={
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MyRoutes;
