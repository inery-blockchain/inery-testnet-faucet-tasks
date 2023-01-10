### Persiapan/Prerequisite

### Install NodeJS [NodeJS](https://nodejs.org/en/)
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
### Install Curl
```
sudo apt-get install curl
```
### Install  NPM
```
sudo apt install npm
```


### How to run

Change directory to directory nurulihsan

```shell
cd ~/inery-testnet-faucet-tasks/nurulihsan
```


Install dependencies

```shell
npm install
```

Create & edit `.env` file

```
cp .env-sample .env
```


Run the script

```
npm run solution
```
