import React from "react";
import StripeContainer from './stripe/StripeContainer';

function App() {
  return (
    <div className="App">
      <h1>Paiement avec Stripe</h1>
      <StripeContainer />
    </div>
  );
}

export default App;