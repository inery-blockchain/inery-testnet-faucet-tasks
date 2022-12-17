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
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/berhasil.png">
</p>
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

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/Frok.png">
</p>

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/Frok2.png">
</p>

Klik tanda panah ke bawah di samping tulisan Fork dan klik Create a new fork dan lanjutkan create frok

#### Membuat clone
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/Clone.png">
</p>

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
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/Build.png">
</p>

### 4. mengcopy Folder disit-web ke Project
```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```

### 5. Masuk Ke Directory Project dan membuat file html
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/ip.png">
</p>

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

### 8.  Kembali lagi ke Github
1. Silahkan Refresh repository Fork yang dibuat di step 2 tadi, lalu click commit ahead 
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/merge1.png">
</p>

2. Lanjutkan Create pull request
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/merge2.png">
  <img src="https://github.com/Herzarika/Images/blob/main/merge3.png">
</p>

3. Check hasilnya di https://github.com/inery-blockchain/inery-testnet-faucet-tasks
<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/check.png">
</p>

### Done
Semoga di Approved...
_____________________

## Disclaimer : 

Guide lanjutan ini, masih bersifat meraba-raba, belum fix keberhasilannya. masih tahap ujicoba, jika ada update, akan diperbaiki di kemudian hari. Jika gagal Task 4 setelah mengikuti Guide ini, bukan merupakan tanggung jawab kami. Karna kami juga masih meraba-raba kakak..

_____________________

## Note :
jika tidak dapat terhubung dengan github dan dianggap salah sandi, bisa pake token clasic sandinya
Silahkan klik setting > Developer settings > Personal access tokens > Token (classic) > Generate a personal acces token. Dan silahkan copy, juga sebaiknya simpan aja di databasemu, bisa di notepad atau excel, agar berguna lagi sewaktu-waktu di kemudian hari, biar gak perlu buat-buat lagi.

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/Setting1.png">
</p>

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/setting2.png">
</p>

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/kasihnama.png">
</p>

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/token.png">
</p>

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/token2.png">
</p>

<p align="center">
  <img src="https://github.com/Herzarika/Images/blob/main/simpan.png">
</p>

_____________________
