import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginTechnician.css';
import logoJirama from './logo-jirama.png';

const LoginTechnician = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'jirama2025') {
      setAuthenticated(true);
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (authenticated) {
    return <Navigate to="/technicien" />;
  }

  return (
    <div className="login-container">
      <img src={logoJirama} alt="Logo JIRAMA" className="logo-jirama" />
      <h2>🔐 Accès technicien</h2>
      <input
        type="password"
        name="password"
        autoComplete="new-password"
        className="form-control"
        placeholder="Mot de passe technicien"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <small className="text-muted">Mot de passe confidentiel réservé aux techniciens JIRAMA</small>
      <button className="btn btn-warning mt-3" onClick={handleLogin}>
        Se connecter
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default LoginTechnician;
