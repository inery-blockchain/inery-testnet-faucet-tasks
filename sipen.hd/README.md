## Prerequisite

- [NodeJS](https://nodejs.org/en/)

- NPM


### Install curl
```console 
sudo apt-get install curl
```

### Install NodeJS
```console
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### Install NPM
```console
sudo apt install npm
```


### `HOW TO RUN ?`

**Change Directory To Your Account**

```console
cd ~/inery-testnet-faucet-tasks/sipen.hd
```


**Install Dependencies**

```console
npm install
``` 

**Edit `.env` file** ( *input your data* )
```console
cp .env-sample .env
```


**Run the script**

```console
npm run ordertx
```

#### `WELL DONE` :) ####
