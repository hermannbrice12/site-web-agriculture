// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; 
import './Header.css';

const Header = () => {
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo && userInfo.token) { // Vérifier si un token existe
      setIsAuthenticated(true);
      setUserData(userInfo);
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  const toggleAuthMenu = () => {
    setAuthMenuOpen(!authMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserData(null);
    setAuthMenuOpen(false); // Fermer le menu après déconnexion
    navigate('/');
  };

  const handleLogin = () => {
    setAuthMenuOpen(false); // Fermer le menu après clic sur "Se connecter"
    navigate('/login');
  };

  const handleRegister = () => {
    setAuthMenuOpen(false); // Fermer le menu après clic sur "S'inscrire"
    navigate('/register');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">AgriRescue</Link>
      </div>
      <nav className="nav-bar">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/products">Produits</Link></li>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart className="cart-icon" /> 
              Panier
            </Link>
          </li>
          <li className="auth-container">
            <div onClick={toggleAuthMenu} className="auth-menu-trigger">
              <FaUser className="auth-icon" /> 
              {isAuthenticated ? userData.name : 'Compte'}
            </div>
            {authMenuOpen && (
              <div className="auth-dropdown">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="auth-item" onClick={() => setAuthMenuOpen(false)}>Mon profil</Link>
                    <button onClick={handleLogout} className="auth-item">Se déconnecter</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleLogin} className="auth-item">Se connecter</button>
                    <button onClick={handleRegister} className="auth-item">S'inscrire</button>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;