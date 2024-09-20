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
    userType: 'particulier',
    siret: '',
    description: '',
    acceptedTerms: false,
    companyName: '',
    companyAddress: '',
    companyStreet: '',
    companyAddress2: '',
    companyZip: '',
    companyCity: '',
  });

  const [showAddressFields, setShowAddressFields] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siretConfirmed, setSiretConfirmed] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleAddressFields = () => {
    setShowAddressFields(!showAddressFields);
  };

  const toggleCompanyInfo = () => {
    setShowCompanyInfo(!showCompanyInfo);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email valide requis';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    if (formData.userType === 'particulier' && !formData.address) newErrors.address = 'Adresse requise';
    if (formData.userType === 'agriculteur') {
      if (!formData.siret) newErrors.siret = 'Numéro de SIRET requis';
      if (!siretConfirmed) newErrors.siret = 'Veuillez confirmer le SIRET';
      if (!formData.companyName) newErrors.companyName = 'Nom de l\'entreprise requis';
      if (!formData.companyAddress) newErrors.companyAddress = 'Adresse de l\'entreprise requise';
    }
    if (!formData.acceptedTerms) newErrors.acceptedTerms = 'Vous devez accepter les CGU';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const paymentConfirmed = await simulatePaymentConfirmation();
        if (paymentConfirmed) {
          console.log(formData);
          alert('Inscription réussie ! Un email de validation a été envoyé à ' + formData.email);
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
            description: '',
            acceptedTerms: false,
            companyName: '',
            companyAddress: '',
            companyStreet: '',
            companyAddress2: '',
            companyZip: '',
            companyCity: '',
          });
          setSiretConfirmed(false);
          setCompanyInfo(null);
        } else {
          alert('Le paiement n\'a pas pu être confirmé. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleConfirmSiret = async () => {
    if (formData.siret) {
      try {
        const response = await simulateSiretVerification(formData.siret);
        setCompanyInfo(response);
        setSiretConfirmed(true);
        toggleCompanyInfo();
      } catch (error) {
        console.error('Erreur lors de la vérification du SIRET:', error);
        setErrors({ ...errors, siret: 'SIRET invalide ou non trouvé' });
      }
    }
  };

  const handleClearSiret = () => {
    setFormData({ ...formData, siret: '' });
    setSiretConfirmed(false);
    setCompanyInfo(null);
    toggleCompanyInfo();
  };

  const simulateSiretVerification = async (siret) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (siret === '92041432300013') {
      return {
        name: 'TRIBUCLOUD',
        streetNumber: '8',
        street: 'RUE HUSSENET',
        complement: 'N/A',
        zipCode: '93110',
        city: 'ROSNY-SOUS-BOIS'
      };
    }
    throw new Error('SIRET invalide');
  };

  const simulatePaymentConfirmation = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random() > 0.2;
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

        {showAddressFields && (
          <>
            <div>
              <label>Numéro et voie :</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
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
              />
            </div>
            <div>
              <label>Ville :</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
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
                disabled={siretConfirmed}
                required
              />
              <button type="button" onClick={handleConfirmSiret} disabled={siretConfirmed}>
                Confirmer le SIRET
              </button>
              {siretConfirmed && (
                <button type="button" onClick={handleClearSiret}>
                  Supprimer
                </button>
              )}
              {errors.siret && <span className="error">{errors.siret}</span>}
            </div>
            {showCompanyInfo && companyInfo && (
              <div>
                <h3>Informations de l'entreprise :</h3>
                <p>Nom de la société ou de l'entreprise : {companyInfo.name}</p>
                <p>Numéro de rue : {companyInfo.streetNumber}</p>
                <p>Rue : {companyInfo.street}</p>
                <p>Complément d'adresse : {companyInfo.complement}</p>
                <p>Code postal : {companyInfo.zipCode}</p>
                <p>Ville : {companyInfo.city}</p>
              </div>
            )}
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