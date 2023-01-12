### Inery Task 4 : Json RPC Sample


# Install NodeJS
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install NPM
sudo apt install npm

### Instalation

1. Clone Repo
`git clone https://github.com/inery-blockchain/ineryjs.git`

2. Change directory to cloned repo
`cd ineryjs`

3. Install NPM packages
`npm install`

4. Copy .env-sample and rename it to .env
`cp .env-sample .env`

5. Edit .env file with your information
`nano .env`
# Run RPC Example
`npm run rpc-example`
