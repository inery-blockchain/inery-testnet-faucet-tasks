
## Prerequisites

Make sure you have `curl` and `NodeJS` with `NPM` installed on your system.

### Install curl

```shell
sudo apt-get install curl
Install NodeJS & NPM
Download NodeJS & NPM for Windows - includes NPM package manager.
For Linux, use this command:
```shell

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
**How to Run
Clone the repository and change directory to the project folder:

```shell

git clone https://github.com/inery-blockchain/inery-testnet-faucet-tasks.git
cd inery-testnet-faucet-tasks/task4/your-account-name
**Replace your-account-name with your Inery testnet account name.

Install all project dependencies using NPM:

```shell

npm install
Create and edit the .env file by duplicating the .env-sample file:

```shell

cp .env-sample .env
**Update the .env file with your Inery testnet account details and other required configurations.

Run the script to call the blockchain API and perform push_transaction:

```shell

npm run solution

**Make sure to fill in the .env file with the appropriate configuration before running the script, and ensure that you have an active internet connection and sufficient balance in your blockchain account.** 
