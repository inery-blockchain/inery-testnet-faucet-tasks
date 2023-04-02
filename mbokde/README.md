### Demo app
 
 https://cb97-125-164-234-87.ap.ngrok.io/

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
git clone https://github.com/mbokde/inery-testnet-faucet-tasks -b task5
```

```
cd inery-testnet-faucet-tasks/mbokde
```
###  Copy `.env-sample` and rename it to `.env`

```
cp .env-sample .env
```

### Install module dependencies

```
npm install
```

## Run the server
```
node npm start
```
