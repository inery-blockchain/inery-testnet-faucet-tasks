@@ -0,0 +1,27 @@
# how to run program

sudo apt-get remove nodejs
sudo apt-get install curl

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\

sudo apt-get install -y nodejs

sudo apt install npm

git clone https://github.com/bimbimantoro/inery-testnet-faucet-tasks.git

cd ineryjs

npm install

cp .env-sample .env

nano .env

INERY_ACCOUNT="<account>"
PRIVATE_KEY="<key>"
NODE_URL="http://<ip>:8888"

============================
npm run rpc-example
