## How to configuration

- install NPM to this folder with the following command
  > `npm install`
- create new file to root folder and rename to .env and set environment
  > `.env`
- set your information

  > `nano .env`

- Check this command
  **Create token**

  > `npm run token_create`

  **Issue token**

  > `npm run token_issue`

  **Transfer token**

  > `npm run token_transfer`

  **Retire token**

  > `npm run token_retire`

- Check this Command to run CONTRACT
  **Create data**

  > `npm run contract_create`

  **delete data**

  > `npm run contract_delete`

  **update data**

  > `npm run contract_update`

  **read data**

  > `npm run contract_read`

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
const url = "https://www.jsonRpcurl.com";
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
    actions: [
      {
        account: "inery.token",
        name: "transfer",
        authorization: [
          {
            actor: "akun1",
            permission: "active",
          },
        ],
        data: {
          from: "akun1",
          to: "akun2",
          quantity: "0.0001 INR",
          memo: "",
        },
      },
    ],
  });
  console.log(result);
})();
```
