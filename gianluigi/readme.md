## Setup 

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

Change directory to ```gianluigi```

```shell
cd ~/inery-testnet-faucet-tasks/gianluigi
```

Copy .env-sample and rename it to .env

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run solution
```
