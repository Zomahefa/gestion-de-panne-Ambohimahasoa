import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginTechnician.css';
import logoJirama from './logo-jirama.png';

const LoginTechnician = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.access);
      setAuthenticated(true);
  }catch (err) {
      setError('Nom ou mot de passe incorrect');
      console.log(err.response?.data); // pour debug
    }
  };


  if (authenticated) {
    return <Navigate to="/technicien" />;
  }

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
      <img src={logoJirama} alt="Logo JIRAMA" className="logo-jirama" />
      <h2>🔐 Connexion Technicien</h2>
      <input
        type="text"
        name="username"
        autoComplete="off"
        className="form-control"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        autoComplete="new-password"
        className="form-control mt-2"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="btn btn-warning mt-3" onClick={handleLogin}>
        Se connecter
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default LoginTechnician;
