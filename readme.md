### Inery Task 4 : Json RPC Sample ###

##### Instal Curl

sudo apt-get install curl

# Install NodeJS

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install NPM

sudo apt install npm

### Instalation

# Clone Repo

git clone https://github.com/inery-blockchain/ineryjs.git

# Change directory to cloned repo

cd ineryjs

# Install NPM packages

npm install

# Copy .env-sample and rename it to .env

cp .env-sample .env

# Edit .env file with your information

nano .env

# Run RPC Example:

npm run rpc-example

### Create a Task Project
  Copy the link below:
  
https://github.com/inery-blockchain/inery-testnet-faucet-tasks

## Your Repo Cloning

cd
git clone <link_clone_your>

### Create a new directory with your name

cd ~/inery-testnet-faucet-tasks
mkdir <YourIneryName>

## 3. Run the Build-Web command below

cd ~/ineryjs
npm run build-web

## 4. Copy the folder on-web to the project

cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/

## 5. After that what you do is enter the project directory and create an HTML file

cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html

### 6. Enter the text below to fill in the HTML file that you created

<script src="./dist-web/inery-jsonrpc.min.js"></script>
<script src="./dist-web/inery-api.min.js"></script>
<script src="./dist-web/inery-jssig.min.js"></script>
<script>
    (async()=>{
        const rpc=new ineryjs_jsonrpc.JsonRpc("https://<YourIPInery>:8888");
        console.log(await rpc.get_info());
    })();
</script>

## TEH PUCUK ##