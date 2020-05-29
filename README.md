## About
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Used react js as requested, supplemented with cors and express for easy routing.

## To use:
Add your stripe secret key and public key in the index.js file; I removed mine.

On executing ‘npm start’ from within root directory, client defaults to running on port 3000

On executing ‘node src/server.js’ within root directory, server defaults to running on port 3001

You can check that the client is running by going to ‘http://localhost:3000/’ in your browser; same with trying an endpoint on the server like ‘http://localhost:3001/create_payment_intent’

To test the webhooks: execute ‘stripe listen --forward-to localhost:3001/webhook’ in the terminal and start the server. Execute ‘stripe trigger payment_intent.succeeded’ and ‘stripe trigger payment_intent.payment_failed’ in a new terminal tab, and you should see 200s and console logs. Make sure to update your endpoint secret. I removed mine.

I used the ‘fs’ module for the logging bit, and logged to files named ‘payment_success_logs’  and ‘payment_failure_logs’ at the root. Sent some succeeds and failures to ensure everything was logging correctly -- you can see the output in my project folder. When you execute stripe trigger payment_intent.succeeded’ and ‘stripe trigger payment_intent.payment_failed’ there should be new lines added to those log files.
