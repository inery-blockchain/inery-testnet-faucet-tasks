## Getting Started

To verify the quality of your code, you will need to clone the specific branch of the project and submit the required changes for that task. After making the necessary changes, you can create a pull request to submit your work for review. If the work is satisfactory, it will be approved. If there are any issues with the work, it may be labeled with specific comments indicating what needs to be improved or modified. It is important to carefully review and address any feedback provided in order to improve the quality of your work.



### steps to do inery task 4 : RPC API push transaction via wardy ###

### the steps ###

## Remove Previous Nodejs
sudo apt-get remove nodejs

##  Install Curl
sudo apt-get install curl

## Install NodeJS
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

## Install npm
sudo apt install npm

### Installation ###

## Clone the repo
git clone https://github.com/inery-blockchain/ineryjs.git (example)

## Change directory to cloned repo
cd ineryjs

## Install NPM packages
npm install

## Copy .env-sample and rename it to .env
cp .env-sample .env

 ## Edit .env file with your information
 nano .env

## You can check your account information from Dashboard inery.<br><br>
INERY_ACCOUNT="wardy"
PRIVATE_KEY="5Kf2grif4TqTz7DqEzSenTDqGSxR6fczP8orA4mYFLn4YMSigVt"
NODE_URL="http://185.135.137.27:8888"

 ## Run RPC Example
npm run rpc-example


### next step ###

###  Create Task Project

Go to : https://github.com/inery-blockchain/inery-testnet-faucet-tasks


## Make the Fork And then make the frok
cd
git clone <link_clone_your>

## create directory
cd ~/inery-testnet-faucet-tasks
mkdir <YourIneryName>

## Run the Build-Web Command
cd ~/ineryjs
npm run build-web

## Copy the web-site Folder to Project
cp -r $HOME/ineryjs/dist-web/ 
$HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/

## Go to the Project Dcd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.htmlirectory and create an html file

##Enter this script and change it with your IP
``` <script 
src="./dist-web/wardy-jsonrpc.min.js"></script> 
<script 
src="./dist-web/wardy-api.min.js"></script> 
<script 
src="./dist-web/wardy-jssig.min.js"></script> 
<script>
    (async()=>{ const rpc=new 
        ineryjs_jsonrpc.JsonRpc("https://185.135.137.27:8888"); 
        console.log(await rpc.get_info());
    })();
</script> ```


DONE