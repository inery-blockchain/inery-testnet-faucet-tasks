# EOSIO API Wrapper

This script is a simple wrapper for the EOSIO API using the `ineryjs` library. It allows for the creation and destruction of transactions on the EOSIO blockchain. 

## Dependencies

- `dotenv` for loading environment variables

- `ineryjs` for interacting with the EOSIO API

## Usage

The script exports two functions:

- `CreateTransaction(id, user, data)`: creates a new transaction on the blockchain with the given `id`, `user`, and `data`

- `DestroyTrancsaction(id)`: destroys the transaction with the given `id`

It also exports a `PushTransaction(DataId, user, data)` function that calls CreateTransaction and DestroyTrancsaction sequentially.

## Environment Variables

- `PRIVATE_KEY`: the private key used to sign the transactions

- `url` is the endpoint of the EOSIO API

## Example

This will create a transaction with id 1020, user `account` and data "test push transaction by yayang12" and then destroy it.

This will create a transaction with id 1020, user `account` and data "test push transaction by yayang12" and then destroy it.

This `README.md` file provides a brief overview of what the code does, the dependencies it requires and how to use it. It also notes that the script is a simple example and not intended for production use without further modification and testing.

It also describes the environment variables that should be set before using the script, in this case the private key and the endpoint of the EOSIO API.

