
## Prerequisites

Make sure you have `curl` and `NodeJS` with `NPM` installed on your system.

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

**1. Clone the repository and change directory to the project folder**

```shell
git clone https://github.com/inery-blockchain/inery-testnet-faucet-tasks.git
cd inery-testnet-faucet-tasks/task4/your-account-name
```


**2. Install all project dependencies using NPM**

```shell
npm install
```

**3. Create and edit the .env file by duplicating the .env-sample file**
```
cp .env-sample .env
```


**4. Run the script to call the blockchain API and perform push_transaction**

```
npm run solution
```
