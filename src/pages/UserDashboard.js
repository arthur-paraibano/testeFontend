import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserDashboard.css';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="user-dashboard-container">
      <h2>Hola Mundo!</h2>
      <p>Bem-vindo, {user?.name || 'Usuário'}!</p>
      <button onClick={handleLogout} className="btn-primary">Sair</button>
    </div>
  );
}

export default UserDashboard;