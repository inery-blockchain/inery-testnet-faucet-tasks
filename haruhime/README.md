To run this scripts, you will need to have node.js installed on your computer. You can download the latest version of node.js from the official website: https://nodejs.org/.

You will also need to install the required dependencies for these scripts. To do this, navigate to the root directory of the project in your terminal and run the following command:


`npm install`
This will install the dependencies specified in the package.json file.

You will also need to create a .env file in the root directory of the project. This file should contain the following environment variables:


`NODE_URL=<URL of your Inery node>`
`PRIVATE_KEY=<your private key>`
`INERY_ACCOUNT=<your Inery account name>`
`TOKEN_TRANSFER=<number of tokens to transfer>`
Replace the placeholders in angle brackets with the appropriate values for your setup.

Once you have set up your environment and installed the dependencies, you can run the scripts by using the following command:


`npm run CreateNewData`
This will run the script specified as the "main" in the package.json file, which is "./CreateNewData.mjs" in this case.

The first script provided is used to create new data in a smart contract on the Inery blockchain. It does this by calling the "create" function on the smart contract with the provided parameters. The script imports the necessary modules, sets up the API and signature provider, and then defines an async function called "create" that takes three parameters: id, user, and data. This function creates a new transaction and signs it, calling the "create" function on the smart contract with the provided parameters. The transaction is then broadcast to the network and the result is logged to the console.

The second script provided is used to transfer tokens on the Inery blockchain. It does this by calling the "transfer" function on the smart contract with the provided parameters. The script follows a similar structure to the first script, with the exception of calling the "transfer" function instead of the "create" function and providing different parameters.

The third script provided is used to read data from a smart contract on the Inery blockchain. It does this by calling the "dbread" function on the smart contract with the provided id parameter. The script follows a similar structure to the first two scripts, with the exception of calling the "dbread" function instead and providing a single id parameter.

The fourth script provided is used to update data in a smart contract on the Inery blockchain. It does this by calling the "dbupdate" function on the smart contract with the provided parameters. The script follows a similar structure to the first three scripts, with the exception of calling the "dbupdate" function instead and providing different parameters.

In summary, these scripts demonstrate how to interact with the Inery blockchain using the IneryJS library.