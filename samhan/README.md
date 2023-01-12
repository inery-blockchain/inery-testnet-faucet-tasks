## Prerequisite

### Instal curl
```
sudo apt-get install curl
```

### NodeJS & NPM
- [Windows](https://nodejs.org/en/download/) Included NPM packages
- Linux:
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### How to run

Change directory samhan
cd ~/inery-testnet-faucet-tasks/samhan

```shell
cd ~/inery-testnet-faucet-tasks/samhan
```

Install dependencies

```shell
npm install
```

Create & edit `.env` file**
```
cp .env-sample .env

Run the script

```
npm run push
```
