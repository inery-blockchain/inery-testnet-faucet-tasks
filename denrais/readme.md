### Prerequisite

- [NodeJS](https://nodejs.org/en/)

- NPM



### How to run

Change directory to ```denrais```

```shell
cd ./denrais
```

Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY 
INERY_ACCOUNT=YOUR INERY ACCOUNT


```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```shell
npm run rpc-transaction
```

NOTES:
Follow the math captcha prompt to prove you're not a robot. If you pass the math captcha, the transaction will be executed. The details of the transaction, including the response from the contract, will be logged to the console.
