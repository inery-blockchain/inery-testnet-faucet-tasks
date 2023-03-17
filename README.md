# Prerequisites

To run these scripts, you'll need to have Node.js installed on your machine. You can download the latest version of Node.js from the official website: https://nodejs.org/.
```
sudo apt update
sudo apt install nodejs
```
you can check if the installation were succesfull using command:
```
node -v
```

You'll also need to install the dependencies required for these scripts. To do this, open a terminal and navigate to the root directory of the project, then run the following command:
```
npm install
```
This will install the dependencies specified in the package.json file.

You'll also need to create a .env file in the root directory of the project. This file should contain the following environment variables:
```
NODE_URL=<your_inery_node_address:port>
PRIVATE_KEY=<your_private_key>
INERY_ACCOUNT=<your_inery_account_name>
```
Replace the placeholders in angle brackets with the appropriate values for your setup.


## Installation

To get started, clone the repository by running the following command in your terminal:

```
git clone https://github.com/pramonoutomo/IneryCRUD.git
```

This will create a copy of the project files in a new directory named IneryCRUD.

## Usage Test
To use the scripts, navigate to the root directory of the project in your terminal by running the following command:

```
cd ~/IneryCRUD
```

### Add New Data
To create new data on the Inery blockchain, run the following command:
```
npm run Data_Add
```
### Read Data
To read data on the Inery blockchain, run the following command:
```
npm run Data_Read
```
### Update Data
To update data on the Inery blockchain, run the following command:
```
npm run Data_Update
```
### Delete Data
To delete data on the Inery blockchain, run the following command:
```
npm run Data_Read
```
### Create New Tokens
To create new token on the Inery blockchain, run the following command:
```
npm run Token_Create
```
### Transfer Tokens
To read data on the Inery blockchain, run the following command:
```
npm run Token_Transfers
```

===========================================

For more documentation you can go to my official documentation site on https://docs.codeblocklabs.com

join my telegram web3 community on https://t.me/codeblocklabs
