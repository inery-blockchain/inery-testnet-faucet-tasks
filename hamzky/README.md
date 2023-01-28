## How To Run

## Prerequisite

### Remove / Uninstall Previous Nodejs
```
sudo apt-get remove nodejs
```

### Check If Your Nodejs Uninstalled
```
node -v
```



### Install curl
```
sudo apt-get install curl
```

### Install NodeJS
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### Install NPM
```
sudo apt install npm
```


## RUN

**1. Change Directory To Your Solution Directory**

```
cd ~/inery-testnet-faucet-tasks/hamzky
```


**2. Install Dependencies**

```
npm install
```

**3. Create & Edit The `.env` file**
```
cp .env-sample .env
```


**4. Run the Script We Made Before**

```
npm run hamzkysolution
```

##### AND DONE :) #####
