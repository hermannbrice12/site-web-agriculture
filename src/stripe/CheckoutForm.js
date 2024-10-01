import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
        address: {
          country: country, 
        },
      },
    });

    if (error) {
      console.log('[error]', error);
      setPaymentProcessing(false);
      return;
    }

    // Poursuivre le paiement avec la méthode de paiement créée
    processPayment(paymentMethod);
  };

  const processPayment = async (paymentMethod) => {
    console.log('[PaymentMethod]', paymentMethod);
    setPaymentProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* Bouton Apple Pay */}
      <div className="apple-pay-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" />
      </div>

      {/* Bouton PayPal */}
      <div className="paypal-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
      </div>

      <p className="or-text">Ou payer par carte</p>

      {/* Champ E-mail */}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Champ de la carte et les logos */}
      <div className="card-input-container">
        <CardElement className="card-element" />
        <div className="card-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" />
        </div>
      </div>

      {/* Champ pour le nom du titulaire de la carte */}
      <input
        type="text"
        placeholder="Nom du titulaire de la carte"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Sélecteur de pays */}
      <div className="country-select">
        <label htmlFor="country">Pays ou région</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="États-Unis">États-Unis</option>
          <option value="France">France</option>
          <option value="Canada">Canada</option>
          <option value="Royaume-Uni">Royaume-Uni</option>
        </select>
      </div>

      <button type="submit" disabled={!stripe || paymentProcessing}>
        {paymentProcessing ? 'Processing...' : 'Payer'}
      </button>
    </form>
  );
};

export default CheckoutForm;
