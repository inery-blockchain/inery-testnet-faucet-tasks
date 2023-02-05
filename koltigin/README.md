# Record Management using EOSIO blockchain
This code provides a basic implementation of creating and retrieving records in an EOSIO blockchain network using Inery.js library.

## Requirements
* Node.js
* Inery.js
## Functions
## createRecord
This function creates a new record in the blockchain network.

## Arguments
* recordId: unique identifier for the record
* userAccount: the account that is creating the record
* data: the data to be stored in the record

## retrieveRecord
This function retrieves a record from the blockchain network.

## Arguments
* recordId: unique identifier for the record

## pushRecord
* This function creates a new record and then retrieves it.

## Arguments
* recordId: unique identifier for the record
* userAccount: the account that is creating the record
* data: the data to be stored in the record

## Usage
Install the required packages using npm install.
Provide the userAccount constant with a valid EOSIO account.
Call the pushRecord function with the desired recordId, userAccount, and data arguments.

## Logging
The transaction hashes for creating and retrieving records are logged in the console. Any errors encountered during the process are also logged in the console.
