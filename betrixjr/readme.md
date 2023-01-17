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
INERY_ACCOUNT="INERY_ACCOUNT" //Fill your inery accountname
NODE_URL="IP:8888" //Fill your inery node ip
ID_DATA="50" //Fill Your ID DATA

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script


Run Create Token

```
npm run rpc_cre
```

Run Destroy

```
npm run rpc-des
```

Run Transfer Token

```
npm run rpc-tf
```

Run Read

```
npm run rpc-read
```

Run Update

```
npm run rpc-up
```
