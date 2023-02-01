const Inery = require('ineryjs');

const privateKey = "PRIVATE_KEY"; // Fill with your INERY Private Key
const account = "ACCOUNT_NAME"; // Fill with your INERY ACCOUNT NAME
const name = "NAME_TOKEN"; // Fill Name Token
const symbol = "SYMBOL_TOKEN"; // Fill Symbol Token
const totalSupply = 1000000000;
const decimals = 8;

async function createToken() {
    
    const inery = new Inery('http://localhost:8888', { // Fill/change localhost:8888 with your INERY node RPC
      privateKey: privateKey,
      account: account
    });

    // create transaction
    const transaction = inery.token.create(name, symbol, totalSupply, decimals);

    try {
        // send transaction
        const response = await inery.transaction.sendTransaction(transaction);
        console.log(response);
    } catch (error) {
        console.log("Error: ", error);
    }
}

createToken();
