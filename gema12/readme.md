PushTransaction

PushTransaction adalah sebuah skrip Python yang membantu mengirim transaksi ke blockchain EOS. Skrip ini menggunakan library eospy untuk berkomunikasi dengan API node EOS.

Prasyarat

Python 3.x

Library eospy

Kunci pribadi yang memiliki akses active untuk akun yang akan mengirim transaksi

Instalasi

Untuk menggunakan skrip ini, pertama-tama Anda harus menginstall library eospy:

Copy code

pip install eospy

Kemudian, simpan skrip push_transaction.py pada direktori Anda dan sertakan kunci pribadi Anda pada variabel private_key di dalam skrip.

Penggunaan

Untuk menggunakan skrip ini, jalankan perintah berikut di terminal:

Copy code

python push_transaction.py

Skrip akan membuat transaksi baru dan menghapus transaksi yang sama segera setelah itu. Hasil dari transaksi akan dicetak pada layar.
