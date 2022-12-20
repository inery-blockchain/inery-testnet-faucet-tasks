# Inery Task 4 : Json RPC Sample
A Sample code to call JSON RPC on Inery Blockchain

## Persiapan
##### Remove Previous Nodejs
```
sudo apt-get remove nodejs
```

##### Install Curl

```
sudo apt-get install curl
```

##### Install NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

##### Install npm
```
sudo apt install npm
```
_____________________

## Installation

1. Clone the repo

   ```
   git clone https://github.com/amustofalia/inery-testnet-faucet-tasks.git
   ```

2. Change directory to cloned repo

   ```
   cd inery-testnet-faucet-tasks/amustofa
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

   ```
   nano .env
   ```


## Usage

Run RPC Example

```
npm run rpc-example
```

#### Successful Example
<p align="center">
  <img src="https://github.com/SaujanaOK/Images/blob/main/berhasil.png">
</p>


# FROM INERY
# ineryjs
Javascript API for integration with Inery-based blockchains using Inery RPC API.  
Documentation can be found in docs folder.  

## Import

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
