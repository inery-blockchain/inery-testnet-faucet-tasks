# Inery Testnet Task 4
Make sure all of the third tasks are accurate before completing the fourth one.
## Tutorial RPC API push transaction
You must verify the crud smart contract in your account by entering the command.
```

cline get abi your_inery_account

```
# Installation
#### Clone The Repository

```

git clone https://github.com/HarisMillen/ineryjs.git

```
#### Change Directory to Cloned Repository

```

cd ineryjs

```
#### Install the NPM Packages
```

npm install

```
#### Copy and rename .env-sample to .env
```

cp .env-sample .env

```
#### Use this code to edit .env 
```

nano .env

```
#### Edit .env file with your information
Example:
[![AE935-EF7-97-E2-4-CBA-8-C55-CF597-B1-AF529.jpg](https://i.postimg.cc/gJnpZkky/AE935-EF7-97-E2-4-CBA-8-C55-CF597-B1-AF529.jpg)](https://postimg.cc/hzWNFnmh)

```

INERY_ACCOUNT="cerisc" 

PRIVATE_KEY="put your private key"

NODE_URL="http://put your ip address:8888/"

```
### 2. Testing 

Run RPC Example

```

npm run rpc-example

```
If you run the code and it returns an error, it means the code was successful.
### 3. Fixing

Thanks to: [alteregogi](https://github.com/alteregogi)

#### Error : Serialization time limit 15000us exceeded:

Change max-transaction-time to more than 15000 in your config.ini

```

nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini

```

#### Error : connect ECONNREFUSED NODE_IP_ADDRESS:8888

Make sure to open your port setting on your VPS provider dashboard and make sure your VPS port **8888** is open, try to check it on [portchecker.co](https://portchecker.co/)

```

sudo ufw allow 8888

```

#### Error: missing create.issuer ( type=name )
You doesn't have Valued Smart Contract on your account, this is on Task 3.
