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

```shell
npm install
```

Run script

```shell
 node ./rpc-transaction.mjs
```