# Install Dependencies

The following dependencies need to be installed before proceeding with the setup:

- [NodeJS](https://nodejs.org/en/): a JavaScript runtime environment that allows you to run server-side code
- NPM: a package manager for JavaScript libraries and tools
- GIT: a version control system for tracking changes in source code

To install these dependencies, you can use the following commands:

```
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
```

# Clone the repository

The repository can be cloned using the following command:

```
git clone https://github.com/pirocks/inery-testnet-faucet-tasks -b task4
```

# Configure environment variables

Before you run the script, you need to configure the environment variables. The following variables need to be set:

- `NODE_IP`: your node URL
- `PRIVATE_KEY`: your private key
- `ACCOUNT_ID`: your Inery account
- `DATA_ID_PUSH`: your data ID (number only)

You can set these variables in the `.env` file in the `komeng` directory. You can edit the file using the following command:

```
cd inery-testnet-faucet-tasks/komeng
nano .env
```

# Install module dependencies

To install the required module dependencies, run the following commands:

```
npm install -g npm
npm install
```

# Run the script

Finally, you can run the script using the following command:

```
npm run push-transaction
```
