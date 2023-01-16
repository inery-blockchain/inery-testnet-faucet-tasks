
### INERY blockchain sample RPC push transaction via JSON-RPC by whalealert with inery account `nodex.inery`

### Install Yarn
```
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```
### Install NodeJS
`inery using NodeJs v14xx and above`
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### How to works?

its example use task 3
```
git clone https://github.com/Whalealert/inery-testnet-faucet-tasks/
cd inery-testnet-faucet-tasks/
git checkout task4
```
 * change directory
```
cd Nodex.inery
```
 * set variable on .env
```
nano .env
```
### How to use?

 * CREATE data 
```
yarn install
```
```
yarn run nodex-inery
```
