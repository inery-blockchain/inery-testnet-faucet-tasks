## Prerequisites

- Node.js: This script uses the `eosjs` library, which requires Node.js. You can download the latest version of Node.js from the official website (https://nodejs.org/).
- EOS node: This script interacts with an EOS node through its HTTP API. You will need to have an EOS node running and its HTTP API endpoint URL available.

## Setting up the environment

1. Clone the repository or download the script.
2. Create a file named `.env` in the same directory as the script.
3. In the `.env` file, define the following environment variables:
   - `NODE_URL`: The URL of the HTTP API endpoint of your EOS node.
   - `PRIVATE_KEY`: The private key of the account that will sign and broadcast the transaction.
   - `INERY_ACCOUNT`: Your Inery account name.
   - `TOKEN`: The token you created in your Inery account.
4. Install the dependencies by running `npm install` in the terminal.

## Running the script

1. Open a terminal and navigate to the directory where the script is located.
2. Run the script with the following command: `node ./inerynoderpc.mjs` or `npm run MC-RPC`

## Expected output

If the script runs successfully, you should see the signed transaction object and the console output of the `transfer` action of the `inery.token` contract, depending on the script. If an error occurs, the error message will be printed to the console.