import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PzjCXGMpjXVa18SP4gtFjDW4Fp7dYBVsrsrWR4WTw3UwGPW0j0TEnOrBanfrqW8CcFjH3c2L5zYRQtQkORqPnXW00C3BTM6tr'); // Clé publique Stripe

const Cart = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:3001/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const session = await response.json();

    // Redirection vers Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <h2>Mon Panier</h2>
      <p>Nom du produit: 20,00€</p>
      <button onClick={handleCheckout}>Payer avec Stripe</button>
    </div>
  );
};

export default Cart;
