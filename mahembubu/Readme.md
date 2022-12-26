Inery Json RPC 4.Görev
Inery Blockchain'de JSON RPC'yi çağırmak için örnek kod

🟢Bilgiler
JSON RPC Örnek kodu örnek dizinde mevcuttur, example değiştirmeyi deneyebilir ve nasıl çalıştığını anlayabilirsiniz, ayrıca kodunuzu çalıştırabilmek ve değerli sözleşme işlevini çağırabilmek için Hesabınızda Değerli Akıllı Sözleşmeye (Görev 3) sahip olmanız gerekir.

🟢 Başlayın
Eski Nodejs kaldırın

sudo apt-get remove nodejs
Curl'ü yükleyin

sudo apt-get install curl
Curl'ü yükleyin

    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
🟢 NPM kurulumu
sudo apt install npm
🟢 Kurulum
Repoyu klonlayın

git clone https://github.com/herculessx/ineryjs.git
Dizine Girin

cd ineryjs
NPM Paket kurun

npm install
Aşağıdaki Kod ile env-sample dosyasının ismini .env yapın

cp .env-sample .env
.env bilgileriniz düzenleyin

 nano .env
Burada açılan pencerede


Aşağıdaki Bilgileri inery testnet Dashboard kısmında bulabilirsiniz.


INERY_ACCOUNT="HESAP ADINIZ"
PRIVATE_KEY="KEYİNİZ"
NODE_URL="http://NODEİPADRESİ:8888"


ctrl +X Yes diyip çıkıyoruz.

8888 port açma
RPC Örneği Çalıştır

sudo ufw allow 8888

🟢 Çalıştırma
npm run rpc-example
