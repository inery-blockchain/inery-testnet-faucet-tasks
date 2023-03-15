Here are the steps to create a JSON-RPC push transaction using Inery RPC API from https://github.com/inery-blockchain/ineryjs:

1. Install Node.js on your VPS SSH Ubuntu 20. Node.js can be downloaded and installed using the package manager on the Ubuntu operating system.

2. Clone IneryJS
```
git clone https://github.com/inery-blockchain/ineryjs
```

3. Create your project and install ineryjs on your project
```
mkdir project
cd project
```
```
npm install $HOME/ineryjs dotenv
```
```
npm install ineryjs
```

4. Create a new JavaScript file, for example "transaction.js", and create an instance of IneryJS as follows:
```
const inery = require('ineryjs');
const rpc = new inery.Rpc('http://localhost:8080');
```
5. Create a transaction object and a transaction signature that you will send to the Inery blockchain. You can fill in the transaction and signature values according to your needs
```
const tx = {
  from: 'xxxxxxxx',
  to: 'xxxxxxx',
  value: 1000000000,
  nonce: 0,
  gasPrice: 1000000000,
  gasLimit: 21000
};

const privateKey = 'xxxxxxxxxxxx';
const signature = await inery.signTransaction(tx, privateKey);
```

6. Send the push transaction using the sendRawTransaction method of the IneryJS instance that you created earlier. Here is an example code to send a push transaction:
```
const txHash = await rpc.sendRawTransaction(signature);
console.log(`Transaction hash: ${txHash}`);
```

With the above steps, you can create a JSON-RPC push transaction using the Inery RPC API from https://github.com/inery-blockchain/ineryjs. Make sure to fill in the transaction and signature values according to your needs. Also, make sure that the RPC endpoint used matches the configuration of the Inery node you are running.

7. Run Function
```
node myfunction.js
```



