Always first step

```shell
apt update && apt upgrade -y
```


### Prerequisite for VPS

- [NodeJS](https://nodejs.org/en/)

- NPM


### How to run

Change directory to ```padang.12```

```shell
cd ./padang.12
```

Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY from your INERY_ACCOUNT
INERY_ACCOUNT=Username of YOUR INERY ACCOUNT

You can find YOUR PRIVATE KEY & YOUR INERY ACCOUNT from log in go to Inery website [https://testnet.inery.io/]

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run explication
```
