# Inery CRUD
A blockchain-based CRUD (Write, Read, Update, Delete) application. This application demonstrates how to interact with Inery blockchain using its API.

## Requirements
1. Node.js
2. Inery's Wallet and eosio.cdt installed.
3. Inery network connection and account credentials
4. A code editor of your choice (VSCode is recommended)
# Installation
## Clone the project
```
git clone https://github.com/0xAlvi/inery-testnet-faucet-tasks.git
```
#Go to the project directory and install the dependencies
```
npm install
```
## Create .env file with the following environment variables.
```
PRIVATE_KEY=<Your private key>
PUBLIC_KEY=<Your public key>
NETWORK_PROTOCOL=<http or https>
NETWORK_HOST=<host>
NETWORK_PORT=<port>
```
## Start the application
```
npm start
```
## Open the application in the browser.
```
http://localhost:3000
```
## Usage
Once the application is running, open http://localhost:3000 in your browser to access the CRUD interface.

You can interact with the contract by clicking on the write, read, update, and delete buttons.

For write operation, you have to specify the ID, Data, and user(you can use any name).

For read operation, you have to specify the ID.

For update operation, you have to specify the ID and Data.

For delete operation, you have to specify the ID.

The blockchain log will be displayed after the transaction is completed.
