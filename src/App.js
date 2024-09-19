// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PaymentPage from './pages/PaymentPage'; 
import Success from './components/Success';
import Cancel from './components/Cancel';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<Success />} /> {/* Route pour la réussite du paiement */}
        <Route path="/cancel" element={<Cancel />} /> {/* Route pour l'annulation du paiement */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Route de paiement */}
      </Routes>
    </Router>
  );
};

export default App;
