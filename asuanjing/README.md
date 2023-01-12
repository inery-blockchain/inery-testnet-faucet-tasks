## Prerequisite

Minimum VPS:
*Memory: 8 GB RAM
*CPU: 4 Core
*Disk: 250 GB SSD Storage

### Instal curl
```
sudo apt-get install curl
```

### NodeJS & NPM
- [Windows](https://nodejs.org/en/download/) Included NPM packages
- [Linux](https://www.linux.org)
- Your Favorite Code Editor

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```



## How to run?

**1. Change directory to `aprameth`**

```shell
cd ./aprameth
```


**2. Install dependencies**

```shell
npm install
```

**3. Create & edit `.env` file**
```
cp .env-sample .env
```


**4. Run the script**

```
npm run solution
```

About [INERY](https://inery.io/)
Inery is layer-1 blockchain designed to offer the solution of decentralized database management with the vision to enable a new paradigm for data. It lays the foundation for web3 by seamlessly connecting with systems, applications, and layer-1 networks.

Thanks for [alteregogi](https://github.com/alteregogi)

