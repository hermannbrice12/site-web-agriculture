const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();  // Charger les clés API à partir du fichier .env

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Clé secrète Stripe

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Prend en charge Apple Pay automatiquement
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Nom du produit',
            },
            unit_amount: 2000, // Prix en centimes (20,00€)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Serveur Stripe en écoute sur le port 3001'));
