import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TechnicianDashboard.css';
import { Link } from 'react-router-dom';


const TechnicianDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState('Tous');

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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/todos/${id}/`, { status: newStatus });
      setIncidents(prev =>
        prev.map(incident =>
          incident.id === id ? { ...incident, status: newStatus } : incident
        )
      );
    } catch (err) {
      console.error("Erreur mise à jour statut:", err);
    }
  };

  const filteredIncidents = filter === 'Tous'
    ? incidents
    : incidents.filter(i => i.status === filter.toLowerCase());

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <Link to="/" className="btn btn-outline-primary">🏠 Retour client</Link>
    </div>

      <h2>🔧 Tableau de bord technicien</h2>

      <select className="form-select mb-3" onChange={e => setFilter(e.target.value)}>
        <option value="Tous">Tous</option>
        <option value="pending">En attente</option>
        <option value="on_the_way">En route</option>
        <option value="in_progress">En cours</option>
        <option value="resolved">Résolu</option>
      </select>

      <ul>
        {filteredIncidents.map(incident => (
          <li key={incident.id}>
            <strong>{incident.client_name}</strong> – {incident.localisation}
            <br />
            <em>Statut : {
              incident.status === 'pending' ? '🕒 En attente' :
              incident.status === 'on_the_way' ? '🚗 En route' :
              incident.status === 'in_progress' ? '🔧 En cours' :
              incident.status === 'resolved' ? '✅ Résolu' :
              incident.status
            }</em>
            <br />

            <label className="mt-2">Changer le statut :</label>
            <select
              className="form-select mt-1"
              value={incident.status}
              onChange={(e) => handleStatusUpdate(incident.id, e.target.value)}
            >
              <option value="pending">🕒 En attente</option>
              <option value="on_the_way">🚗 En route</option>
              <option value="in_progress">🔧 En cours</option>
              <option value="resolved">✅ Résolu</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnicianDashboard;
