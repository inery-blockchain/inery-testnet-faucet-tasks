Lanjutan dari Task 4 Inery Blockchain
### 1. Ganti Nama Inery_Account dengan Nama Akun Inery Anda sendiri
```
## Sebelum memulai
Hapus Nodejs lama
<br>

```shell
sudo apt-get remove nodejs
```

Install Curl

```shell
sudo apt-get install curl
``

```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```


## Install NPM
```shell
sudo apt install npm
```


## Persiapkan

 Cloning Repo

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

 Change Directory

   ```
   cd ineryjs
   ```

 Install NPM Package

   ```
   npm install
   ```

 Rename  env-sample file to .env 

   ```
   cp .env-sample .env
   ```

  ```.env``` edit with your information

  ```
   nano .env
   ```


Kamu dapat cek informasi yang dibutuhkkan untuk mengedit script diatass di Dashboard akun Inery kamu inery.<br><br>

INERY_ACCOUNT="YOUR_INERY-ACCOUNT" <br>
PRIVATE_KEY="PRIVATE_KEY"<br>
NODE_URL="http://YOUR_IP_VPS:8888" 
<br><br>

and then
ctrl +X  Yes



cd
IneryAccname=Inery_Account Name
```
```
export PATH="$PATH:$HOME/inery.cdt/bin:$HOME/inery-node/inery/bin"
```
### 2. Fork Inery testnet faucet task repository
Go to Page :
https://github.com/inery-blockchain/inery-testnet-faucet-tasks

### 3. Copy link repository kamu
```
cd
git clone link repo kamu
```
#### 4. Buat folder project
```
cd ~/inery-testnet-faucet-tasks
mkdir IneryAccname
mkdir $IneryAccname
```

### 5. Run build-web dengan script 
```
cd ~/ineryjs
npm run build-web
```
### 6. Salin folder project ke website
```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```
### 7. Masuk ke folder dan buat file html dengan memasukkan script satu per satu
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```

##### 8. Masukkan script berikut dan ganti dengan ip kamu, hapus simbol < >, jika sudah gunakan ctrl + x + y untuk menyimpan
```
<script src="./dist-web/inery-jsonrpc.min.js"></script>
<script src="./dist-web/inery-api.min.js"></script>
<script src="./dist-web/inery-jssig.min.js"></script>
<script>
     (async()=>{
         const rpc=new ineryjs_jsonrpc.JsonRpc("https://<IPmu>:8888");
         console.log(await rpc.get_info());
     })();
</script>
```
### 9. INERY 4. Buat panduan missi 
##### Catatan = Kamu dapat menggunakan reefferensi  dari guide siapa yang kamu jalankan
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano README.md
```
### 10. Tautkan Tugas ke Github minta kata sandi di akhir Saya menulis cara mendapatkannya di akhir panduan
```
cd ~/inery-testnet-faucet-tasks/
```
```
git add $IneryAccname/
```
```
git add .
```
```
git commit -m "task 4 solution inery : $IneryAccname"
```
```
git branch -M main
```
```
git push -u origin main
```
### 11. Buka akun github lagi
1. Segarkan / refresh browser kamu , klik commit ahead
2. Create pull requests
  
3. Periksa hasilnya, jika nama Anda ada di bagian pull request, tidak apa-apa
https://github.com/inery-blockchain/inery-testnet-faucet-tasks
