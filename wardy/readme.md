### Prerequisite

- [NodeJS](https://nodejs.org/en/)

- npm install

### INERY TOKEN

Change directory to `wardy`

```shell
cd ./wardy
```

Copy & paste .env-example , Edit .env file with your information , and then rename .env-example to .env 

PRIVATE_KEY="INERY_PKEY" // your inery private key

ACCOUNT_ADDRESS="INERY_ACC" // your inery account

NODE_URL="IP:8888" // your IP addres

Install dependencies

```shell
npm install
```

## Run script ##

* Run create

```
node create_token.mjs
```

* Run issue

```
node issue_token.mjs
```

* Run retire

```
node retire_token.mjs
```

* Run transfer

```
node transfer_token.mjs
```
