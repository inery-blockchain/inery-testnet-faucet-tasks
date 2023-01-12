# Inery Task 4 : RPC API push transaction

## Prepare

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

1. Clone repository below

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

2. Change the directory to the cloned repo

   ```
   cd ineryjs
   ```

3. Don't forget to install NPM packages

   ```
   npm install
   ```

4. Next, copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information

   ```
   nano .env
   ```
## Ready to usage

Run RPC Example

```
npm run rpc-example
```
_____________________


### 2. Urgent! create Task Project
Go to :
```
https://github.com/inery-blockchain/inery-testnet-faucet-tasks
```

## After that, create a new fork and next create frok

```
cd
git clone <link_clone_your>
```

### Create directory 

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

### 6. Don't forget to input this script and change with your IP 

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

## CONGRATULATIONS YOUR INERY TASKS 4 HAS BEEN COMPLETED PLEASE GO TO THE INERY WEB TO CLICK FINISH TASK
