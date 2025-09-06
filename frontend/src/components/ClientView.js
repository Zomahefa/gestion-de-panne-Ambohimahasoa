import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClientView.css';
import { Link } from 'react-router-dom';
import logoJirama from './logo-jirama.png';


const ClientView = () => {
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todos/');
      setIncidents(res.data);
    } catch (err) {
      console.error("Erreur chargement incidents:", err);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="client-view">
      <div className="header">
        <img src={logoJirama} alt="Logo JIRAMA" className="logo" />
        <h2>📊 Suivi des pannes signalées</h2>
        <Link to="/" className="btn btn-light">🏠 Retour client</Link>
      </div>

      <div className="incident-list mt-3">
        {incidents.map((incident) => (
          <div key={incident.id} className="card mb-3 p-3">
            <h5>{incident.client_name} – {incident.quartier}, {incident.lot}</h5>
            <p><strong>Description :</strong> {incident.description}</p>
            <p><strong>Signalé le :</strong> {new Date(incident.created_at).toLocaleString('fr-FR')}</p>
            <p><strong>Statut actuel :</strong> {
              incident.status === 'pending' ? '🕒 En attente' :
              incident.status === 'on_the_way' ? '🚗 En route' :
              incident.status === 'in_progress' ? '🔧 En cours' :
              incident.status === 'resolved' ? '✅ Terminé' :
              incident.status
            }</p>
            {incident.technician_note && (
              <p><strong>Note du technicien :</strong> {incident.technician_note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientView;
