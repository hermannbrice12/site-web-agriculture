// src/components/ProductCategories.js
import React from 'react';

const categories = [
  { id: 1, name: 'Fruits', icon: '🍎' },
  { id: 2, name: 'Légumes', icon: '🥕' },
  { id: 3, name: 'Produits laitiers', icon: '🧀' },
  // Ajoutez d'autres catégories ici
];

const ProductCategories = () => {
  return (
    <section className="categories-section">
      <h2>Catégories de Produits</h2>
      <div className="categories">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <span className="category-icon">{category.icon}</span>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
