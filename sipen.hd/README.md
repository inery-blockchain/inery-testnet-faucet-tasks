== Prerequisite ==

- [NodeJS](https://nodejs.org/en/)

- NPM


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
```console
sh
sudo apt install npm
```


## RUN

== **Change Directory To Your Account** 

```console
sh
cd ~/inery-testnet-faucet-tasks/sipen.hd
```


== **Install Dependencies**

```console
sh
npm install
```

== ** Edit `.env` file**
```console
cp .env-sample .env
```


== **Run the script

```console
sh
npm run ordertx
```

##### AND DONE :) #####
