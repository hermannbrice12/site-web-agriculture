import React from 'react'; 
import { Link } from 'react-router-dom'; // Importation de Link

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Achetez des produits agricoles invendus à bas prix</h1>
        <p>Réduisez le gaspillage alimentaire et soutenez les agriculteurs locaux !</p>

        {/* Utilisation de Link pour rediriger vers la page des catégories */}
        <Link to="/categories">
          <button className="cta-button">Découvrez nos produits</button>
        </Link>

        {/* Bande rouge avec le texte STOP AU GASPILLAGE */}
        <div className="red-banner">
          <p className="stop-gaspillage-text">STOP AU GASPILLAGE</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
