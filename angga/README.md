# TUTORIAL KALI INI (TUGAS 4) LUMAYAN SULIT, KARENA KITA DIHARUSKAN MEMBUAT SOLUSI RPC API (WAJIB KREATIF DAN TIDAK BOLEH SAMA)


##### Langkah pertama, hapus nodejs yang sudah ada sebelumnya
```
sudo apt-get remove nodejs
```

##### Instal Curl,Instal Nodejs,Instal npm (masukkan satu-persatu)

```
sudo apt-get install curl
```


```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

```
sudo apt install npm
```
_____________________

## Proses instalasi

1. Kloning repo official dari Inery

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

2. Ubah direktori

   ```
   cd ineryjs
   ```

3. Instal NPM (paket)

   ```
   npm install
   ```

4. `.env-sample` ganti namanya menjadi `.env`

   ```
   cp .env-sample .env
   ```

5. Edit file ```.env``` sesuai data anda

   ```
   nano .env
   ```
## Silahkan dicoba perintah dibawah, jika tidak ada yang terlewatkan pasti berhasil

Run RPC Example

```
npm run rpc-example
```
_____________________


### 2. Membuat proyek
salin teks dibawah dan pergi ke browser :
```
https://github.com/inery-blockchain/inery-testnet-faucet-tasks
```

## Kloning repo

```
cd
git clone <alamat_repo_anda>
```

### Buat direktori sesuai nama akun anda

```
cd ~/inery-testnet-faucet-tasks
mkdir <nama_akun_anda>
```

## 3. Jalankan Perintah dibawah

```
cd ~/ineryjs
npm run build-web
```

## 4. Copy folder disit-web ke proyek dan masuk ke direktori Project dan membuat file html (masukkan satu-persatu)

```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```


```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```

### 5. Copy-paste teks dibawah ke index.html

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

# SELESAI, SEMOGA DISETUJUI TIM INERY

## Pembuat RPC: angganode



