import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword } from '../services/api';
import '../styles/ChangePasswordFirstLogin.css';

function ChangePasswordFirstLogin() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    try {
      const updatedUser = {
        id: user.id,
        name: user.name, // Mantemos o nome atual, pois o backend exige
        password: newPassword,
      };
      const res = await updatePassword(updatedUser);

      // Após atualizar a senha, força o logout
      logout();
      navigate('/login');
    } catch (err) {
      console.error('Erro ao atualizar senha:', err.response);
      setError(err.response?.data?.message || 'Erro ao atualizar a senha. Tente novamente.');
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-box">
        <h2>Primeiro Acesso</h2>
        <p>Por favor, defina uma nova senha para continuar.</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordFirstLogin;