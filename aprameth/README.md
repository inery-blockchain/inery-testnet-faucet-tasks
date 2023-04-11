## Prerequisite

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