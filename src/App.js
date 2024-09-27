import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import PaymentPage from './pages/PaymentPage';
import Success from './components/Success';
import Cancel from './components/Cancel';
import ProductCategories from './components/ProductCategories'; // Importer la page des catégories de produits
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Page d'accueil */}
        <Route path="/cart" element={<Cart />} /> {/* Panier */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> {/* Connexion */}
        <Route path="/register" element={<Register />} /> {/* Inscription */}
        <Route path="/profile" element={<Profile />} /> {/* Profil */}
        <Route path="/success" element={<Success />} /> {/* Succès du paiement */}
        <Route path="/cancel" element={<Cancel />} /> {/* Annulation du paiement */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Paiement */}
        <Route path="/categories" element={<ProductCategories />} /> {/* Catégories de produits */}
      </Routes>
    </Router>
  );
};

export default App;
