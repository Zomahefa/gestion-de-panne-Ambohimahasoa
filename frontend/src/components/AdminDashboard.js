import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';


const statusLabels = {
  pending: 'En attente',
  on_the_way: 'En route',
  in_progress: 'En cours',
  resolved: 'Terminé',
};

const AdminDashboard = () => {
  const [pannes, setPannes] = useState([]);

  const fetchPannes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todos/');
      setPannes(res.data);
    } catch (err) {
      console.error('Erreur de chargement', err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '🗑️ Supprimer ce signalement ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/todos/${id}/`);
        setPannes(pannes.filter((p) => p.id !== id));
        Swal.fire('Supprimé !', 'Le signalement a été supprimé.', 'success');
      } catch (err) {
        Swal.fire('Erreur', 'La suppression a échoué.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchPannes();
  }, []);

  return (
    <div className="admin-dashboard-container">
        <div className="admin-nav mb-4">
            <Link to="/" className="btn btn-outline-primary me-2">🏠 Accueil client</Link>
            <Link to="/login" className="btn btn-outline-secondary me-2">🔧 Technicien</Link>
            <Link to="/suivi" className="btn btn-outline-warning">📊 Suivi des pannes</Link>        
        </div>

      <h2>📋 Tableau de bord administrateur</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Client</th>
            <th>Contact</th>
            <th>Quartier</th>
            <th>Localisation</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pannes.map((panne) => (
            <tr key={panne.id}>
              <td>{panne.client_name}</td>
              <td>{panne.contact}</td>
              <td>{panne.quartier}</td>
              <td>{panne.localisation}</td>
              <td>{panne.description}</td>
              <td>{statusLabels[panne.status]}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(panne.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
