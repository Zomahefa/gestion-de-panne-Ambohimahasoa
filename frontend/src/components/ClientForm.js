import React, { useState } from 'react';
import axios from 'axios';
import './ClientForm.css';
import { Link } from 'react-router-dom';
import logoJirama from './logo-jirama.png';


const ClientForm = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    contact: '',
    quartier: '',
    lot: '',
    localisation: '',
    description: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Suppression de la validation du numéro
    // On accepte tout ce que l'utilisateur entre

    try {
      await axios.post('http://localhost:8000/api/todos/', {
        ...formData,
        status: 'pending',
      });
      setSuccess(true);
      setError('');
      setFormData({
        client_name: '',
        contact: '',
        quartier: '',
        lot: '',
        localisation: '',
        description: '',
      });
    } catch (err) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
      setSuccess(false);
    }
  };

  return (
    <div className="client-form-container">
      <div className="header">
        <img src={logoJirama} alt="Logo JIRAMA" className="logo" />
        <div className="client-nav mb-4">
          <Link to="/login" className="btn btn-outline-secondary">🔧 Accès technicien</Link>
          <Link to="/suivi" className="btn btn-outline-warning">📊 Suivi des pannes</Link>
          <Link to="/admin-login" className="btn btn-outline-dark">🛠️ Administration</Link>
        </div>

      </div>

      <h2>📢 Signaler une panne JIRAMA</h2>

      <form onSubmit={handleSubmit}>
        <label>Nom du client</label>
        <input
          type="text"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          required
        />

        <label>Contact (téléphone)</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label>Quartier</label>
        <input
          type="text"
          name="quartier"
          value={formData.quartier}
          onChange={handleChange}
          required
        />

        <label>Lot / Bloc</label>
        <input
          type="text"
          name="lot"
          value={formData.lot}
          onChange={handleChange}
        />

        <label>Localisation précise</label>
        <input
          type="text"
          name="localisation"
          value={formData.localisation}
          onChange={handleChange}
          required
        />

        <label>Description de la panne</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-success mt-3">
          📨 Envoyer le signalement
        </button>
      </form>

      {success && <p className="success-message">✅ Signalement envoyé avec succès !</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ClientForm;
