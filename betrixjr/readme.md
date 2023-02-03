### Prerequisite

- [NodeJS](https://nodejs.org/en/)

- npm install



### How to run

Change directory to ```betrixjr```

```shell
cd ./betrixjr
```

Create .env and edit the variable
PRIVATE_KEY="INERY_PRIVATE_KEY" //Fill your inery private key account
ACCOUNT_ADDRESS="INERY_ACCOUNT" //Fill your inery accountname
NODE_URL="IP:8888" //Fill your inery node ip
TOKEN_ADDRESS="ADRESS" //Fill Your ADDRESS

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

Run Push

```
node push_betrix.js
```

Run Create Token

```
npm run rpc_cre
```

Run Destroy

```
node destroy_betrix.js
```

Run Create Token

```
node createtoken_betrix.js
```

Run Get Block

```
node getblock_betrix.mjs
```

Run Get Info

```
node getinfo_betrix.mjs
```
