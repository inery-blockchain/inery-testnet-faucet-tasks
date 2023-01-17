## Prerequisites

- [Node.js](https://nodejs.org/).
- EOS node
- NPM

## Setting environment

1. Clone the repository.
2. Create a file `.env` define the following environment variables in this file:
   - `NODE_URL`: The URL of the HTTP API endpoint of your EOS node.
   - `PRIVATE_KEY`: The private key of the account that will sign and broadcast the transaction.
3. Install the dependencies by running `npm install` .

## Running the script

Run the script with the following command: 
   - `node create.mjs`
   - `node transaction.mjs`