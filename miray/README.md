sudo apt-get remove nodejs
sudo apt-get install curl

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\

sudo apt-get install -y nodejs

sudo apt install npm

git clone  https://github.com/Vivaldisx/ineryjs.git

cd ineryjs


npm install


cp .env-sample .env


 nano .env


INERY_ACCOUNT="ACCOUNT"
PRIVATE_KEY="KEY"
NODE_URL="http://IP:8888"


npm run rpc-example
