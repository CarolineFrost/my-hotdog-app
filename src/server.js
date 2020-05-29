const express = require('express');
const stripe = require('stripe')('');
const app = express();
const stripe_publishable_key = '';
const env = require('dotenv').config()
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(require('body-parser').text({type: '*/*'}));

app.get('/create_payment_intent', async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.json({client_secret: intent.client_secret});
})

// updated when stripe listen --forward-to localhost:3001/webhook is executed
const endpointSecret = '';

app.post('/webhook', function(request, response) {
  const sig = request.headers['stripe-signature'];
  const body = request.body;

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    // invalid signature
    response.status(400).end();
    return;
  }

  let intent = null;
  switch (event['type']) {
    case 'payment_intent.succeeded':
      intent = event.data.object;
      console.log("Succeeded:", intent.id);
      fs.appendFile('./payment_success_logs', "\nSucceeded: " + intent.id, function (err) {
        if (err) throw err;
      });
      break;
    case 'payment_intent.payment_failed':
      intent = event.data.object;
      const message = intent.last_payment_error && intent.last_payment_error.message;
      console.log('Failed:', intent.id, message);
      fs.appendFile('./payment_failure_logs', "\nFailed: " + intent.id + " because " + message, function (err) {
        if (err) throw err;
      });
      break;
  }

  response.sendStatus(200);
});




app.listen(3001, () => console.log(`Node server listening on port ${3001}!`));
