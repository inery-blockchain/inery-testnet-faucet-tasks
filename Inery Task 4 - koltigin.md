## Görev 4: RPC API push transaction
**RPC API gönderme işlemi**

## Bilgi

JSON RPC Örnek kodu [örnek](https://github.com/herculessx/ineryjs/blob/master/example/) dizinde mevcuttur, değiştirmeyi deneyebilir ve nasıl çalıştığını anlayabilirsiniz, ayrıca kodunuzu çalıştırabilmek ve akıllı sözleşme işlevini çağırabilmek için Hesabınızda Akıllı Sözleşmeye ([Görev 3](https://github.com/koltigin/Inery-Node-Kurulum-Rehberi/blob/main/G%C3%B6rev-3.md)) sahip olmanız gerekir.

Başlamdan önce [IneryJS](https://github.com/inery-blockchain/ineryjs) reposunu forklayın. Dosya içerisine example dosyası açın ve benim repomdaki gibi dosyaları oluşturun. Daha sonra ana dizinde yine örnek `.env` dosyasını oluşturun. Böylece kurulumu kendi reponuz ile yapabilirsiniz.

## Eski Nodejs Kaldırma

```shell
apt-get remove nodejs
```

## Curl Kütüphanesi Yükleme

```shell
apt-get install curl
```

## Nodejs Yükleme

```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
apt-get install -y nodejs
```
     
## NPM Kurulumu

```shell
apt install npm
```

## Kurulum

### Repoyu Klonlama

```
git clone https://github.com/koltigin/ineryjs.git
```

### Dizine Geçme

```
cd ineryjs
```

### NPM Paket Kurulumu

```
npm install
```

### `.env-sample` Dosyasını Kopyalama

```
cp .env-sample .env
```

### `.env` Bilgilerini Düzenleme
```
nano .env
```

## 8888 Port Açma 

```
sudo ufw allow 8888
```

## RPC Örneği Çalıştırma

```
npm run rpc-example
```

🔴 **İşlem çıktısı aşağıdaki gibi olmalıdır;***
```
> ineryjs@1.0.0 rpc-example
> node ./example/json-rpc.mjs

{
  transaction_id: 'c59d3b67482f6551b9b11b24ce7b6f2da59aad91c0f79617af338e9da83f80e8',
  processed: {
    id: 'c59d3b67482f6551b9b11b24ce7b6f2da59aad91c0f79617af338e9da83f80e8',
    block_num: 1147209,
    block_time: '2022-12-03T13:56:37.000',
    receipt: { status: 'executed', cpu_usage_us: 2147, net_usage_words: 18 },
    elapsed: 2147,
    net_usage: 144,
    scheduled: false,
    action_traces: [ [Object] ],
    failed_dtrx_trace: null
  }
}
```

🔴 **İşlemleri gerçekleştirdikten sonra kullanıcı paneline giderek `RPC API push transaction` başlıklı dördüncü görevi onaylayınız.**
