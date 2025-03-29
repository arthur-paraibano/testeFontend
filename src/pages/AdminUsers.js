import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminUsers.css';

function AdminUsers() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-users-container">
      <h2>Painel do Administrador</h2>
      <p>Área restrita para administradores.</p>
      <button onClick={handleLogout} className="btn-primary">Sair</button>
    </div>
  );
}

export default AdminUsers;