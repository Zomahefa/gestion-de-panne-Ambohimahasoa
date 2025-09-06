import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ClientView from './components/ClientView';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppClient() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/suivi" element={<ClientView />} />
      </Routes>
    </Router>
  );
}

export default AppClient;
