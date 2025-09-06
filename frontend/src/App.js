import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ClientView from './components/ClientView';
import LoginTechnician from './components/LoginTechnician';
import TechnicianDashboard from './components/TechnicianDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Vue client */}
        <Route path="/" element={<ClientForm />} />
        <Route path="/suivi" element={<ClientView />} />

        {/* Vue technicien */}
        <Route path="/login" element={<LoginTechnician />} />
        <Route path="/technicien" element={<TechnicianDashboard />} />

        {/* Redirection si route inconnue */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
