// src/pages/Register.js
import React, { useState } from 'react';
import './Register.css';

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
    confirmSiret: '',
    description: '',
    acceptedTerms: false, // Indique si les CGU ont été acceptées
  });

  const [showAddressFields, setShowAddressFields] = useState(false); // État pour afficher ou cacher les champs d'adresse supplémentaires
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleAddressFields = () => {
    setShowAddressFields(!showAddressFields); // Inverser l'état d'affichage des champs d'adresse supplémentaires
  };

  const validateForm = () => {
    const newErrors = {};

    // Vérifications des champs requis
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email valide requis';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    if (formData.userType === 'particulier' && !formData.address) newErrors.address = 'Adresse requise';

    // Vérification spécifique pour les agriculteurs
    if (formData.userType === 'agriculteur') {
      if (!formData.siret) newErrors.siret = 'Numéro de SIRET requis';
      if (formData.siret !== formData.confirmSiret) newErrors.confirmSiret = 'Le numéro de SIRET ne correspond pas';
    }

    if (!formData.acceptedTerms) newErrors.acceptedTerms = 'Vous devez accepter les CGU';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      // Appeler l'API d'inscription ici pour envoyer les données à votre backend
      console.log(formData);

      // Simuler l'envoi d'un email de confirmation
      alert('Un email de validation a été envoyé à ' + formData.email);

      // Réinitialiser le formulaire après l'envoi
      setFormData({
        name: '',
        email: '',
        password: '',
        address: '',
        street: '',
        address2: '',
        zip: '',
        city: '',
        userType: 'particulier',
        siret: '',
        confirmSiret: '',
        description: '',
        acceptedTerms: false,
      });
      setIsSubmitting(false);
    }
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
          {errors.name && <span className="error">{errors.name}</span>}
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>Adresse :</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onClick={toggleAddressFields}
            required={formData.userType === 'particulier'}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {showAddressFields && formData.userType === 'particulier' && (
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
              {errors.siret && <span className="error">{errors.siret}</span>}
            </div>
            <div>
              <label>Confirmer le numéro de SIRET :</label>
              <input
                type="text"
                name="confirmSiret"
                value={formData.confirmSiret}
                onChange={handleChange}
                required
              />
              {errors.confirmSiret && <span className="error">{errors.confirmSiret}</span>}
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

        <div>
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            required
          />
          <label>
            J'accepte les conditions générales d'utilisation
          </label>
          {errors.acceptedTerms && <span className="error">{errors.acceptedTerms}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Inscription en cours...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
