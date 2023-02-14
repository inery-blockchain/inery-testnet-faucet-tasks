# Inery testnet faucet tasks

This is the base branch for tasks related to the Inery faucet. For each task that requires revision using GitHub, we will create a new branch named with the number of that task, such as 'task4', 'task5', etc.

## Getting Started

To verify the quality of your code, you will need to clone the specific branch of the project and submit the required changes for that task. After making the necessary changes, you can create a pull request to submit your work for review. If the work is satisfactory, it will be approved. If there are any issues with the work, it may be labeled with specific comments indicating what needs to be improved or modified. It is important to carefully review and address any feedback provided in order to improve the quality of your work.





 Task 4 Inery Blockchain'in devamı

### 1. Inery_Account Name yerine kendi Inery Account Name'inizi yazın

```
cd
IneryAccname=Inery_Account Name
```
```
export PATH="$PATH:$HOME/inery.cdt/bin:$HOME/inery-node/inery/bin"
```

### 2. Inery testnet faucet task reposunu forkluyoruz

Sayfaya Gidin :
https://github.com/inery-blockchain/inery-testnet-faucet-tasks

![task 1](https://user-images.githubusercontent.com/107887745/209412604-5e65d484-627c-4f24-a99e-dcc4b832b4d9.png)


![task 2](https://user-images.githubusercontent.com/107887745/209412670-92d62a34-609e-486e-8427-6222b3be3f0a.png)


![task 3](https://user-images.githubusercontent.com/107887745/209412744-11f6f3a7-67d6-4aa3-9bc4-07be0bad16e9.png)


### 3. En son resimde kopyaladığınız bağlantıyı aşağıda inery kurulu olan sunucuya girin
```
cd
git clone kopyaladığınız bağlantı linki
```

#### 4. Proje dizinleri oluşturun
```
cd ~/inery-testnet-faucet-tasks
mkdir IneryAccname
```

### 5. Çalıştır Komutu ile build-web çalıştırın

```
cd ~/ineryjs
npm run build-web
```
![task 4](https://user-images.githubusercontent.com/107887745/209413181-9545307a-139a-4c3c-b612-4735eeb11f2a.png)


### 6. Web sitesi Klasörünü Projeye kopyalayın
```
cp -r $HOME/ineryjs/dist-web/ $HOME/inery-testnet-faucet-tasks/$IneryAccname/dist-web/
```

### 7. Proje Dizinine gidin ve bir html dosyası oluşturun kodları tek tek girin
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano index.html
```
<p align="center">
  <img src="https://github.com/ArumaSanjayani/Images/blob/main/ip.png">
</p>

##### 8. Aşağıdaki KODU girin ve IP'nizi değiştirmeyi ve <> işaretini kaldırmayı unutmayın çıkarken ctrl + x + y enter 
```
<script src="./dist-web/inery-jsonrpc.min.js"></script>
<script src="./dist-web/inery-api.min.js"></script>
<script src="./dist-web/inery-jssig.min.js"></script>
<script>
    (async()=>{
        const rpc=new ineryjs_jsonrpc.JsonRpc("https://<IPmu>:8888");
        console.log(await rpc.get_info());
    })();
</script>
```
### 9. İNERY 4. GÖREV İÇİN BİR REHBER HAZIRLAYIN 
##### NOT = REHBERİ OLAN BİRİNDEN YAPABİLİRSİNİZ
```
cd ~/inery-testnet-faucet-tasks/$IneryAccname
nano README.md
```

### 10. Görevi Github'a Bağlayın sonda şifre isterse rehberin sonunda nasıl alacağınızı yazdım
```
cd ~/inery-testnet-faucet-tasks/
```
```
git add $IneryAccname/
```
```
git add .
```
```
git commit -m "task 4 solution inery : $IneryAccname"
```
```
git branch -M main
```
```
git push -u origin main
```

### 11. Github'a tekrar geri dönün
1. ikinci adımda yapılan sayfayı yenileyin
![task6](https://user-images.githubusercontent.com/107887745/209413858-6aa011e5-5291-4e6e-987b-64fe75086485.png)


2. Çekme istekleri oluşturma
<p align="center">
  <img src="https://github.com/ArumaSanjayani/Images/blob/main/merge2.png">
  
  ![task7](https://user-images.githubusercontent.com/107887745/209414525-83eff6db-3e58-4628-9fbc-46549cbdfc78.png)


3. Sonuçları kontrol et pull request kısmında ismin çıktıysa tamamdır
https://github.com/inery-blockchain/inery-testnet-faucet-tasks
![task8](https://user-images.githubusercontent.com/107887745/209416620-c8ae4402-bb50-40dd-89b5-c5242fa723e7.png)




## Not = 10. adımda şifre soruyorsa  github'a bağlanamıyorsanız  aşağıdaki adımları yaparak şifreyi alabilirsiniz

![task10](https://user-images.githubusercontent.com/107887745/209414889-baf3559f-3649-409e-baea-a668a01289d2.png)


<p align="center">
  <img src="https://github.com/ArumaSanjayani/Images/blob/main/setting2.png">
</p>

<p align="center">
  <img src="https://github.com/ArumaSanjayani/Images/blob/main/token.png">
</p>

<p align="center">
  <img src="https://github.com/ArumaSanjayani/Images/blob/main/token2.png">
</p>

<p align="center">
  <img src="https://github.com/ArumaSanjayani/Images/blob/main/simpan.png">
</p>
