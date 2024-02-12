### Prerequisite

- [NodeJS](https://nodejs.org/en/)

- NPM



### How to run

Change directory to ```revo```

```shell
cd ./revo
```


Install dependencies

```shell
npm install
```

Fill all environments in dotenv

```
PRIVATE_KEY="" (private keys) 
INERY_ACCOUNT="" (your inery account name)
INERY_ACC2 ="" (target inery account that you want to send a token)
TOKEN ="" (Fill amount & symbol of the token you want to make it, ex. 1000.0000 EXMP )
```


Run script create token & issue token

```
npm run create-token
```

Run script send token to other account
```
npm run send-token
```