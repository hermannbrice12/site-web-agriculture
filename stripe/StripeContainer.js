import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51PzjCXGMpjXVa18SP4gtFjDW4Fp7dYBVsrsrWR4WTw3UwGPW0j0TEnOrBanfrqW8CcFjH3c2L5zYRQtQkORqPnXW00C3BTM6tr");

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;