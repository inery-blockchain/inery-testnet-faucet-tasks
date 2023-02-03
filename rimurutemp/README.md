### Prerequisite

- [NodeJS](https://nodejs.org/en/)
```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
- NPM
```shell
sudo apt install npm
```

### Installation

1. Clone the repo

   ```
   git clone https://github.com/muiljepe/inery-testnet-faucet-tasks.git
   ```

2. Change directory to cloned repo

   ```
   cd inery-testnet-faucet-tasks/rimurutemp
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information


### How To Run

Run Create

```
npm run create
```

Run Create Token

```
npm run createtoken
```

Run Issue Token

```
npm run issue
```

Run Transfer

```
npm run transfer
```




