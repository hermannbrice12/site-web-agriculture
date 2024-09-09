// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Prix: {product.price} €</p>
      <button>Ajouter au panier</button>
    </div>
  );
};

export default ProductCard;
