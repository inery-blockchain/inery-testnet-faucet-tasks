const Inery = require('ineryjs');
const inery = new Inery();

const account = inery.createAccount();
console.log(`New Account: ${account.address}`);

const balance = await inery.getBalance(account.address);
console.log(`Balance: ${balance}`);

const gasPrice = await inery.getGasPrice();
console.log(`Gas Price: ${gasPrice}`);

const nonce = await inery.getTransactionCount(account.address);
console.log(`Nonce: ${nonce}`);

const txParams = {
  nonce,
  gasPrice,
  gasLimit: 21000,
  to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  value: '1000000000000000000'
};

const signedTx = await inery.signTransaction(txParams, account.privateKey);
console.log(`Signed Transaction: ${signedTx.rawTransaction}`);

const receipt = await inery.sendSignedTransaction(signedTx.rawTransaction);
console.log(`Transaction Hash: ${receipt.transactionHash}`);
