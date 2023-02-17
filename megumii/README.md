## Install Prerequisite

```md
sudo apt update; sudo apt upgrade
sudo apt install curl
```

### Install NodeJS 

```md
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```



### How to run

Change directory directory

```md
cd ~/inery-testnet-faucet-tasks/megumii
```

Install dependencies

```md
npm install
npm install dotenv
```

```md
sudo cp .env.example .env
```

Run the script

```md
npm run solution
```
