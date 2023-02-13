## Instal NodeJS
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```


### Change directory zaraki

```
cd zaraki
```

### Install NPM
```
npm install
```

### Edit .env file
```shell
nano .env
```

Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY
INERY_ACCOUNT=YOUR INERY ACCOUNT

### Running Build-web
```
cd ~/ineryjs
npm run build-web
```

### Running the script

Run the script with the following command: `node ineryCreate.mjs` or `node ineryTransaction.mjs`

```
npm run solution
```
