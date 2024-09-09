// src/pages/Cart.js
import React from 'react';
import './Cart.css';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Pommes', price: '3.50', quantity: 2 },
    { id: 2, name: 'Lait', price: '1.20', quantity: 3 }
  ];

  const shippingCost = 5.0; // Coût de livraison

  // Calculer le total des articles
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  };

  // Convertir en nombre avant de faire la somme
  const totalAmount = parseFloat(calculateTotal()) + parseFloat(shippingCost);

  return (
    <div className="cart-container">
      <h2>Panier</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x {item.price}€
          </li>
        ))}
      </ul>
      <div className="order-summary">
        <h3>Résumé de la commande</h3>
        <p>Total articles: {calculateTotal().toFixed(2)} €</p>
        <p>Frais de livraison: {shippingCost.toFixed(2)} €</p>
        <p>Total de la commande: {totalAmount.toFixed(2)} €</p>
      </div>
      <button>Procéder au paiement</button>
    </div>
  );
};

export default Cart;
