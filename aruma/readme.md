## How to run
- Run npm install
   ```shell
   npm install
   ```

- Copy .env.example and set environment
   ```shell
   cp .env-sample .env
   ```

 
- set your information

   ```shell
   nano .env
   ```


- Command to run TOKEN
   ```shell
   cd RPC_Token
   ```
  **For Create token**
  > `npm run rpc_token_create`

  **For Issue token**
  > `npm run rpc_token_issue`

  **For Transfer token**
  > `npm run rpc_token_transfer`

  **For Retire token**
  > `npm run rpc_token_retire`


- Command to run CONTRACT
   ```shell
   cd RPC_Contract
   ```
  **For Create data**
  > `npm run rpc_contract_create`

  **For delete data**
  > `npm run rpc_contract_delete`

  **For update data**
  > `npm run rpc_contract_update`

  **For read data**
  > `npm run rpc_contract_read`


## Basic Usage


### JsonRpc

Open a connection to JsonRpc.
```js
const url="https://www.myurl.com";
const rpc = new JsonRpc(url);
```

### API

You may exclude these when running in a browser since most modern browsers now natively support these. If your browser does not support these (https://caniuse.com/#feat=textencoder), then you can import them as a dependency through the following deprecated npm package: https://www.npmjs.com/package/text-encoding
```js
const api = new Api({ rpc, signatureProvider });
```
