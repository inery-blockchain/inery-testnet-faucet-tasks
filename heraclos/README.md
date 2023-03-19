## This is an example script that uses the INERY.js library and the JSON-RPC API to push transactions to a blockchain network.

## Prerequisites

To run this script, you will need:

* Node.js installed on your machine

* An account on a blockchain network

* A private key for the account in WIF format

* The JSON-RPC endpoint URL for the network

## Installation

To install the dependencies, run:

```
npm install
```

## Usage

To use the script, first edit the `.env` file to include your account information and the JSON-RPC endpoint URL. Then, run

```
npm start
```

The script will push four transactions to the network, each with a different action name (`create`, `read`, `update`, or `destroy`) and data payload.
