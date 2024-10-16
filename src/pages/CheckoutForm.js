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
  const [name, setName] = useState('');
  const [country, setCountry] = useState('États-Unis');
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
        name,
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
      {/* Bouton PayPal */}
      <div className="paypal-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
      </div>

      {/* Champ du nom du titulaire de la carte */}
      <input
        type="text"
        placeholder="Nom du titulaire de la carte"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Champ E-mail */}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Sélecteur de pays/région */}
      <div className="country-select">
        <label htmlFor="country">Pays</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="États-Unis">États-Unis</option>
          <option value="France">France</option>
          <option value="Canada">Canada</option>
            <option value="Italie">Italie</option>
          <option value="Royaume-Uni">Royaume-Uni</option>
          {/* Ajouter d'autres options si nécessaire */}
        </select>
      </div>

      {/* Champ de la carte et les logos */}
      <div className="card-input-container">
        <CardElement className="card-element" />
        <div className="card-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" />
          {/* Ajouter d'autres logos ici */}
        </div>
      </div>

      {/* Champs pour MM/AA et CVC */}
      <div className="expiry-cvc-container">
        <input
          type="text"
          className="expiry-input"
          placeholder="MM/AA"
          required
        />
        <input
          type="text"
          className="cvc-input"
          placeholder="CVC"
          required
        />
      </div>

      <button type="submit" disabled={!stripe || paymentProcessing}>
        {paymentProcessing ? 'Processing...' : 'Payer'}
      </button>
    </form>
  );
};

export default CheckoutForm;
