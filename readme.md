### Prerequisite

- [NodeJS](https://nodejs.org/en/)

- npm install



### How to run

Change directory to ```revolt```

```shell
cd ./revolt
```



```shell
nano .env
```

Create .env and edit the variable
PRIVATE_KEY="INERY_PRIVATE_KEY" //Fill your inery private key account
ACCOUNT_ADDRESS="INERY_ACCOUNT" //Fill your inery accountname
NODE_URL="IP:8888" //Fill your inery node ip
TOKEN_ADDRESS="ADRESS" //Fill Your ADDRESS

Install dependencies

```shell
npm install axios ineryjs
```


Run Push

```
node delegatevote.mjs
```