# Inery Task 4 : RPC API push transaction
## Siap Siap
##### Hapus Nodejs Lama
``` sudo apt-get remove nodejs ```
##### Unduh Curl
``` sudo apt-get install curl ```
#####  Unduh NodeJS
``` curl -fsSL 
https://deb.nodesource.com/setup_19.x | sudo -E 
bash - &&\ sudo apt-get install -y nodejs ```
#####  Unduh npm
``` sudo apt install npm ``` _____________________
## Installation
1. Clone the repo ``` git clone 
   https://github.com/inery-blockchain/ineryjs.git 
   ```
2. Change directory to cloned repo ``` cd ineryjs 
   ```
3. Unduh Paket NPM ``` npm install ``` 

4. Salin `.env-sample` and rename it to `.env`
   ``` cp .env-sample .env ```
 5. Edit ```.env``` 
file with your information
   ``` nano .env ```
## Gunakan
Run RPC Example ``` npm run rpc-example ``` 
_____________________
### 2. Buat Task Project
Go To : ``` 
https://github.com/inery-blockchain/inery-testnet-faucet-tasks 
```
## Buat Fork Dan next create frok
``` cd git clone <link_clone_your> ```
### Buat Directory
``` cd ~/inery-testnet-faucet-tasks mkdir 
<NamaAkunInery>> ```
## 3. Jalankan Perintah Build-Web:
``` cd ~/ineryjs npm run build-web ```
## 4. Copy Folder disit-web ke Project
``` cp -r $HOME/ineryjs/dist-web/ 
$HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/ 
```
## 5. Masuk Ke Directory Project dan membuat file 
## html
``` cd ~/inery-testnet-faucet-tasks/$IneryAccname 
nano index.html ```
### 6. Masukkan skrip ini dan ubah dengan IP Anda
``` <script 
src="./dist-web/inery-jsonrpc.min.js"></script> 
<script 
src="./dist-web/inery-api.min.js"></script> 
<script 
src="./dist-web/inery-jssig.min.js"></script> 
<script>
    (async()=>{ const rpc=new 
        ineryjs_jsonrpc.JsonRpc("https://<YourIPInery>:8888"); 
        console.log(await rpc.get_info());
    })();
</script> ```
