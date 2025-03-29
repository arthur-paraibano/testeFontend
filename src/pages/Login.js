import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';


function Login() {
  const [form, setForm] = useState({ name: 'arthur', password: '12345' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', form); // Ajuste o endpoint
      login(res.data); // Supondo que a API retorna { id, name, email, cpf, role }
      navigate('/home');
    } catch (err) {
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
            <label htmlFor="name">Nome</label>
            <input
              type="name"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
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