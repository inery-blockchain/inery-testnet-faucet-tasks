# Inery Task 4 : Json RPC Sample
A Sample code to call JSON RPC on Inery Blockchain

## Persiapan
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

#### Successful Example
![img](https://github.com/ArumaSanjayani/Images/blob/main/berhasil.png)

_____________________

# Lanjutan Task 4 Inery Blockchain

### 1. Set nama akun sebagai env variable dan Set PATH env

Agar tidak berulang menulis nama Akun Inery, kita perlu mengatur nama akun sebagai Variable env, silahkan ganti Nama_Akun_Inery dengan Nama Akun Inerymu

```
cd
IneryAccname=Nama_Akun_Inery
```
```
export PATH="$PATH:$HOME/inery.cdt/bin:$HOME/inery-node/inery/bin"
```

### 2. Membuat Frok Task Project

Kunjungi Halaman :
https://github.com/inery-blockchain/inery-testnet-faucet-tasks

![img](https://github.com/ArumaSanjayani/Images/blob/main/Frok.png)

![img](https://github.com/ArumaSanjayani/Images/blob/main/Frok2.png)

Klik tanda panah ke bawah di samping tulisan Fork dan klik Create a new fork dan lanjutkan create frok

#### Membuat clone
![img](https://github.com/ArumaSanjayani/Images/blob/main/Clone.png)

Klik Code dan Copy link clone dan lanjutkan, jangan lupa <link_clone> ganti dengan link yang kamu copy tadi dan buang tanda <>

```
cd
git clone <link_clone>
```

#### Membuat directory project
```
cd ~/inery-testnet-faucet-tasks
mkdir $IneryAccname
```

### 3. Run Command Build-Web:

```
cd ~/ineryjs
npm run build-web
```

![img](https://github.com/ArumaSanjayani/Images/blob/main/Build.png)

### 4. mengcopy Folder disit-web ke Project
```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```

### 5. Masuk Ke Directory Project dan membuat file html
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```

![img](https://github.com/ArumaSanjayani/Images/blob/main/ip.png)
##### Masukan Script di bawah ini dan jangan lupa ganti IPmu serta buang tanda <>
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
### 6. Membuat Tutorial (bisa diskip bagian ini kalau ragu dengan tasknya)
##### Silahkan buat tutorial mengenai Inery sebagai bagian dari Soluution Project
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano README.md
```

### 7. Menghubungkan Task ke Github
```
cd ~/inery-testnet-faucet-tasks/
```
```
git init
```
```
git remote add origin <link_clone>
```

ganti <link_clone> dengan url repository yang kamu copy di step 2 tadi, dan lanjutkan dengan command di bawah ini :

```
git add $IneryAccname/
```
```
git add README.md
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
### 8.  Kembali lagi ke Github
1. Silahkan Refresh repository Fork yang dibuat di step 2 tadi, lalu click commit ahead 
![img](https://github.com/ArumaSanjayani/Images/blob/main/merge1.png)

2. Lanjutkan Create pull request
![img](https://github.com/ArumaSanjayani/Images/blob/main/merge2.png)

3. Check hasilnya di https://github.com/inery-blockchain/inery-testnet-faucet-tasks
![img](https://github.com/ArumaSanjayani/Images/blob/main/check.png)

### Done
Semoga di Approved...

_____________________

## Disclaimer : 

Guide lanjutan ini, masih bersifat meraba-raba, belum fix keberhasilannya. masih tahap ujicoba, jika ada update, akan diperbaiki di kemudian hari. Jika gagal Task 4 setelah mengikuti Guide ini, bukan merupakan tanggung jawab kami. Karna kami juga masih meraba-raba kakak..

_____________________
