// src/components/FeaturedProducts.js
import React from 'react';

const featuredProducts = [
  { id: 1, name: 'Pommes Bio', price: '2.99 € / kg', image: 'apple.jpg' },
  { id: 2, name: 'Carottes', price: '1.99 € / kg', image: 'carrot.jpg' },
  { id: 3, name: 'Fromage de Chèvre', price: '4.99 € / pièce', image: 'cheese.jpg' },
  // Ajoutez d'autres produits ici
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products-section">
      <h2>Produits en Vedette</h2>
      <div className="featured-products">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
