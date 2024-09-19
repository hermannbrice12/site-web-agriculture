// src/pages/PaymentPage.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Le formulaire de paiement

// Remplacez par votre propre clé API publique Stripe
const stripePromise = loadStripe('pk_test_51PzjCXGMpjXVa18SP4gtFjDW4Fp7dYBVsrsrWR4WTw3UwGPW0j0TEnOrBanfrqW8CcFjH3c2L5zYRQtQkORqPnXW00C3BTM6tr');

const PaymentPage = () => {
  return (
    <div>
      <h2>Paiement</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
