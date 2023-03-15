# JSON RPC Push Transaction using Solidity

To create an INERY JSON RPC Push Transaction using Solidity in SSH Ubuntu 20, you need to follow these steps:
- Ensure that you have properly installed IneryJS and saved the Solidity contract file on the server.
- Open the SSH terminal and navigate to the directory where the Solidity contract file is saved.
- Run the command `npm init` to create a `package.json` file if it doesn't exist.
- Install the required packages, which are `ineryjs`, `dotenv`, by running the command 
```
npm install --save ineryjs dotenv ineryjs
```
- Create a new JavaScript file with the name `transaction.js.`
- Copy and paste your Solidity contract code into that file.
- Add code to import the required packages and to configure IneryJS:
```
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';
import dotenv from 'dotenv';

dotenv.config();

const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY]);
const rpc = new JsonRpc(process.env.NODE_URL);
const api = new Api({ rpc, signatureProvider });
const account = process.env.ACCOUNT;
const id = 1000;
const data = "INERY JSON-RPC CRUD push transaction";
```
- Make sure to fill in the values of `PRIV_KEY`, `NODE_URL`, and `ACCOUNT` in the `.env` file.

- Add functions to create, read, update, and delete data:
```
async function createData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).create(id, account, data)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

async function readData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).read(id)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

async function updateData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).update(id, data)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}

async function deleteData() {
  try {
    const result = await api.transact({
      actions: [api.with(account).as(account).destroy(id)],
    });

    console.log(result.processed.action_traces[0].act.name);
    console.log(result.processed.action_traces[0].console);
    console.log(result.processed.action_traces[0]);
  } catch (error) {
    console.error(error);
  }
}
```
- Finally, call those functions:
```
createData();
readData();
updateData();
deleteData();
```
- Save the `transaction.js` file and run the command `node transaction.js` in the terminal.
```
node transaction.js
```
- Done





