## 1 - Token Transfer

This code transfers the token using the IneryJS library. 
The code uses the environment variables 

`NODE_URL` 
`INERY_ACCOUNT`
`PRIVATE_KEY` 
 

TOKEN to connect to an Inery blockchain node, sign transactions with the private key, and transfer the token from the specified account.


## 2 - How you can use these codes

* Clone this repository.
* Install the dependencies using

* `Install NPM` : npm is a package management system developed for the javascript scripting language and adopted by Node.js as a standard. npm is run from the command line and provides dependency management for applications

```
npm install
```

* Create a .env file in the root directory  


```
nano .env
```

* set the environment variables

<<< `NODE_URL`, `PRIVATE_KEY`, `TOKEN`, `INERY_ACCOUNT` >>>

* NPM start

```
npm start
```


## 3-Variables

The script uses the following environment variables

    * NODE_URL: The URL of the Inery blockchain node to connect to.
    * PRIVATE_KEY: The private key of the account used to sign transactions.
    * INERY_ACCOUNT: The account name that the token will be transferred from.
    * TOKEN: The symbol of the token to be transferred.
    
## 4-Libraries used


`axios` : is a JavaScript library that allows us to easily perform HTTP operations in client side applications.
    
`dotenv` : Dotenv is a JavaScript library developed to automatically transfer variables created in the env file to the process.env object and has no dependencies.

`ineryjs` : Javascript API for integration with Inery-based blockchains.
 
