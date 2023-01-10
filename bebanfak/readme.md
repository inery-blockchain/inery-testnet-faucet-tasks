## Pra Install

- Note :
If it already exists, you can ignore the installation

### Instal curl
```shell
sudo apt-get install curl
```

### Install NodeJS & NPM

- Linux [NodeJS](https://nodejs.org/en/) <- you can check NodeJS version

this is NodeJS version 19
```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

- NPM
```shell
apt install npm
```
_______________________________________

## Usage

Change directory to directory `bebanfak`

```shell
cd ~/inery-testnet-faucet-tasks/bebanfak
```

Create `.env` and edit the variable

PRIVATE_KEY=YOUR PRIVATE KEY

INERY_ACCOUNT=YOUR INERY ACCOUNT

NODE_URL=http://YourIP:8888/

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run task4inery
```
🚀GOOD LUCK🚀

























































