### Hal-hal yang diperlukan
- Install curl
```shell
sudo apt-get install curl

```

- Install nodejs via curl
```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

- Install NPM
```shell
sudo apt install npm
```

### Clone Repo RPC Push Transaction
```shell
git clone https://github.com/ardinjarsinto/inery_push_transaction.git
```

### Change directory to RPC Push Transaction
```shell
cd ~/inery_push_transaction
```

### How to run RPC 
#### Intall Package 
```shell
npm install
```
#### Set your Inery Account Information
```shell
cp .env-sample .env
```
```shell
nano .env
```

#### RPC Crud Contract
- Change directory
```shell
cd
cd ~/inery_push_transaction/inerycrud
```

- Create contract data via api 
```shell
node run inerycrud_create
```

- Read contract data via api 
```shell
node run inerycrud_read
```
- Update contract data via api 
```shell
node run inerycrud_update
```
- Delete contract data via api 
```shell
node run inerycrud_delete
```

#### RPC Token Transaction
- Change directory
```shell
cd
cd ~/inery_push_transaction/inerytoken
```

- Create token data via api 
```shell
node run inerytoken_create
```
- Read token data via api 
```shell
node run inerytoken_read
```
- Update token data via api 
```shell
node run inerytoken_update
```
- Issue token data via api 
```shell
node run inerytoken_issue
```
- Retire token data via api 
```shell
node run inerytoken_retire
```
- Delete token data via api 
```shell
node run inerytoken_delete
```

________________________
# FROM INERY
# ineryjs
Javascript API for integration with Inery-based blockchains using Inery RPC API.  
Documentation can be found in docs folder.  

### Browser

Run command `npm run build-web`. Then copy folder dist-web in your project folder. Import scripts in your HTML file and use it. See [Module in browser](tutorial-module-in-browser.html) tutorial for more.

### ES Modules

```js
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
```

### CommonJS

```js
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
```

## Basic Usage

### Signature Provider

The Signature Provider holds private keys and is responsible for signing transactions.

**Using the JsSignatureProvider in the browser is not secure and should only be used for development purposes. Use a secure vault outside of the context of the webpage to ensure security when signing transactions in production**

```js
const user1PrivateKey = "5JRchd5OZaHl9DAuVPEMo0gEx5nYiGc0Tn2aB75ef96FjuOiq"; // user1 private key
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);
```

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

### Sending a transaction

`transact()` is used to sign and push transactions onto the blockchain with an optional configuration object parameter. Given no configuration options, transactions are expected to be unpacked with TAPOS fields (`expiration`, `ref_block_num`, `ref_block_prefix`) and will automatically be broadcast onto the chain.

```js
(async () => {
  const result = await api.transact({
    actions: [{
      account: 'inery.token',
      name: 'transfer',
      authorization: [{
        actor: 'user1',
        permission: 'active',
      }],
      data: {
        from: 'user1',
        to: 'user2',
        quantity: '0.0001 INR',
        memo: ''
      }
    }]
  });
  console.log(result);
})();
```
