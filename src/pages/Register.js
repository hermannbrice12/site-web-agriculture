// src/pages/Register.js
import React, { useState } from 'react';
import './Register.css'; // Assurez-vous que ce fichier existe et est bien stylisé

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    street: '',
    address2: '',
    zip: '',
    city: '',
    userType: 'particulier', // Définit le type d'utilisateur par défaut
    siret: '',
    description: ''
  });

  const [showAddressFields, setShowAddressFields] = useState(false); // État pour afficher ou cacher les champs d'adresse supplémentaires

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAddressFields = () => {
    setShowAddressFields(!showAddressFields); // Inverser l'état d'affichage des champs d'adresse supplémentaires
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Remplacez ceci par l'appel à l'API d'inscription
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adresse :</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onClick={toggleAddressFields} // Basculer l'affichage des champs d'adresse supplémentaires
            required
          />
        </div>

        {/* Afficher ou masquer les champs supplémentaires d'adresse en fonction de l'état */}
        {showAddressFields && (
          <>
            <div>
              <label>Numéro et voie :</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Complément d'adresse :</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Code postal :</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ville :</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div>
          <label>Type d'utilisateur :</label>
          <select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="particulier">Particulier</option>
            <option value="agriculteur">Agriculteur</option>
          </select>
        </div>

        {/* Afficher les champs supplémentaires si l'utilisateur est un agriculteur */}
        {formData.userType === 'agriculteur' && (
          <>
            <div>
              <label>Numéro de SIRET :</label>
              <input
                type="text"
                name="siret"
                value={formData.siret}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description de l'exploitation :</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
