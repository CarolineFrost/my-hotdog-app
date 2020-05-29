import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'

//add personal secret key here
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// add personal public key here
const stripePromise = loadStripe("pk_test_dovzyN9e5iKoiEKuPqLDUejl00yKn9HPcp");

function App() {
  return (
    <div>
    <header>
      My Hotdog Stripe App
    </header>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
