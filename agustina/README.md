# Test Live Demo
https://agustina.vercel.app/

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
git clone https://github.com/KomengNode/inery-testnet-faucet-tasks -b task5
```
###
### Configuring env vars in
- `NODE_URL="NODE_URL"`
- `ACCOUNT="YOUR_INERY_ACCOUNT_NAME"`
- `PRIV_KEY="PRIVATE_KEY_OF_INERY_ACCOUNT_NAME"`
- `PORT"` # default 3000

```
cd inery-testnet-faucet-tasks/komeng
```
```
nano .env
```

### Install module dependencies

```
npm install -g npm
npm install
```

## Run the server
```
node index.js
```