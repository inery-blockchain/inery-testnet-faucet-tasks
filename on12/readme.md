# A SOLUTION FOR INERY TASK4   

## Requirements

- [NodeJS](https://nodejs.org/en/)

- NPM

```shell
sudo apt-get install curl 
```

```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&sudo apt-get install -y nodejs
```


### How to run

create a directory with account name

```shell
cd ./on12
```

copy env-sample to env

```shell
cp .env-sample .env
```

change variables in the env file

```shell
nano .env
```

Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY
INERY_ACCOUNT=YOUR INERY ACCOUNT
URL='YOUR IP ADDRESS/8888'


### Install dependencies

```shell
npm install
```

### Run the script

```
node solution.mjs 1 "create and read transaction via JSON RPC"
```


