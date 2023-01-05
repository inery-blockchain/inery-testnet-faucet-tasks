### For Run this Code You must install this.

-[NodeJS](https://nodejs.org/en/)
sudo apt-get install curl
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
-NPM
sudo apt install npm

### For running

Change directory to ```arraylast```

```shell
cd ./arraylast
```

Edit example.env to the .env & Rename
PRIVATE_KEY=YOUR PRIVATE KEY
INERY_ACCOUNT=YOUR INERY ACCOUNT

```shell
cp example.env .env
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run arraylast
```
