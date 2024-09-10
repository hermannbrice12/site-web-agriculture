// src/pages/ResetPassword.js
import React, { useState } from 'react';
import './ResetPassword.css'; // Assurez-vous que ce fichier existe et est bien stylisé

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request'); // 'request' ou 'verify'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'code':
        setCode(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const validateRequest = () => {
    const newErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email valide requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReset = () => {
    const newErrors = {};
    if (!code) newErrors.code = 'Code de sécurité requis';
    if (!newPassword) newErrors.newPassword = 'Nouveau mot de passe requis';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (validateRequest()) {
      setIsSubmitting(true);
      // Appeler l'API pour envoyer le code de sécurité au email
      console.log('Demande de réinitialisation envoyée à:', email);

      // Passer à l'étape de vérification
      setStep('verify');
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (validateReset()) {
      setIsSubmitting(true);
      // Appeler l'API pour réinitialiser le mot de passe
      console.log('Réinitialisation du mot de passe pour le code:', code);

      // Réinitialiser les champs après soumission
      setEmail('');
      setCode('');
      setNewPassword('');
      setConfirmPassword('');
      setStep('request');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Réinitialisation du Mot de Passe</h2>
      {step === 'request' ? (
        <form onSubmit={handleRequestSubmit}>
          <div>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le code de sécurité'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit}>
          <div>
            <label>Code de sécurité :</label>
            <input
              type="text"
              name="code"
              value={code}
              onChange={handleChange}
              required
            />
            {errors.code && <span className="error">{errors.code}</span>}
          </div>
          <div>
            <label>Nouveau mot de passe :</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
          </div>
          <div>
            <label>Confirmer le mot de passe :</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
