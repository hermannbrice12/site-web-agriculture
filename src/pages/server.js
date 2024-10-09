const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const mockUsers = [
  { id: 1, username: 'agriculteur1', password: 'password123' },
  { id: 2, username: 'particulier1', password: 'mypassword' },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ token: 'fake-jwt-token', userId: user.id });
  } else {
    res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
