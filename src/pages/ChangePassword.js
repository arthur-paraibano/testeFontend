import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/users/${user.id}/password`, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }); // Ajuste o endpoint
      setSuccess('Senha alterada com sucesso!');
      setError('');
    } catch (err) {
      setError('Erro ao alterar senha.');
      setSuccess('');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Trocar Senha</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Senha Atual"
          value={form.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nova Senha"
          value={form.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Nova Senha"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Alterar Senha</button>
      </form>
    </div>
  );
}

export default ChangePassword;