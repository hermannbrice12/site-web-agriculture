// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Autoriser les requêtes cross-origin
app.use(bodyParser.json()); // Parser le JSON des requêtes

// Route pour recevoir les données du formulaire de contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Simuler le traitement et renvoyer une réponse
  console.log(`Nom: ${name}, Email: ${email}, Message: ${message}`);
  return res.status(200).json({ message: 'Votre message a été reçu avec succès !' });
});

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
