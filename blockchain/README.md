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
cd $HOME
git clone https://github.com/Kalomang88/inery-testnet-faucet-tasks -b task4
```
###
### Configuring env vars in
- `PRIV_KEY=YOUR PRIVATE KEY`

- `ACCOUNT=YOUR INERY ACCOUNT`

- `SYMBOL=YOUR TOKEN SYMBOL`
```
cd inery-testnet-faucet-tasks/blockchain
nano .env
```

### Install module dependencies

```
npm install -g npm
npm install
```

## Run the script

```
npm run create-token
```
