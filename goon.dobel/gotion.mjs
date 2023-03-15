import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
const url= "https://198.211.105.127:8888" // input your node url or ip


const rpc = new JsonRpc(url);
const user1PrivateKey = "YOUR_PRIVATE_KEY"; // input your private key 
const account = goon.dobel
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

// Calling API
const api = new Api({ rpc: json_rpc,signatureProvider: signature})

const goTransaction = async (id, user, data){
    const goData = { id, user, data }
    try{
        const tx = await api.transact
        ({ actions:[{ account,name:"create",authorization:
        [{ actor,permission:"active" }], data: {...goData}}]
        },
        
        {broadcast:true,sign:true})

        console.log(=== TRANSACTION DETAILS ====)
        console.log(tx, "\n") 
        console.log(tx.processed.action_traces[0].console)
    } catch(error){
        console.log(error)
    }
} ; 

const read = async (id){
    try{
        const tx = await api.transact
        ({ actions:[{ account,name:"read",authorization:
        [{ actor,permission:"active" }], data: {id}}]
        },
        
        {broadcast:true,sign:true})

        console.log(=== READ DETAILS ====) 
        console.log(tx, "\n")
        console.log(tx.processed.action_traces[0].console)
    } catch(error){
        console.log(error)
    }
};

const update = async ( id, user ){
    try{
        const tx = await api.transact
        ({ actions:[{ account,name:"update",authorization:
        [{ actor,permission:"active" }], data: { id, user }}]
        },
        
        {broadcast:true,sign:true})

        console.log(=== UPDATE  DETAILS ====)
        console.log(tx, "\n")
        console.log(tx.processed.action_traces[0].console)
    } catch(error){
        console.log(error)
    }
};

const destroy = async (id){
    try{
        const tx = await api.transact
        ({ actions:[{ account,name:"destroy",authorization:
        [{ actor,permission:"active" }], data: {id}}]
        },
        
        {broadcast:true,sign:true})

        console.log(=== DESTROY DETAILS ====) 
        console.log(tx, "\n")
        console.log(tx.processed.action_traces[0].console)
    } catch(error){
        console.log(error)
    }
};

async function goTransaksi (id, user, data){
    await goData(id, user, data)
    await read(id)
    await update(id, data)
    await destroy(id)
}

    goTransaction ( 27000, account, " Push Transaction RPC API on  Inery Blockchain by goon.dobel " )
