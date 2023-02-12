### Requirement

- NodeJS
- NPM



### step-by-step guide to run the script:

Change directory to ```blackswan```

```
cd blackswan
```

Create a .env file in the same directory as the script. This file should contain the following environment variables:
PRIVATE_KEY=YOUR PRIVATE KEY 
INERY_ACCOUNT=YOUR INERY ACCOUNT


```
nano .env
```

Install dependencies

```
npm install
```

Run script

```
 node ./rpc-transaction.mjs
```

NOTES:
Follow the math captcha prompt to prove you're not a robot. If you pass the math captcha, the transaction will be executed. The details of the transaction, including the response from the contract, will be logged to the console.
