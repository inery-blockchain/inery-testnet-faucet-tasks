# Inery Testnet Task 4

## Tutorial RPC API push transaction

Before you can run the code and call the valued contract function, you need to finish Task 3 in your Account.

To check if you have your CRUD Smart Contract on your account.

cline get abi your_inery_account

### 1. Installation

#### Clone the repository

git clone https://github.com/ikhsansw 6/ineryjs.git

#### Change directory to cloned repository

cd ineryjs

#### Install NPM packages

npm install

#### Copy .env-sample and rename it to .env

cp .env-sample .env

#### Edit .env file with your information

nano .env

Example:

INERY_ACCOUNT="ikhsansw" 

PRIVATE_KEY="IGDIDJD"

NODE_URL="http://IPVPSMU:8888/"

### 2. Testing 

Run RPC Example

npm run rpc-example

if the message like this after running, your transaction has been executed on blockchain.

### 3. Fixing

Thanks to: [alteregogi](https://github.com/alteregogi)

#### Error : Serialization time limit 15000us exceeded:

Change max-transaction-time to more than 15000 in your config.ini

nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini

#### Error : connect ECONNREFUSED NODE_IP_ADDRESS:8888

Make sure to open your port setting on your VPS provider dashboard and make sure your VPS port 8888 is open, try to check it on [portchecker.co](https://portchecker.co/)

sudo ufw allow 8888

#### Error: missing create.issuer ( type=name )

You doesn't have Valued Smart Contract on your account, this is on Task 3.






