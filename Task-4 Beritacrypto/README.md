# INERY JSON RPC Push Transaction using EOS Studio

- Make sure you have installed `Node.js` and `EOSIO` on your server. If you haven't, you can install them by running the following commands in the terminal:
```
sudo apt update
sudo apt install nodejs npm
sudo apt-get install -y eosio
```
- Next, create a new Node.js project by running the following command in the terminal:
```
mkdir myproject
cd myproject
npm init -y
```
- Install ineryjs and dotenv by running the following command:
```
npm install $HOME/ineryjs dotenv
```
- Copy your contract code to the `rpcindex.mjs` file inside your project directory.

Create a `.env` file inside your project directory and enter the environment variables such as NODE_URL, PRIV_KEY, and ACCOUNT required to access your EOSIO node and contract. For example:
```
NODE_URL=http://localhost:8888
PRIV_KEY=5JhQJ...8hGZc
ACCOUNT=myaccount
```
- Run your project using the command:
```
node rpcindex.mjs
```
You will see the output in your terminal showing the result of your transaction.
Make sure you have modified your contract code to meet the contract requirements and saved it to the correct contract. Also, make sure that NODE_URL matches the node URL used by your EOSIO network, and PRIV_KEY is correct for the private key that will be used to sign your transaction.





