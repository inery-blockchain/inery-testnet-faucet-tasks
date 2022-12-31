## Görev 4: RPC API push transaction

## Eski Nodejs Kaldırma
```shell apt-get remove nodejs ```

## Curl Kütüphanesi Yükleme
```shell apt-get install curl ```

## Nodejs Yükleme
```shell curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash 
- &&\
apt-get install -y nodejs ```
     
## NPM Kurulumu
```shell apt install npm ```

## Kurulum

### Repoyu Klonlama
``` git clone https://github.com/aslanbayramov/ineryjs.git ```

### Dizine Geçme
``` cd ineryjs ```

### NPM Paket Kurulumu
``` npm install ```

### `.env-sample` Dosyasını Kopyalama
``` cp .env-sample .env ```

### `.env` Bilgilerini Düzenleme
``` nano .env ``` 

``` INERY_ACCOUNT="bayramov"
PRIVATE_KEY="$KEY"
NODE_URL="http://5.75.228.144:8888" ```

## 8888 Port Açma
``` sudo ufw allow 8888 ```

## RPC Örneği Çalıştırma
``` npm run rpc-example ```

 🔴 **İşlem çıktısı aşağıdaki gibi 
olmalıdır;*** ```
> ineryjs@1.0.0 rpc-example node ./example/json-rpc.mjs
{ transaction_id: 
  'c59d3b67482f6551b9b11b24ce7b6f2da59aad91c0f79617af338e9da83f80e8', 
  processed: {
    id: 
    'c59d3b67482f6551b9b11b24ce7b6f2da59aad91c0f79617af338e9da83f80e8', 
    block_num: 1147209, block_time: '2022-12-03T13:56:37.000', receipt: 
    { status: 'executed', cpu_usage_us: 2147, net_usage_words: 18 }, 
    elapsed: 2147, net_usage: 144, scheduled: false, action_traces: [ 
    [Object] ], failed_dtrx_trace: null
  }
}
```

 🔴 **İşlemleri gerçekleştirdikten sonra kullanıcı paneline giderek 
`RPC API push transaction` başlıklı dördüncü görevi onaylayınız.**
