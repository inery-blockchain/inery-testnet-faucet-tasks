# Task 4 Inery Blockchain için Json RPC Örneği
Inery Blockchain görevi 4'te JSON RPC'yi çağırmak için örnek bir kod

## çoktan başladık

JSON RPC örnek kodu [example] dizininde(https://github.com/altaregogi/ineryjs/blob/master/example/) mevcuttur, değiştirmeyi deneyebilir ve nasıl çalıştığını anlayabilirsiniz, ayrıca Valued Smart'a sahip olmalısınız Kodunuzu çalıştırabilmek ve değerli sözleşme işlevlerini çağırabilmek için Hesabınızdaki Sözleşme (Görev 3) ve görev 4'e ilerlemek için ana düğümü (görev 1) etkinleştirmeniz ve kendi para biriminizi oluşturmanız ve birine aktarmanız (görev 2) gerekir.
### Devam etmek için ön koşullar

- Favori Kod Düzenleyiciniz
- Git
- [Node.Js](https://nodejs.dev/en/)

  - Ubuntu Kurma Eğitimi
  Önceki Nodej'lerin Kaldırılmasını gerçekleştirin
  
  ```
  sudo apt-get remove nodejs
  ```
  
  Curl'ü yükleyin
  
  ```
  sudo apt-get install curl
  ```
  
  NodeJS'yi yükleyin
  
  ```
  curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
  sudo apt-get install -y nodejs
  ```
  
  
  
  - [Windows Installation] (https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)
  
- npm

  - Ubuntu

```
sudo apt install npm
```


### Kurulum

1. depoyu klonla

```
git clone https://github.com/ineryaccname/ineryjs.git
```

2. Dizini klonlanmış depoya değiştir

```
cd ineryjs
```

3. NPM paketlerini kurun

```
npm install
```

4. kopyala `.env-sample` ve yeniden adlandır `.env`

```
cp .env-sample .env
```

5. Düzenle ```.env``` bilgilerinizle dosyalayın



## kullanım

RPC örneğini çalıştır

```
npm run rpc-example
```



#### geçerli örnek

``npm run rpc-example`` komutunu çalıştırdıktan sonra benzer bir hata mesajı görürseniz, bu, işleminizin blockchain üzerinde JsonRPC kullanılarak yürütüldüğü anlamına gelir.


