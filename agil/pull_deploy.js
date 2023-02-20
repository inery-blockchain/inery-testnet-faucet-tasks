const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const { account_ip, account_priv_key, account_name } = require('./pull_config.js');

const node_info = account_name
const rpc = new JsonRpc(account_ip);
const signatureProvider = new JsSignatureProvider([account_priv_key]);
const api = new Api({rpc,signatureProvider})

const doCreate = async (id, user, data) => {
     try{
         console.log(await api.transact({
                 actions:[
                     {
                         account:account_name,
                         name:"create",
                         authorization:[
                             {
                                 actor:node_info,
                                 permission:"active"
                             }
                         ],
                         data:{ id, user, data }
                     }
                 ]
         },{broadcast:true,sign:true}));
     }
     catch(error){
         console.error(error);
     }
};
const doDelete = async (id) => {
    try{
         console.log(await api.transact({
                 actions:[
                     {
                         account:account_name,
                         name:"destroy",
                         authorization:[
                             {
                                 actor:node_info,
                                 permission:"active"
                             }
                         ],
                         data:{ id }
                     }
                 ]
         },{broadcast:true,sign:true}));
     }
     catch(error){
         console.error(error);
     }
};

const doPush = async (id, user, data) => {
    await doCreate(id, user, data)
    await doDelete(id)
};

doPush(2000, account_name, "Example Push Transcantion Using RPC-API")
