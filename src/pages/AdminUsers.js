import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteUser, getAllUsers } from '../services/api';
import '../styles/AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err.response);
        setError('Erro ao carregar usuários.');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (id === user.id) {
      setError('Você não pode excluir o usuário atualmente logado.');
      return;
    }

    try {
      await deleteUser(id); // Chama o endpoint /user/delete com o id
      setUsers(users.filter((u) => u.id !== id)); // Remove o usuário da lista localmente
      setError(''); // Limpa qualquer erro anterior
    } catch (err) {
      console.error('Erro ao excluir usuário:', err.response);
      setError('Erro ao excluir usuário.');
    }
  };

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
            <th>Perfil</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.profile}</td>
              <td>{u.cpf}</td>
              <td>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="btn-delete"
                  disabled={u.id === user.id} // Desativa o botão para o usuário logado
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} className="btn-primary">Sair</button>
    </div>
  );
}

export default AdminUsers;