import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouteriez la logique pour envoyer les données au backend
    console.log('Données de connexion:', formData);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;