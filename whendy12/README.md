#Inery Task 4 : RPC API push transaction

##Prepare

##### Remove Previous Nodejs
```
sudo apt-get remove nodejs
```

##### Install Curl

```
sudo apt-get install curl
```

##### Install NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

##### Install npm
```
sudo apt install npm
```
_____________________

## Installation

1. Clone the repo

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

2. Change directory to cloned repo

   ```
   cd ineryjs
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information

   ```
   nano .env
   ```
## Usage

Run RPC Example

```
npm run rpc-example
```
_____________________


### 2. Create Task Project
Go To :
```
https://github.com/inery-blockchain/inery-testnet-faucet-tasks
```

## Create a new fork and next create frok

```
cd
git clone <link_clone_your>
```

### create directory 

```
cd ~/inery-testnet-faucet-tasks
mkdir <YourIneryName>
```

## 3. Run Command Build-Web:

```
cd ~/ineryjs
npm run build-web
```

## 4. mengcopy Folder disit-web ke Project

```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```

## 5. Masuk Ke Directory Project dan membuat file html

```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```

### 6. Input this script and change with your IP 

```
<script src="./dist-web/inery-jsonrpc.min.js"></script>
<script src="./dist-web/inery-api.min.js"></script>
<script src="./dist-web/inery-jssig.min.js"></script>
<script>
    (async()=>{
        const rpc=new ineryjs_jsonrpc.JsonRpc("https://<YourIPInery>:8888");
        console.log(await rpc.get_info());
    })();
</script>
```

