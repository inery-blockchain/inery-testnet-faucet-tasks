# Inery Json RPC Tugas 4
Contoh kode untuk memanggil JSON RPC di Inery Blockchain

# 🟢Informasi

Kode Sampel JSON RPC tersedia di direktori sampel, Anda dapat mencoba memodifikasinya dan memahami cara kerjanya, Anda juga perlu memiliki Kontrak Nilai Cerdas (Tugas 3) di Akun Anda untuk dapat menjalankan kode Anda dan memanggil yang berharga fungsi kontrak.

# 🟢 Mulailah
Copot pemasangan Nodejs lama


'shell'
sudo apt-get hapus nodejs
```

Instal CURL

'shell'
sudo apt-get install curl
```

Instal CURL

'shell'
     curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
     sudo apt-get install -y nodejs
```

# 🟢 Instalasi NPM

'shell'
sudo apt install npm
```


# 🟢 Instalasi

* Kloning repo

    ```
    git clone https://github.com/accountname/ineryjs.git
    ```

* Masuk Direktori

    ```
    cd ineryjs
    ```

* Instal Paket NPM

    ```
    instal npm
    ```

* Ubah nama file sampel env menjadi .env dengan kode di bawah ini

    ```
    cp .env-sampel .env
    ```

* Edit informasi ``.env`'Anda

   ```
    nano .env
    ```

Di jendela yang terbuka di sini, 

Anda dapat menemukan Informasi berikut di Dasbor inery testnet.

INERY_ACCOUNT="NAMA AKUN ANDA" 
PRIVATE_KEY="KUNCI ANDA"
NODE_URL="http://NODEIPADDRESS:8888"


Kami mengatakan ctrl + X Ya dan keluar.


# 🟢 Pembukaan port 8888

Jalankan Instans RPC

```
sudo ufw mengizinkan 8888
```


# 🟢 Operasi

```
npm jalankan rpc-contoh
```

# 🟢 Solusi Kesalahan

Batas waktu serialisasi 15000us telah terlampaui


* Ubah waktu transaksi maksimum menjadi 15.000 di file config.ini

```
nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini
```

<img src="https://prnt.sc/S30-ecJT8Nfm"



* hubungkan ECONNREFUSED


```
sudo ufw mengizinkan 8888
```

<img src="https://prnt.sc/N9yLXeZWb0VW"
