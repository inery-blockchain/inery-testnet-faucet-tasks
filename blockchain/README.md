# [LiveDemo](http://5.tcp.eu.ngrok.io:19025)

 ### Install dependencies

- [NodeJS](https://nodejs.org/en/)

- NPM

- GIT

```
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
```

### Clone
```
git clone https://github.com/nodebrain/inery-testnet-faucet-tasks -b task5
```
```
cd inery-testnet-faucet-tasks/blockchain
```
###
### Configuring env vars in
- `NODE_URL="NODE_URL"`
- `ACCOUNT="YOUR_INERY_ACCOUNT_NAME"`
- `PRIV_KEY="PRIVATE_KEY_OF_INERY_ACCOUNT_NAME"`
- `PORT=""` # default 3000

```
nano .env
```

### Install module dependencies

```
npm install
```

## Run the server
```
npm start
```
