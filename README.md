## FAQ

#### 1. Error : Serialization time limit 15000us exceeded:

![](https://snipboard.io/a0drGN.jpg)

**How To Fix:**

Change ``max-transaction-time`` to more than ``15000`` in your ``config.ini``
```shell
nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini
```

Thanks to **Kairos#2656**!


#### 2. Error : connect ECONNREFUSED NODE_IP_ADDRESS:8888

![](https://snipboard.io/UgSMH2.jpg)

**How To Fix:**

Make sure your port **8888** is open, try to check it on [portchecker.co](https://portchecker.co/) , each vps will have different settings, usually you need to open the port using this command
```
sudo ufw allow 8888
```

else, make sure to open your port setting on your VPS provider dashboard

#### 3. Error: missing create.issuer ( type=name )

It means that you doesn't have Valued Smart Contract on your account, which you created on Task 3.

![](https://snipboard.io/aTBHL3.jpg)

To check if you have your CRUD Smart Contract on your account

```
cline get abi your_inery_account
```

Make sure that you have this output on **actions** key

![](https://snipboard.io/0vsnOq.jpg)









# Inery Json RPC 4.Görev
Inery Blockchain'de JSON RPC'yi çağırmak için örnek kod

## 🟢Bilgiler

JSON RPC Örnek kodu örnek dizinde mevcuttur, [example](https://github.com/herculessx/ineryjs/blob/master/example/) değiştirmeyi deneyebilir ve nasıl çalıştığını anlayabilirsiniz, ayrıca kodunuzu çalıştırabilmek ve değerli sözleşme işlevini çağırabilmek için Hesabınızda Değerli Akıllı Sözleşmeye (Görev 3) sahip olmanız gerekir.


## 🟢 Başlayın
Eski Nodejs kaldırın
<br>

```shell
sudo apt-get remove nodejs
```

Curl'ü yükleyin

```shell
sudo apt-get install curl
```

Curl'ü yükleyin

```shell
    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
```

     
## 🟢 NPM kurulumu

```shell
sudo apt install npm
```



## 🟢 Kurulum

* Repoyu klonlayın

   ```
   git clone https://github.com/herculessx/ineryjs.git
   ```

* Dizine Girin

   ```
   cd ineryjs
   ```

* NPM Paket kurun

   ```
   npm install
   ```

* Aşağıdaki Kod ile env-sample dosyasının ismini .env yapın 

   ```
   cp .env-sample .env
   ```

*  ```.env``` bilgileriniz düzenleyin

  ```
   nano .env
   ```

Burada açılan pencerede <br><br>

Aşağıdaki Bilgileri inery testnet Dashboard kısmında bulabilirsiniz.<br><br>

INERY_ACCOUNT="HESAP ADINIZ" <br>
PRIVATE_KEY="KEYİNİZ"<br>
NODE_URL="http://NODEİPADRESİ:8888" 
<br><br>

ctrl +X  Yes diyip çıkıyoruz.


<br>
<img src="https://raw.githubusercontent.com/herculessx/Q-Network-Testnet/main/env-duzenle.png" >

## 🟢 8888 port açma 

RPC Örneği Çalıştır

```
sudo ufw allow 8888
```

<br>

## 🟢 Çalıştırma

```
npm run rpc-example
```

* işlem çıktısı aşağıdaki gibi olmalı<br><br>
<img src="https://raw.githubusercontent.com/herculessx/Q-Network-Testnet/main/inery-okey.PNG" width="750">

<br>
https://explorer.inery.io/

![image](https://user-images.githubusercontent.com/101635385/205462705-21a45a65-86a8-46a3-9257-ebedc56e1dc6.png)



<br><br>
## 🟢 Hata Çözümleri

Serialization time limit 15000us exceeded<br>


* config.ini dosyanda max-transaction-time değerini 15000 olarak değiştir<br>

```
nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini
```

<img src="https://camo.githubusercontent.com/6036fa176fe713bfa7e8151aef13b77710b589c33dff2f7ae459d2b8785e0efc/68747470733a2f2f736e6970626f6172642e696f2f61306472474e2e6a7067" width="550">

<br><br>

* connect ECONNREFUSED<br>


```
sudo ufw allow 8888
```

<img src="https://camo.githubusercontent.com/d7bfd0c198035faa303e9a8b5714668384dd1d00a681b444718757b7a4872365/68747470733a2f2f736e6970626f6172642e696f2f5567534d48322e6a7067" width="550">


<br><br>

* missing create.issuer ( type=name )<br>
* Bu, hesabınızda Görev 3'te oluşturduğunuz Değerli Akıllı Sözleşme olmadığı anlamına gelir.
* Hesabınızda CRUD Akıllı Sözleşmenizin olup olmadığını kontrol etmek için

```
cline get abi ineryi-hesap-isminiz
```

<img src="https://camo.githubusercontent.com/35161f3c497c316d89925c7d1300ddaa78354daed4b783f615bd1561fd2bdba7/68747470733a2f2f736e6970626f6172642e696f2f615442484c332e6a7067" width="550">

* bu çıktıya sahip olduğunuzdan emin olun<br><br>

<img src="https://camo.githubusercontent.com/107661c26d281a09dcc3495a03f04ab90e90148f506479ad54f2d5df26e82150/68747470733a2f2f736e6970626f6172642e696f2f3076736e4f712e6a7067" width="550">
