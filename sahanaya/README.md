# Sahanaya-RPC-Push-Transaction-Inery

Here's the instruction on how to create an RPC Push Transaction on a blockchain using the provided JavaScript code that runs on the terminal of an Ubuntu 20 VPS SSH:

- Make sure you have installed Node.js and package managers such as npm or yarn on your Ubuntu 20 VPS SSH.

- Install the required dependencies to run the JavaScript program above. Run the following command on the terminal:
```
git clone https://github.com/inery-blockchain/ineryjs
```
```
cd yourpcproject
```
```
npm install ineryjs dotenv
```
- Create a JavaScript file named rpc.js and copy the above JavaScript program into the file.

The contents of the `rpc.js` file is a JavaScript program that utilizes `the Ineryjs` and `dotenv` libraries. The program defines several functions, including `createData()`, `readData()`, `updateData()`, and `deleteData()`, which perform CRUD (Create, Read, Update, Delete) operations on a smart contract on the blockchain.

The program uses environment variables such as `NODE_URL`, `PRIV_KEY`, and `ACCOUNT`, which are taken from the `.env` file. These environment variables are used to connect the program to the blockchain network and the user account that will be used to execute transactions.

Here is the contents of the previously provided `rpc.js` file:
```
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const rpc = new JsonRpc(process.env.NODE_URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY])
const api = new Api({ rpc, signatureProvider })
const account = process.env.ACCOUNT
const id = 1000
const data = "INERY JSON-RPC CRUD push transaction"

await api.getAbi(account, true)

async function createData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).create(id, account, data)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

async function readData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).read(id)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

async function updateData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).update(id, data)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

async function deleteData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).destroy(id)]
    })
    console.log(result.processed.action_traces[0].act.name)
    console.log(result.processed.action_traces[0].console)
    console.log(result.processed.action_traces[0])
  } catch (error) {
    console.error(error)
  }
}

createData()
readData()
updateData()
deleteData()
```
This program uses `the await` function because it takes time to send transactions to the blockchain network and receive responses from the blockchain. Therefore, this program uses async/await to handle asynchronous transaction operations.

- Set environment variables like NODE_URL, PRIV_KEY, and ACCOUNT in the .env file on the Ubuntu 20 VPS SSH.

- Run the rpc.js file on the Ubuntu 20 VPS SSH terminal using the following command:
```
node rpc.js
```
