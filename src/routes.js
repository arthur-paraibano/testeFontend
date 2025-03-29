import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AdminUsers from './pages/AdminUsers';
import ChangePassword from './pages/ChangePassword';
import ChangePasswordFirstLogin from './pages/ChangePasswordFirstLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rota de login sempre acessível se não autenticado */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={user.firstLogin ? '/change-password-first' : user.profile === 'ADMINISTRADOR' ? '/admin/users' : '/user-dashboard'} />}
      />

      {/* Rotas restritas apenas para usuários autenticados */}
      <Route
        path="/change-password-first"
        element={user ? <ChangePasswordFirstLogin /> : <Navigate to="/login" />}
      />
      <Route
        path="/user-dashboard"
        element={user && user.profile === 'USUÁRIO' ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/users"
        element={user && user.profile === 'ADMINISTRADOR' ? <AdminUsers /> : <Navigate to="/login" />}
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
        path="/register"
        element={!user ? <Register /> : <Navigate to={user.profile === 'ADMINISTRADOR' ? '/admin/users' : '/user-dashboard'} />}
      />

      {/* Redireciona qualquer outra rota para /login se não autenticado */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;