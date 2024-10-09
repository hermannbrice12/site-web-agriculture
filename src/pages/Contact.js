// src/pages/Contact.js

import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <p>Si vous avez des questions ou souhaitez nous contacter, utilisez les informations ci-dessous :</p>
      <ul>
        <li>Email : support@agriculture.com</li>
        
      </ul>
      <form className="contact-form">
        <label>Nom :</label>
        <input type="text" placeholder="Votre nom" required />

        <label>Email :</label>
        <input type="email" placeholder="Votre email" required />

        <label>Message :</label>
        <textarea placeholder="Votre message" required></textarea>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
