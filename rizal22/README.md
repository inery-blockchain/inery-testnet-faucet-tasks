# [LiveDemo]()

 ### Install dependencies

```
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
```

### Clone
```
git clone https://github.com/risodss/inery-testnet-faucet-tasks -b task5
```
```
cd inery-testnet-faucet-tasks/rizal22
```

```
nano .env
```
###
### Configuring env vars in
- `NODE_URL="NODE_URL"`
- `ACCOUNT="YOUR_INERY_ACCOUNT_NAME"`
- `PRIV_KEY="PRIVATE_KEY_OF_INERY_ACCOUNT_NAME"`
- `PORT="5173"`

Allow port 5173

```
ufw allow 5173
```

### Install module dependencies

```
npm install
```

## Run the server
```
npm start
```
Done dapp runing in your konsol
