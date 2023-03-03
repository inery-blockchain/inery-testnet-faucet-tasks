Here's a general guide on how to use JavaScript to build RPC Push Transaction on Inery Blockchain:

1. Install Ineryjs on your device and ensure that ```Node.js``` is installed.

2. Create a directory by name, using your inery account name. and navigate to the directory in the terminal using the `cd` command.

3. Initialize your project by using the `npm init` command. This will create a `package.json` file in your project directory.

4. Install the Ineryjs and required Node.js modules to build your project by using the `npm install` command in the terminal.

5. Create a JavaScript file to create a RPC that will be used to interact with Inery Blockchain. This file can be saved as `index-rpc.mjs`.

6. Add the following code to the `index-rpc.mjs` file:
- For recommendations, you can see more on : https://docs.inery.io/api/
- However, I can give an example of something like this:
```
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const url="<node-url>";
const rpc = new JsonRpc(url);
const api = new Api({ rpc, signatureProvider });

// sample code to send a transaction
rpc.inery.sendTransaction({
  from: '<sender-address>',
  to: '<recipient-address>',
  value: '<token-amount>',
  gasPrice: '<gas-fee>',
  gas: '<gas-limit>'
}, function(error, hash) {
  if (!error) {
    console.log(hash);
  } else {
    console.error(error);
  }
});
```

7. Run the `index-rpc.mjs`file by using command :
 ```
 node index-rpc.mjs
 ```
8. Test and deploy your RPC on Inery Blockchain using the testing and deployment tools provided by the Inery Blockchain.
<br/>
It's important to remember that this is a general guide and you should tailor the code to your specific needs. Always make sure to seek accurate and comprehensive information before starting to develop RPC using JavaScript on Inery Blockchain.
