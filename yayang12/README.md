# EOSIO Smart Contract Script

This script is written in JavaScript and utilizes the inery.js library to interact with the EOSIO blockchain. It includes two main functions: `CreateTransaction` and `DestroyTransaction`. 

## CreateTransaction

The `CreateTransaction` function allows the user to create a new transaction on the EOSIO blockchain with a given ID, user, and data. The transaction is broadcasted and signed with the provided private key.

## DestroyTransaction

The `DestroyTransaction` function allows the user to destroy a previously created transaction on the EOSIO blockchain by its ID. The transaction is broadcasted and signed with the provided private key.

## PushTransaction

The `PushTransaction` function allows the user to create and then destroy a transaction on the EOSIO blockchain in one step. It takes in three parameters - DataId, user, and data.

## Prerequisites

- Node.js and npm should be installed

- EOSIO Private key

- EOSIO Account name

- URL to the EOSIO endpoint

## Usage

1. Clone the repository to your local machine

2. Run `npm install` to install the required dependencies

3. Create a .env file and add your EOSIO private key as `PRIVATE_KEY`

4. Update the URL and account name in the script

5. Run the script with `node script.js`





































