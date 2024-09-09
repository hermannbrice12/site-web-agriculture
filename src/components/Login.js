import React, { useState, useEffect } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Vérifier s'il y a des données en cache au chargement du composant
    const cachedData = localStorage.getItem('loginData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setFormData(parsedData);
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouteriez la logique pour envoyer les données au backend
    console.log('Données de connexion:', formData);

    // Si "Se souvenir de moi" est coché, sauvegarder les données dans le localStorage
    if (rememberMe) {
      localStorage.setItem('loginData', JSON.stringify(formData));
    } else {
      // Si non coché, supprimer les données du localStorage
      localStorage.removeItem('loginData');
    }
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
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Se souvenir de moi
          </label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;