### Prerequisite

- [NodeJS](https://nodejs.org/en/)
- NPM

### How to run

Change directory to ```rimurutemp```

```shell
cd ./rimurutemp
```

Create .env

```shell
nano .env
```
change ```privatekey``` ```ineryaccount``` and ```http://ip-vps:8888``` with your information

```
PRIVATE_KEY="privatekey"
INERY_ACCOUNT="ineryaccount"
NODE_URL="http://ip-vps:8888"
```

Install dependencies

```shell
npm install
```

### Run Script

Run rpc

```
npm run rpc-rimuru
```


