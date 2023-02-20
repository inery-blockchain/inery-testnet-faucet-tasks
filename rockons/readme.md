```
Setting Up and Running a NodeJS, NPM, and Git Project Tutorial
```

This tutorial explains how to set up and run a project that uses NodeJS, NPM, and Git.

```
Cloning the Project
```

The project is hosted on Github, and you can clone it using the command:

```
git clone https://github.com/rockons/inery-testnet-faucet-tasks -b task4
```

```
Dependencies
```

Before running the project, make sure to install the following dependencies on your system:

- **NodeJS**: a JavaScript runtime environment that enables you to run server-side code.
- **NPM (Node Package Manager)**: a package manager that helps manage JavaScript libraries and tools.
- **Git**: a version control system that helps track changes in your source code.

To install these dependencies, run the following commands in your terminal:

```
curl http://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt install git nodejs -y
```

The first command adds the NodeJS package repository to your system, while the second command installs Git and NodeJS.

```
Setting Environment Variables
```

After cloning the repository, you need to set the environment variables in the `.env` file. The variables that need to be set are:

- `DATA_TX_ID`: your data ID (numeric only).
- `ACCOUNT_ID_INERY`: your Inery account ID.
- `PRIVATE_KEY_ID`: your private key.
- `NODEIP_INERY`: the URL of your node.

You can edit the `.env` file by running the following commands in your terminal:

```
cd inery-testnet-faucet-tasks/rockons
nano .env
```

```
Installing Required Modules
```

To install the required modules for the project, run the following commands in your terminal:

```
npm install -g npm
npm install
```

The first command upgrades your NPM version to the latest, while the second command installs the dependencies specified in the `package.json` file.

```
Running the Script
```

Finally, to run the script, use the following command in your terminal:

```
npm run push-transaction
```

This command will execute the `push-transaction` script and push a transaction to the Inery testnet. If the transaction is successful, you should receive some tokens in your account.
