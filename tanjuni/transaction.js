const inery = require('ineryjs');
const rpc = new inery.Rpc('http://localhost:8080');

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
