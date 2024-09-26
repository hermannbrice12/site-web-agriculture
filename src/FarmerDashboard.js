import React, { useState } from 'react';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  // Liste des produits avec nom, prix et description
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomates Bio', price: '5,00 €', description: 'Tomates fraîches et bio.' },
    { id: 2, name: 'Pommes de Terre', price: '2,50 €', description: 'Pommes de terre de qualité.' },
    { id: 3, name: 'Carottes', price: '3,00 €', description: 'Carottes croquantes et bio.' }
  ]);

  return (
    <div className="dashboard">
      <h4>Tableau de Bord de l'Agriculteur</h4>
      <button>Ajouter un Nouveau Produit</button>

      <div className="product-list">
        <h5>Produits Actuels</h5>
        {products.length > 0 ? (
          <ul>
            {products.map(product => (
              <li key={product.id} className="product-item">
                <h6>{product.name}</h6>
                <p>{product.description}</p>
                <span>{product.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun produit disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
