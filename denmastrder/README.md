# Inery Tugas 4 : Membuat transaksi dorong RPC API dan mengupload ke github Inery

## Persiapan

##### Hapus Nodejs Sebelumnya
```
sudo apt-get remove nodejs
```

##### Instal Curl

```
sudo apt-get install curl
```

##### Instal NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

##### Install npm
```
sudo apt install npm
```
_____________________

## Instalasi

1. Wajib kloning repositori di bawah ini!

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

2. Jaangan lupa untuk Ubah direktori ke repo yang dikloning

   ```
   cd ineryjs
   ```

3. Jangan lupa untuk menginstal paket NPM dibawah ini

   ```
   npm install
   ```

4. Selanjutnya, salin `.env-sample` dan ganti namanya menjadi `.env` (jangan terlewatkan)

   ```
   cp .env-sample .env
   ```

5. Edit file ```.env``` dengan informasi Anda dan jangan sampai salah meskipun sedikit

   ```
   nano .env
   ```
## Siap untuk pakai, silahkan dicoba dengan perintah dibawah ini

Run RPC Example

```
npm run rpc-example
```
_____________________


### 2. Lalu membuat Proyek Tugas
pergi ke atau salin tautan dibawah ini ke browser anda :
```
https://github.com/inery-blockchain/inery-testnet-faucet-tasks
```

## Kloning repo anda

```
cd
git clone <link_clone_your>
```

### Buat direktori baru dengan nama anda 

```
cd ~/inery-testnet-faucet-tasks
mkdir <YourIneryName>
```

## 3. Jalankan Perintah Build-Web dibawah ini

```
cd ~/ineryjs
npm run build-web
```

## 4. Copy Folder disit-web ke Project

```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```

## 5. Setelah itu yang anda lakukan adalah masuk ke direktori Project dan membuat file html

```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```

### 6. Masukkan teks dibawah ini untuk mengisi file html yang sudah anda buat

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

# SELAMAT INERY TUGAS 4 ANDA TELAH SELESAI, SEKARANG WAKTUNYA UNTUK PERGI KE WEB INERY DAN KLIK FINISH TASK!
# SEMOGA DISETUJUI :D

## Dibuat oleh: denmastrader
