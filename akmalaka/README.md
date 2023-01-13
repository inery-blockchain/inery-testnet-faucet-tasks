### Setting up the environment (Indonesian Language)
- Kloning repositori atau unduh skrip.
- Pastikan Update nodejs
- Instal dependensi dengan menjalankan npm install di terminal.
```shell
npm install
```
- Update file .env di direktori yang sama dengan skrip.

```shell
nano .env
```

Di file .env tersebut, tentukan variabel lingkungan berikut:

- NODE_URL: URL titik akhir HTTP API dari node EOS Anda.
- PRIVATE_KEY: Kunci pribadi akun yang akan menandatangani dan menyiarkan transaksi.

### Menjalankan skrip
Buka terminal dan navigasikan ke direktori tempat skrip berada.
Jalankan skrip dengan perintah berikut: 
```shell
npm run Solution_Create.mjs 
```
```shell
npm run Solution_Transaction.mjs
```

### Output
Jika skrip berjalan dengan sukses, Anda akan melihat objek transaksi yang ditandatangani dan output konsol dari tindakan pembuatan kontrak cerdas Inery atau tindakan transfer kontrak inery.token, bergantung pada skrip. Jika terjadi kesalahan, pesan kesalahan akan dicetak ke konsol.

```shell
(async () => {
  const result = await api.transact({
    actions: [{
      account: 'inery.token',
      name: 'transfer',
      authorization: [{
        actor: 'user1',
        permission: 'active',
      }],
      data: {
        from: 'user1',
        to: 'user2',
        quantity: '0.0001 INR',
        memo: ''
      }
    }]
  });
  console.log(result);
})();
```