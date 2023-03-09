## This is a Node.js project that interacts with a smart contract on the Inery blockchain using the Inery.js library. The project allows you to create and destroy records on the smart contract.

## Installation
Clone this repository: git clone https://github.com/albayche/inery-testnet-faucet-tasks.git
## Install the dependencies:
```
npm install
```
Set the environment variables:
```
export PRIV_KEYS=your_private_key_here
export INERY_NAME=your_account_name_here
```

## Run the project:
 ```
npm start
```
## Usage

To use the project, simply call the  function with the appropriate parameters:`main`
```
main(id, user, data);
```
`id` (required): the ID of the record to create/destroy (must be an integer)

`user` (required): the name of the user who owns the record (must be a string)

`data` (required): the data to store in the record (must be a string)

## License
This project is licensed under the MIT License. See the LICENSE file for details.
