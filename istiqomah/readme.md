# Prerequisites

To run this project, you must have the following dependencies installed on your system:

- [NodeJS](https://nodejs.org/en/): A JavaScript runtime environment that enables you to run server-side code.
- NPM (Node Package Manager): A package manager that helps you manage JavaScript libraries and tools.
- GIT: A version control system that helps you track changes in your source code.

## Installing Dependencies

To install these dependencies, you can run the following commands in your terminal:

```
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
```

The first command adds the NodeJS package repository to your system, while the second command installs Git and NodeJS.

# Cloning the Repository

You can clone the repository for this project by running the following command in your terminal:

```
git clone https://github.com/rocknrolls/inery-testnet-faucet-tasks -b task4
```

# Configuring Environment Variables

Before running the script, you need to set the following environment variables:

- `NODE_IP_INERY="http://34.140.1.8:8888"`: The URL of your node.
- `PRIVATE_KEY`: Your private key.
- `ACCOUNT_INERY`: Your Inery account.
- `DATA_TX_PUSH`: Your data ID (numeric only).

You can set these variables in the `.env` file in the `rocknrolls` directory. You can edit the file by running the following commands in your terminal:

```
cd inery-testnet-faucet-tasks/rocknrolls
nano .env
```

# Installing Module Dependencies

To install the required modules for this project, you need to run the following commands in your terminal:

```
npm install -g npm
npm install
```

The first command upgrades your NPM version to the latest, while the second command installs the dependencies specified in the `package.json` file.

# Running the Script

You can run the script by running the following command in your terminal:

```
npm run push-transaction
```
