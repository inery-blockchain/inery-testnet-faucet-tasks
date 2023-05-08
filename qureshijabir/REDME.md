# prequesites 


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

**1. Change directory to `rinal`**

```shell
cd ./qureshijabir
```


**2. Install dependencies**

```shell
npm install
```

**3. Create & edit `.env` file**
```
cp .env.example .env
```


**4. Run the script**

```
npm run rinal  or  node rinalSol.mjs
```