# The first step before we do is we need to test and minimize errors
# Inery Task 4 : Json RPC Sample
A Sample code to call JSON RPC on Inery Blockchain

## Persiapan
##### Remove Previous Nodejs
```
sudo apt-get remove nodejs
```

##### Install Curl

```
sudo apt-get install curl
```

##### Install NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

##### Install npm
```
sudo apt install npm
```
_____________________

## Installation

1. Clone the repo

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

2. Change directory to cloned repo

   ```
   cd ineryjs
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information

   ```
   nano .env
   ```

## Usage

Run RPC Example

```
npm run rpc-example
```

#### Successful Example
<p align="center">
  <img src="https://github.com/asabigbos/Images/blob/main/berhasil.png">
</p>

___________________________________________________

### Once it feels successful we proceed to the actual task
### Before running in order to prepare

- [NodeJS](https://nodejs.org/en/)

- NPM



### Stages to run

Change directory to ```arfiyan```

```shell
cd ./arfiyan
```

### Next you need to replace
Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY
INERY_ACCOUNT=YOUR INERY ACCOUNT

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run pushsolution
```
### Brief Explanation 

This will run the script specified as the "main" in the package.json file, which is "./pushsolution.mjs" in this case.

The function first provided is used to create new data in a smart contract on the Inery blockchain. It does this by calling the "create" function on the smart contract with the provided parameters. The script imports the necessary modules, sets up the API and signature provider, and then defines an async function called "create" that takes three parameters: id, user, and data. This function creates a new transaction and signs it, calling the "create" function on the smart contract with the provided parameters. The transaction is then broadcast to the network and the result is logged to the console.

The funtion second provided is used to update data in a smart contract on the Inery blockchain. It does this by calling the "update" function on the smart contract with the provided parameters. The script follows a similar structure to the first three scripts, with the exception of calling the "update" function instead and providing different parameters.

The third funtion provided is used to delete data in smart contracts on the Inery blockchain. This is done by calling the "delete" function on the smart contract with the provided parameters. The script will completely delete the available data according to the read id
