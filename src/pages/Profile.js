// src/pages/Profile.js
import React, { useState } from 'react';
import './Profile.css'; // Assurez-vous que ce fichier CSS existe et est bien stylisé

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '1234 Main St'
  });
  
  // Suppression de setTransactions car il n'est pas utilisé
  const transactions = [
    { id: 1, date: '2024-01-01', amount: '25.00', status: 'Completed' },
    { id: 2, date: '2024-01-15', amount: '30.00', status: 'Pending' }
  ];

  const [addresses, setAddresses] = useState([
    { id: 1, address: '1234 Main St', city: 'Springfield', postalCode: '12345' }
  ]);

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    const newAddress = { id: addresses.length + 1, address: '', city: '', postalCode: '' };
    setAddresses([...addresses, newAddress]);
  };

  const handleAddressChange = (index, e) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, [e.target.name]: e.target.value } : address
    );
    setAddresses(updatedAddresses);
  };

  const handleDeleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div className="profile-container">
      <h1>Profil Utilisateur</h1>

      {/* Informations de Profil */}
      <section className="profile-info">
        <h2>Informations de Profil</h2>
        <form>
          <div>
            <label>Nom :</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleUserInfoChange}
            />
          </div>
          <div>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
            />
          </div>
          <div>
            <label>Adresse :</label>
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleUserInfoChange}
            />
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
      </section>

      {/* Historique des Transactions */}
      <section className="transaction-history">
        <h2>Historique des Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Gestion des Adresses de Livraison */}
      <section className="address-management">
        <h2>Gestion des Adresses de Livraison</h2>
        {addresses.map((address, index) => (
          <div key={address.id} className="address-item">
            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={address.address}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={address.city}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Code Postal"
              value={address.postalCode}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <button type="button" onClick={() => handleDeleteAddress(index)}>Supprimer</button>
          </div>
        ))}
        <button type="button" onClick={handleAddAddress}>Ajouter une Adresse</button>
      </section>
    </div>
  );
};

export default Profile;
