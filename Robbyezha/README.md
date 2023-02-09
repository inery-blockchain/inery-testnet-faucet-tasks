Dependency Installation
Before setup, install the following dependencies:

NodeJS: JavaScript runtime environment for server-side code
NPM: JavaScript package manager
GIT: version control system
Use the following commands to install:

javascript
Copy code
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
Repository Cloning
Clone the repository using this command:

bash
Copy code
git clone https://github.com/Pepoyy/inery-testnet-faucet-tasks -b task4
Environment Variable Configuration
Before running the script, set the following environment variables in the .env file in the Pepoyy directory:

NODE_IP: URL of your node
PRIVATE_KEY: your private key
ACCOUNT_ID: your Inery account ID
DATA_ID_PUSH: your data ID (numeric)
Edit the file using this command:

bash
Copy code
cd inery-testnet-faucet-tasks/Pepoyy
nano .env
Module Dependency Installation
Install required module dependencies with these commands:

Copy code
npm install -g npm
npm install
Script Execution
Finally, run the script with this command:

perl
Copy code
npm run push-transaction