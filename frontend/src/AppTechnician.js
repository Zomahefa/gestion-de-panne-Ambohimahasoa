import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginTechnician from './components/LoginTechnician';
import TechnicianDashboard from './components/TechnicianDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppTechnician() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginTechnician />} />
        <Route path="/technicien" element={<TechnicianDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppTechnician;
