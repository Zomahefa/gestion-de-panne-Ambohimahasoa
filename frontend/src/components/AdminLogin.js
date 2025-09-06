import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Ajoute ce fichier pour le style

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'jirama2025') {
      navigate('/admin-dashboard');
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>🛠️ Connexion administrateur</h2>
      <form onSubmit={handleLogin} autoComplete="off">
        <label>Nom d'utilisateur</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"/>


        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default AdminLogin;
