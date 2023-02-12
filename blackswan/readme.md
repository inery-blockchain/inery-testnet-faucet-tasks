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

You can see a transaction excuted example

<img width="522" alt="Screenshot 2023-02-12 200946" src="https://user-images.githubusercontent.com/82766588/218313029-6032e834-1997-45cf-9e68-467fb37e4e09.png">
