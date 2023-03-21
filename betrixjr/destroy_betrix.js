const Inery = require('ineryjs');

const privateKey = "PRIVATE_KEY"; // Fill with your INERY Private Key
const account = "ACCOUNT_NAME"; // Fill with your INERY ACCOUNT NAME

async function destroy() {
    
    const inery = new Inery('http://localhost:8888', { // Fill/change localhost:8888 with your INERY node RPC
      privateKey: privateKey,
      account: account
    });
    try {
        // Kirim destroy
        const response = await inery.destroy();
        console.log(response);
    } catch (error) {
        console.log("Error: ", error);
    }
}

destroy();
