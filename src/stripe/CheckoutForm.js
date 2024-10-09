import React, { useState } from 'react';
import './CheckoutForm.css'; 

const CheckoutForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('01');
  const [expiryYear, setExpiryYear] = useState('2024');
  const [cvv, setCvv] = useState('');

  // Fonction pour formater le numéro de carte
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Supprimer tout caractère non numérique
    if (value.length > 16) {
      value = value.slice(0, 16); // Limite à 16 chiffres
    }
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Ajouter des espaces tous les 4 chiffres
    setCardNumber(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
    if (value.length <= 3) { // Limite à 3 chiffres
      setCvv(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log({
      cardNumber,
      cardName,
      expiryMonth,
      expiryYear,
      cvv,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Ajouter une carte </h2>

      <div className="form-group">
        <label htmlFor="cardNumber">Numéro de carte</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 1234 1234 1234"
          maxLength="19" 
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cardName">Nom sur la carte</label>
        <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Nom complet"
          required
        />
      </div>

      <div className="form-group-expiration">
        <label>Date d'expiration</label>
        <div className="expiration-inputs">
          <select
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
          >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cvv">Code de sécurité (CVV)</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={handleCvvChange}
          placeholder="CVV"
          maxLength="3"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">Ajouter votre carte</button>
        <button type="button">Annuler</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
