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
git clone https://github.com/WuasuDoang/inery-testnet-faucet-tasks -b task4
```
###
### Configuring env vars in
- `PRIV_KEY=YOUR PRIVATE KEY`

- `ACCOUNT=YOUR INERY ACCOUNT`
```
cd inery-testnet-faucet-tasks/WuasuDoang
```
```
nano .env
```

### Install module dependencies

```
npm install
```

## Run the script

```
npm run rpc_push
```
