import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AdminUsers from './pages/AdminUsers';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={user.profile === 'Usuário' ? '/user-dashboard' : '/admin/users'} />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to={user.profile === 'Usuário' ? '/user-dashboard' : '/admin/users'} />}
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/change-password"
        element={user ? <ChangePassword /> : <Navigate to="/login" />}
      />
      <Route
        path="/user-dashboard"
        element={
          user && user.profile === 'Usuário' ? <UserDashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/users"
        element={
          user && user.profile === 'Administrador' ? <AdminUsers /> : <Navigate to="/login" />
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;