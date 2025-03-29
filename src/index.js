import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe de 'react-dom/client' em vez de 'react-dom'
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Crie uma raiz com createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderize o aplicativo na raiz
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);