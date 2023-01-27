# TASK-4 : INERY-RPC-API-PUSH

Access root
```
apt-get install curl
```
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
apt-get install -y nodejs
```
```
mkdir task-inery
```
```
cd task-inery
```
```
git clone https://github.com/inery-blockchain/ineryjs.git
```
```
cd ineryjs
```
```
apt install npm
```
```
npm install dotenv
```
```
touch .env
```
```
nano .env
```
Paste Code
```
ACCOUNT="catsmile" // Replace Your Account Inery
KEY="[Input with Your Private Key]"
IP="http://[Input Your IP node]:8888"
```
CTRL x Yes

Open Port
```
ufw allow 8888
```
```
ufw enable
```
```
mkdir transaction
```
```
cd transaction
```
```
touch call.mjs
```
```
nano call.mjs
```
Paste Code
```

import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.IP

const json_rpc = new JsonRpc(url)
const private_key = process.env.KEY;

const account = process.env.ACCOUNT
const actor = process.env.ACCOUNT
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"create",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, user, data
                    }
                }
            ]
        },{broadcast:true,sign:true})
        console.log('****************************************************************************') 
        console.log('*                   ACCOUNT : catsmile                                     *')
        console.log('*                      TASK : Test RPC API push transaction                *') 
        console.log('****************************************************************************') 
        console.log(tx) 
        console.log(tx.processed.action_traces[0].console)
    }catch(error){
        console.log(error)
    }
}

create(5, account, "Create new Data via JSON RPC")

```
CTRL x yes
```
cd
```
```
cd task-inery/ineryjs
```
Execute:
```
node transaction/call.mjs
```
Transaction SUCCESS

![Capture](https://user-images.githubusercontent.com/85368621/214964253-85f707a4-01d8-4721-addc-c6af5edcffb1.PNG)

GO TO EXPLORER https://explorer.inery.io/  INPUT BLOCK TRANSACTION "4780366"
![BLOCK](https://user-images.githubusercontent.com/85368621/214965174-c5d6fe97-12ec-4ff3-9479-1038b6972eef.PNG)


Credit : catsmile100
