## RPC API Push Transaction Example (via `ineryjs`)

This repository sole purposes is to demonstrate you to setup `ineryjs` to push a 
transaction through API endpoint.

## Quick Start

You are going to follow a quick guide to send tokens from one account to another
one using `push_transaction` method


## How to run
Config your transfer settings in `.env` file

```bash
npm install

npm install -g ts-node typescript '@types/node'
```

Create a `.env` file with the following content:

```
TRANSFER_FROM_ACCOUNT="<your account name>"
SIGNING_PRIVATE_KEY="<your private key>"
NODE_URL="<Inery node rpc url>"
TRANSFER_TO_ACCOUNT="<the account that will receive token from your account>"
TRANSFER_QUANTITY="<token quantity with symbol>"
```

Adapt the `push-transaction.ts` script to fit your need

Launch the `push-transaction.ts` script:

```bash
ts-node push-transaction.ts
```