Inery Json RPC 4.Görev
Inery Blockchain'de JSON RPC'yi çaðýrmak için örnek kod

??Bilgiler
JSON RPC Örnek kodu örnek dizinde mevcuttur, example deðiþtirmeyi deneyebilir ve nasýl çalýþtýðýný anlayabilirsiniz, ayrýca kodunuzu çalýþtýrabilmek ve deðerli sözleþme iþlevini çaðýrabilmek için Hesabýnýzda Deðerli Akýllý Sözleþmeye (Görev 3) sahip olmanýz gerekir.

?? Baþlayýn
Eski Nodejs kaldýrýn

sudo apt-get remove nodejs
Curl'ü yükleyin

sudo apt-get install curl
Curl'ü yükleyin

    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
?? NPM kurulumu
sudo apt install npm
?? Kurulum
Repoyu klonlayýn

git clone https://github.com/herculessx/ineryjs.git
Dizine Girin

cd ineryjs
NPM Paket kurun

npm install
Aþaðýdaki Kod ile env-sample dosyasýnýn ismini .env yapýn

cp .env-sample .env
.env bilgileriniz düzenleyin

 nano .env
Burada açýlan pencerede


Aþaðýdaki Bilgileri inery testnet Dashboard kýsmýnda bulabilirsiniz.


INERY_ACCOUNT="HESAP ADINIZ"
PRIVATE_KEY="KEYÝNÝZ"
NODE_URL="http://NODEÝPADRESÝ:8888"


ctrl +X Yes diyip çýkýyoruz.




?? 8888 port açma
RPC Örneði Çalýþtýr

sudo ufw allow 8888

?? Çalýþtýrma
npm run rpc-example
iþlem çýktýsý aþaðýdaki gibi olmalý




https://explorer.inery.io/
image




?? Hata Çözümleri
Serialization time limit 15000us exceeded

config.ini dosyanda max-transaction-time deðerini 15000 olarak deðiþtir
nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini





connect ECONNREFUSED
sudo ufw allow 8888





missing create.issuer ( type=name )
Bu, hesabýnýzda Görev 3'te oluþturduðunuz Deðerli Akýllý Sözleþme olmadýðý anlamýna gelir.
Hesabýnýzda CRUD Akýllý Sözleþmenizin olup olmadýðýný kontrol etmek için
cline get abi ineryi-hesap-isminiz


bu çýktýya sahip olduðunuzdan emin olun


