### Install dependencies

you must have the following dependencies installed on your system:

- [NodeJS](https://nodejs.org/en/)
- NPM
- GIT

To install these dependencies, you can run the following commands in your terminal:

```
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
```

### Make Bunshin
```
git clone https://github.com/away7000/inery-testnet-faucet-tasks -b task4
```
###
### Configuration env Variable
- `NODE_URL=YOUR NODE`
- `PRIV_KEY=YOUR PRIVATE KEY`
- `ACCOUNT=YOUR INERY ACCOUNT`
- `DATA_ID=YOUR DATA ID` Number only

```
cd inery-testnet-faucet-tasks/away
```
```
nano .env
```

### Installing Module

```
npm install -g npm
npm install
```

## Running the script
```
npm run push-transaction
```
