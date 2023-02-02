## CRUD Operations on the EOS Blockchain using Inery.js

This code demonstrates how to perform create, read, update, and delete (CRUD) operations on the EOS blockchain using the Inery.js library. The code uses environment variables to store sensitive information, such as the private key of the account used to sign transactions, the URL of the JSON RPC endpoint, and the name of the account used to sign the transactions.

## Requirements

* Node.js version 10 or higher
* npm

## Getting Started

1 - Clone this repository

2 - Run  in the terminal to install the required dependencies
```
npm install
```
3 - Create a  file in the root of the project and set the following environment variables
```
.env
```
* PRIVATE_KEY: the private key of the account used to sign the transactions
* URL: the URL of the JSON RPC endpoint
* INERY_ACCOUNT: the name of the account used to sign the transactions

4 - Run  to execute the code
```
node index.js
```

## Libraries Used

* Inery.js: A JavaScript library for interacting with the EOS blockchain
* dotenv: A zero-dependency module that loads environment variables from a .env file

## Conclusion

This code provides a basic example of how to use the Inery.js library to perform CRUD operations on the EOS blockchain.
