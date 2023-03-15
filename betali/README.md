1. Install Python
```
sudo apt-get update
sudo apt-get install python3
sudo apt-get install python3-pip
```
2. Clone ineryjs
3. Buat nama proyek dengan nama akun inery
```
mkdir namaproyek
cd namaproyek
```
4. Install ineryjs dan pustaka yang diperlukan dengan menggunakan perintah berikut di terminal:
```
npm install $HOME/ineryjs dotenv
npm install
npm init -y
```
5. Buat file .env dan simpan konfigurasi lingkungan dengan menambahkan informasi seperti URL node, kunci pribadi, dan nama akun seperti yang ditunjukkan dalam kode Smart Contract.

6. Buat file Python baru dengan nama `ineryrpc.py` dan salin kode Smart Contract ke dalam file tersebut.

7. Impor pustaka yang diperlukan dan buat objek Api pada file ineryrpc.py. Anda juga dapat mengambil informasi dari file .env untuk memasukkan kredensial Inery Blockchain. Contoh kode untuk membuat objek Api sebagai berikut:
```
from ineryjs import Api, JsonRpc, JsSignatureProvider
from dotenv import load_dotenv
import os

load_dotenv()

rpc = JsonRpc(os.getenv("NODE_URL"))
signature_provider = JsSignatureProvider([os.getenv("PRIV_KEY")])
api = Api({"rpc": rpc, "signatureProvider": signature_provider})
account = os.getenv("ACCOUNT")
```
8. Setelah objek `Api` dibuat, Anda dapat menggunakan perintah `api.transact` untuk membuat, membaca, memperbarui, dan menghapus data pada blockchain. Contoh kode untuk membuat data pada blockchain sebagai berikut:
```
async def create_data():
    try:
        await api.get_abi(account, True)
        result = await api.transact({
            "actions": [
                api.with_(account).as_(account).create(id, account, data)
            ]
        })
        print(result["processed"]["action_traces"][0]["act"]["name"])
        print(result["processed"]["action_traces"][0]["console"])
        print(result["processed"]["action_traces"][0])
    except Exception as e:
        print(e)

```
9. Panggil fungsi create_data() atau fungsi-fungsi lainnya yang telah dibuat pada file ineryrpc.py untuk membuat, membaca, memperbarui, atau menghapus data pada blockchain.

10. Jalankan aplikasi dengan menggunakan perintah `python3 ineryrpc.py` di terminal.
```
python3 ineryrpc.py
```
Dengan demikian, Anda dapat membuat RPC Push Transaction pada Inery Blockchain menggunakan Python.




