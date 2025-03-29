import { jwtDecode } from 'jwt-decode'; // Mudança aqui: de "import jwtDecode" para "import { jwtDecode }"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/api';
import '../styles/Login.css';

function Login() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados enviados:', form);
    try {
      const res = await login(form);
      console.log('Resposta da API:', res.data);
      const { token } = res.data; // Extrai apenas o token
      const decodedToken = jwtDecode(token); // Usa jwtDecode como função
      console.log('Token decodificado:', decodedToken);

      // Supondo que o profile esteja no payload do token como "profile" ou "role"
      const user = {
        name: decodedToken.name || form.name, // Pega o nome do token ou do form
        profile: decodedToken.profile || decodedToken.role, // Ajuste conforme o campo no token
      };

      loginContext(user, token); // Passa user e token separados para o contexto

      // Redireciona com base no profile
      if (user.profile === 'USUÁRIO') {
        navigate('/user-dashboard');
      } else if (user.profile === 'ADMINISTRADOR') {
        navigate('/admin/users');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Erro da API:', err.response);
      setError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome de Usuário</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome de usuário"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
        <p className="register-link">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;