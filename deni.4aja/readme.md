// persyaratan
// instal curl

sudo apt-get install curl


// instal NodeJS

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

// instal NPM

sudo apt install npm

// instal jika belum ada atau belum terinstal sebelumnya



// cara menjalankannya
// ganti direktori ke direktori deni.4aja 

cd ~/inery-testnet-faucet-tasks/deni.4aja

// Install dependencies

npm install

// buat dan edit .env file

cp .env-sample .env

// menjalankan scrip

npm run solution
