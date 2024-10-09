import React, { useState } from 'react';
import './Login.css'; // Assurez-vous que ce fichier existe pour styliser la page

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // État pour gérer le message de retour
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); 

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion. Veuillez vérifier vos informations.');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token); // Stocker le jeton dans le localStorage
        setMessage('Connexion réussie !');
        // Redirection vers une autre page si nécessaire, par exemple :
        // window.location.href = "/profile";
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {message && <p className="message">{message}</p>} {/* Affiche un message de retour */}
    </div>
  );
};

export default Login;
