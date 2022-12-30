Inery Json RPC Task 4 Example code to call JSON RPC on Inery Blockchain

??Information JSON RPC Sample code is available in example directory, you can try to change example and understand how it works, you also need to have Value Smart Contract (Task 3) in your Account to be able to run your code and call valuable contract function.

?? Get Started Uninstall Old Nodejs

sudo apt-get remove nodejs install Curl

sudo apt-get install curl

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
?? NPM install sudo apt install npm ?? Clone the Installation Repo

git clone https://github.com/herculessx/ineryjs.git Enter Directory

cd ineryjs Install NPM Package

npm install Rename the env-sample file to .env with the following code

cp .env-sample .env edit your .env information

nano .env in popup here

You can find the following Information in the inery testnet Dashboard.

INERY_ACCOUNT="YOUR ACCOUNT NAME" PRIVATE_KEY="YOUR KEY" NODE_URL="http://NODEIPADDRESS:8888"

We say ctrl + X Yes and exit.

?? Open 8888 port Run RPC Example

sudo ufw allow 8888

?? Run npm run rpc-example process output should be as follows

https://explorer.inery.io/ image

?? Error Solutions Serialization time limit 15000us exceeded

Change max-transaction-time to 15000 in your config.ini file nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini

connect ECONNREFUSED sudo ufw allow 8888

missing create.issuer ( type=name ) This means there is no Value Smart Contract you created in Task 3 in your account. To check if you have CRUD Smart Contract in your account, cline get abi ineryi-your-account-name

make sure you have this output
