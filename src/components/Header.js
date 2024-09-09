// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Importer l'icône de l'utilisateur
import './Header.css';

const Header = () => {
  const [authMenuOpen, setAuthMenuOpen] = useState(false); // État pour afficher ou cacher le menu d'authentification

  const toggleAuthMenu = () => {
    setAuthMenuOpen(!authMenuOpen); // Inverser l'état d'affichage du menu d'authentification
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Agriculteur</Link> {/* Logo du site */}
      </div>
      <nav className="nav-bar">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/products">Produits</Link></li>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart className="cart-icon" /> {/* Icône de panier */}
              Panier
            </Link>
          </li>
          <li className="auth-container" onClick={toggleAuthMenu}>
            <FaUser className="auth-icon" /> {/* Icône d'utilisateur */}
            {authMenuOpen && ( // Si le menu est ouvert, afficher les options
              <div className="auth-dropdown">
                <Link to="/login" className="auth-item">Se connecter</Link>
                <Link to="/register" className="auth-item">S'inscrire</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
