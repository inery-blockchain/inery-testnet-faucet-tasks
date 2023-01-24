# Inery Task 4 : *RPC API push transaction*
## Let's Get Started
##### Delete Reposito Old Nodejs
``` sudo apt-get remove nodejs ```
##### Download Curl
``` sudo apt-get install curl ```
#####  Download NodeJS
``` curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\ sudo apt-get install -y nodejs ```
#####  Download npm
``` sudo apt install npm ```
##### Installation
1. Clone the repo ``` git clone https://github.com/inery-blockchain/ineryjs.git ```
   
2. Change directory to cloned repo ``` cd ineryjs ``` 3. Download NPM package ``` npm install ``` 4. Copy `.env-sample` and 
rename it to `.env` ``` cp .env-sample .env ``` 5. Edit ```.env``` file and enter your information ``` nano .env ```
## Use this for run RPC
Run RPC Example ``` npm run rpc-example ``` _____________________
### 2. Create Task Project
Go To : ``` https://github.com/inery-blockchain/inery-testnet-faucet-tasks ```
## Create Fork and next create Fork
``` cd git clone <link-clone-fork> ```
### Create New Directory
``` cd ~/inery-testnet-faucet-tasks mkdir YOUR-INERY-ACCOUNT-NAME ```
## 3. Run this for Build-Web:
``` cd ~/ineryjs npm run build-web ```
## 4. Copy Folder disit-web to Project
``` cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/ ```
## 5. Go to Directory Project and make html file html
``` cd ~/inery-testnet-faucet-tasks/$IneryAccname nano index.html ```
### 6. Paste this script and only change ip with your VPS IP
``` <script src="./dist-web/inery-jsonrpc.min.js"></script> <script src="./dist-web/inery-api.min.js"></script> <script 
src="./dist-web/inery-jssig.min.js"></script> <script>
    (async()=>{ const rpc=new ineryjs_jsonrpc.JsonRpc("https://<your-vps-ip>:8888"); console.log(await rpc.get_info());
    })();
</script> ```
### 7. Prepare your guide, you can make guide from another git or you must creative
``` cd ~/inery-testnet-faucet-tasks/$IneryAccname nano README.md ```
### 8. Push to Github Account
``` cd ~/inery-testnet-faucet-tasks/ ``` ``` git add $IneryAccname/ ``` ``` git add . ``` ``` git commit -m "task 4 solution 
inery : $IneryAccname" ``` ``` git branch -M main ``` ``` git push -u origin main ```
# DONE
