## RPC API Inery Task 4

### Instal curl - Run command
```
sudo apt-get install curl
```

### Install NodeJS & NPM

- OS [Windows](https://nodejs.org/en/download/)
- OS Linux:
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```



## Running Command for Inery Task  4

**1. First change directory to `nanangw`**

```shell
cd ./nanangw
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
npm run Create-Transaction
```
```
npm run Read-Transaction
```
```
npm run Update-Transaction
```
```
npm run Destroy-Transaction
```


**5. Run script for transaction**

```
npm run push
```