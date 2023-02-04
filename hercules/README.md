## 🟢 Token Transfer

This code transfers the token using the IneryJS library.
The code uses the environment variables `NODE_URL`, `PRIVATE_KEY`, `INERY_ACCOUNT`, and `TOKEN` to connect to an Inery blockchain node, 
sign transactions with the private key, and transfer the token from the specified account.

## 🟢 How to Use

1. Clone this repository.
2. Install the dependencies using

```shell
npm install
```

3. Create a `.env` file in the root directory and set the environment variables `NODE_URL`, `PRIVATE_KEY`, `INERY_ACCOUNT`, and `TOKEN`
4. Run the code using 

```shell
npm start
```


## 🟢 Environment Variables

The code uses the following environment variables

- `NODE_URL`: The URL of the Inery blockchain node to connect to.
- `PRIVATE_KEY`: The private key of the account used to sign transactions.
- `INERY_ACCOUNT`: The account name that the token will be transferred from.
- `TOKEN`: The symbol of the token to be transferred.

## 🟢 Libraries

The code uses the following libraries:\par

- axios
- ineryjs
- dotenv
