# Json RPC Sample for Task 4 Inery Blockchain
A Sample code to call JSON RPC on Inery Blockchain

## Getting Started

JSON RPC Sample code are available at [example](https://github.com/alteregogi/ineryjs/blob/master/example/) directory, you can try to modify and understand how it works, you also need to have Valued Smart Contract ( Task 3 ) in your Account, to able run your code and call the valued contract function.


### Prerequisites

- Your Favorite Code Editor
- Git
- [Node.Js](https://nodejs.dev/en/)

  - Ubuntu Installation Tutorial

    Remove Previous Nodejs

    ```
    sudo apt-get remove nodejs
    ```

    Install Curl

    ```
    sudo apt-get install curl
    ```

    Install NodeJS

    ```
    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
    ```

    

  - [Windows Installation](https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)

- npm

  - Ubuntu

  ```
  sudo apt install npm
  ```


### Installation

1. Clone the repo

   ```
   git clone https://github.com/alteregogi/ineryjs.git
   ```

2. Change directory to cloned repo

   ```
   cd ineryjs
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information



## Usage

Run RPC Example

```
npm run rpc-example
```



#### Successful Example

if you see similar error message after running ``npm run rpc-example``, it means your transaction has been executed on blockchain using JsonRPC
![](https://snipboard.io/JQ1hnc.jpg)

image credit : **Zyprexh#0331**

## FAQ

#### 1. Error : Serialization time limit 15000us exceeded:

![](https://snipboard.io/a0drGN.jpg)

**How To Fix:**

Change ``max-transaction-time`` to more than ``15000`` in your ``config.ini``
```shell
nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini
```

Thanks to **Kairos#2656**!


#### 2. Error : connect ECONNREFUSED NODE_IP_ADDRESS:8888

![](https://snipboard.io/UgSMH2.jpg)

**How To Fix:**

Make sure your port **8888** is open, try to check it on [portchecker.co](https://portchecker.co/) , each vps will have different settings, usually you need to open the port using this command
```
sudo ufw allow 8888
```

else, make sure to open your port setting on your VPS provider dashboard

#### 3. Error: missing create.issuer ( type=name )

It means that you doesn't have Valued Smart Contract on your account, which you created on Task 3.

![](https://snipboard.io/aTBHL3.jpg)

To check if you have your CRUD Smart Contract on your account

```
cline get abi your_inery_account
```

Make sure that you have this output on **actions** key

![](https://snipboard.io/0vsnOq.jpg)
