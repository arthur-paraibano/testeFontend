import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers } from '../services/api';
import '../styles/AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        console.log('Resposta de /user/all:', res.data);
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err.response);
        setError('Erro ao carregar usuários.');
      }
    };
    fetchUsers();
  }, []); // Array de dependências vazio para rodar apenas uma vez ao montar o componente

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-users-container">
      <h2>Painel do Administrador</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} className="btn-primary">Sair</button>
    </div>
  );
}

export default AdminUsers;