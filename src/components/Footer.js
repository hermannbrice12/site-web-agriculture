// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/contact">Contact</Link>
        <Link to="/terms">Conditions d'utilisation</Link>
        <Link to="/privacy">Mentions Légales</Link>
      </div>
      <p>© 2024 Agriculteur Hub. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
