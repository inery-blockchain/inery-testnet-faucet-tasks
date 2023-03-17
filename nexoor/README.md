## This is a Node.js program that demonstrates how to interact with a blockchain using the INERY API JSON-RPC library. The program prompts the user for a data ID and then executes create, read, update, and destroy transactions for that data ID on the blockchain.

## Getting Started
To run this program, you will need to have Node.js and npm installed on your computer. You will also need to obtain values for the `ACCOUNT` , `NODE_URL` , and `PRIV_KEY` environment variables and add them to a `.env`  file in the project's root directory.

To install the program's dependencies, run the following command in the project directory:
```
npm install
```
Once the dependencies are installed, you can run the program with the following command:

```
npm start
```
The program will prompt you for a data ID (which must be a number greater than 0) and then execute create, read, update, and destroy transactions for that data ID on the blockchain.

## Dependencies
This program depends on the following Node.js packages:

* ineryjs: A library for interacting with the INERY blockchain
* dotenv: A library for loading environment variables from a .env file
* readline: A library for reading input from the command line interface
## License
This project is licensed under the MIT License. See the LICENSE file for details
