# INERY RPC Push Transaction

To create an RPC push transaction, you will need to follow these steps:

### Install Node.js: Run the following commands to install Node.js and npm:
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Clone Ineryjs
```
git clone https://github.com/inery-blockchain/ineryjs
```
```
cd ineryjs
npm install
```
### Create a new directory for your project and navigate into it:
```
mkdir my-project
```
```
cd my-project
npm init -y
```
#### Install the required packages:
```
npm install $HOME/ineryjs dotenv
```
### Create a new file called `index.js` and paste your smart contract code into it.

The `index.js` file is a JavaScript file that imports some dependencies and defines four functions for interacting with the Inery blockchain smart contract. The four functions are:

`createData()`: This function creates a new record in the smart contract by calling the `create()` action on the contract's account using the API object. It takes no arguments and logs the result to the console.

`readData()`: This function reads an existing record from the smart contract by calling the `read()` action on the contract's account using the API object. It takes no arguments and logs the result to the console.

`updateData()`: This function updates an existing record in the smart contract by calling the `update()` action on the contract's account using the API object. It takes no arguments and logs the result to the console.

`deleteData()`: This function deletes an existing record from the smart contract by calling the `destroy()` action on the contract's account using the API object. It takes no arguments and logs the result to the console.

The file also creates some variables to hold the API object, the contract account name, and some other configuration options that are loaded from environment variables using the dotenv library. These variables are used by the four functions to perform the required actions on the smart contract.

This file also imports `dotenv` to load environment variables from the `.env` file and uses those values to establish a connection to the Inery JSON-RPC node using `JsonRpc`, and sign transactions with a private key using `JsSignatureProvider`. All of these functions are used to interact with the smart contract using the `Api` object. The account used is defined in the `ACCOUNT` environment variable.

### Set environment variables: Set the following environment variables in a .env file:
```
NODE_URL=http://localhost:10000
PRIV_KEY=<private-key>
ACCOUNT=<account-name>
```
Replace "<private-key>" with your private key and "<account-name>" with the name of your account.

#### Update the code to use the `rpc.send` function instead of the `console.log` function to push the transaction to the blockchain.
```
async function createData() {
  try {
    const result = await rpc.send({
      actions: [api.with(account).as(account).create(id, account, data)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}
```

### Save the file and run the following command to start the script:
```
node index.js
```
This should execute the four functions `createData()`, `readData()`, `updateData()`, and `deleteData()` and push the transactions to the blockchain using RPC.

Note that you may need to configure your firewall settings to allow incoming and outgoing traffic on the relevant ports to ensure that the RPC requests are successfully sent and received.
