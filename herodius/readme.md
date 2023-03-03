# Json RPC Sample for Task 4 Inery Blockchain
A Sample code to call JSON RPC on Inery Blockchain

## Getting Started

JSON RPC Sample code are available at [herodius](lalala) directory, you can try to modify and understand how it works, you also need to have Valued Smart Contract ( Task 3 ) in your Account, to able run your code and call the valued contract function.


### Install Dependencies

sudo apt update -y && sudo apt upgrade -y
sudo apt install -y make bzip2 automake libbz2-dev libssl-dev doxygen graphviz libgmp3-dev \
autotools-dev libicu-dev python2.7 python2.7-dev python3 python3-dev \
autoconf libtool curl zlib1g-dev sudo ruby libusb-1.0-0-dev \
libcurl4-gnutls-dev pkg-config patch llvm-7-dev clang-7 vim-common jq libncurses5 git


### Create Contract CRUD

1. Make Folder

   ```
   mkdir -p $HOME/inrcrud
   ```

2. Create

```
sudo tee $HOME/inrcrud/inrcrud.cpp >/dev/null <<EOF
#include <inery/inery.hpp>
#include <inery/print.hpp>
#include <string>

using namespace inery;

using std::string;

class [[inery::contract]] inrcrud : public inery::contract {
  public:
    using inery::contract::contract;


        [[inery::action]] void create( uint64_t id, name user, string data ) {
            records recordstable( _self, id );
            auto existing = recordstable.find( id );
            check( existing == recordstable.end(), "record with that ID already exists" );
            check( data.size() <= 256, "data has more than 256 bytes" );

            recordstable.emplace( _self, [&]( auto& s ) {
               s.id         = id;
               s.owner      = user;
               s.data       = data;
            });

            print( "Hello, ", name{user} );
            print( "Created with data: ", data );
        }

         [[inery::action]] void read( uint64_t id ) {
            records recordstable( _self, id );
            auto existing = recordstable.find( id );
            check( existing != recordstable.end(), "record with that ID does not exist" );
            const auto& st = *existing;
            print("Data: ", st.data);
        }

        [[inery::action]] void update( uint64_t id, string data ) {
            records recordstable( _self, id );
            auto st = recordstable.find( id );
            check( st != recordstable.end(), "record with that ID does not exist" );


            recordstable.modify( st, get_self(), [&]( auto& s ) {
               s.data = data;
            });

            print("Data: ", data);
        }

            [[inery::action]] void destroy( uint64_t id ) {
            records recordstable( _self, id );
            auto existing = recordstable.find( id );
            check( existing != recordstable.end(), "record with that ID does not exist" );
            const auto& st = *existing;

            recordstable.erase( st );

            print("Record Destroyed: ", id);

        }

  private:
    struct [[inery::table]] record {
       uint64_t        id;
       name     owner;
       string          data;
       uint64_t primary_key()const { return id; }
    };

    typedef inery::multi_index<"records"_n, record> records;
 };
EOF
   ```

3. Compile

   ```
   cd inrcrud
cd; source .bashrc; cd -
inery-cpp -abigen -o inrcrud.wasm inrcrud.cpp
   ```

4. Set Contract

   ```
cline set contract AccountName ./
   ```

5. Unlock Wallet
   ```
cline wallet unlock -n AccountName --password urpassword
   ```
if error like this
https://580801350-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FI3uyPQUnfzoZEU60Wqmq%2Fuploads%2FVyXkM7dwv8plllwRnZy7%2F344_1.png?alt=media&token=e5146d74-719f-4b61-9eae-ec180bf5ffce
image credit : BeritaCryptooimage credit : BeritaCryptoo

6. Edit config.ini

   ```
   cd ~/inery-node/inery.setup/master.node/blockchain/config
   nano config.ini
   ```

change "max-transaction-time" from 15000 to 30000
https://580801350-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FI3uyPQUnfzoZEU60Wqmq%2Fuploads%2FFsiKJbdQ9usprckSu8Pv%2F344.png?alt=media&token=510a6b66-d960-4281-8068-06cb553ced7a
image credit : BeritaCryptoo

SAVE

## Install Nodejs

Install NodeJs

```
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

## Clone Repo

Clone Repo

```
cd
git clone https://github.com/alteregogi/ineryjs.git
cd ineryjs
npm install
```

## Copy and Edit file .env

```
cp .env-sample /root/ineryjs/.env
nano .env
```

change to your VPS IP

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
