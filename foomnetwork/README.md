# **HOW TO FIX PROBLEM JSON RPC IN TASK 4 INERY**


## :bulb: NOTE

 JSON RPC Sample code is available in the sample directory, you can try to modify it and understand how it works, you also need to have Value Smart Contract (Task 3) in your Account to be able to run your code and call the valuable contract function.

## :one: First Step
You Remove old Nodejs
<br>


```shell
sudo apt-get remove nodejs
```

Install Curl

```shell
sudo apt-get install curl
```

```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

     
## :two: Required Install NPM
```shell
sudo apt install npm
```



## :three: Prepare Repo

* Cloning Repo from official inery

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

* Change Directory

   ```
   cd ineryjs
   ```

* Install NPM Package

   ```
   npm install
   ```

* Rename  env-sample file to .env 

   ```
   cp .env-sample .env
   ```

*  ```.env``` edit with your information

  ```
   nano .env
   ```

check information your account from inery Dashboard.<br><br>

INERY_ACCOUNT="YOUR_INERY-ACCOUNT" <br>
PRIVATE_KEY="PRIVATE_KEY"<br>
NODE_URL="http://IP-VPS:8888" 
<br><br>

and then
ctrl +X  Yes



## :four: Open Port 8888 

RUN RPC EXAMPLE

```
sudo ufw allow 8888
```

<br>

## :five: Run this comand

```
npm run rpc-example
```




<br><br>
## :white_check_mark: FIX error solution

Serialization time limit 15000us exceeded<br>


* Change max-transaction-time to 15000 in your config.ini file<br>

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
* This means that your account does not have the Value Smart Contract you created in Task 3.
* check if you have CRUD Smart Contract in your account

```
cline get abi your_inery_account
```

<img src="https://camo.githubusercontent.com/35161f3c497c316d89925c7d1300ddaa78354daed4b783f615bd1561fd2bdba7/68747470733a2f2f736e6970626f6172642e696f2f615442484c332e6a7067" width="550">

* Make sure output like this<br><br>

<img src="https://camo.githubusercontent.com/107661c26d281a09dcc3495a03f04ab90e90148f506479ad54f2d5df26e82150/68747470733a2f2f736e6970626f6172642e696f2f3076736e4f712e6a7067" width="550">
