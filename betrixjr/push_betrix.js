const Inery = require('ineryjs');

const privateKey = "PRIVATE_KEY"; // Fill with your INERY Private Key
const account = "ACCOUNT_NAME"; // Fill with your INERY ACCOUNT NAME
const to = "INERY_ADDRESS_DESTINATION"; // Fill with your address destination target send inery token
const amount = 1000; // Amount token to send
const data = "THIS IS DATA"; // Fill with id data 

async function pushTransaction() {
    
    const inery = new Inery('http://localhost:8888', { // Fill/change localhost:8888 with your INERY node RPC
      privateKey: privateKey,
      account: account
    });

    // create transaction
    const transaction = inery.transaction.createTransaction(to, amount, data);

    try {
        // send transaction
        const response = await inery.transaction.sendTransaction(transaction);
        console.log(response);
    } catch (error) {
        console.log("Error: ", error);
    }
}

pushTransaction();
