// src/CheckoutForm.js
import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import './CheckoutForm.css'; // Pour le style

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email,
      },
    });

    if (error) {
      console.log('[error]', error);
      setPaymentProcessing(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Ici, tu peux envoyer les infos au backend pour finaliser le paiement
      setPaymentProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Nom du produit</h2>
      <p>0,00 €</p>
      
      <div className="payment-section">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <CardElement className="card-element" />
        <button type="submit" disabled={!stripe || paymentProcessing}>
          {paymentProcessing ? 'Processing...' : 'Payer'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
