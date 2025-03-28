import axios from 'axios';
import { useEffect, useState } from 'react';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/users'); // Ajuste o endpoint
        setUsers(res.data);
      } catch (err) {
        setError('Erro ao carregar usuários.');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`); // Ajuste o endpoint
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Erro ao excluir usuário.');
    }
  };

  return (
    <div className="admin-users-container">
      <h2>Lista de Usuários</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;