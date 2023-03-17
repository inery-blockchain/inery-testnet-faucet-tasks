const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const { inery_url, inery_private_key, inery_account } = require('./inery_config.js');

const inery_actor = inery_account
const rpc = new JsonRpc(node_url);
const signatureProvider = new JsSignatureProvider([node_private_key]);
const api = new Api({rpc,signatureProvider})

const doCreate = async (id, user, data) => {
     try{
         console.log(await api.transact({
                 actions:[
                     {
                         account:inery_account,
                         name:"create",
                         authorization:[
                             {
                                 actor:inery_actor,
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
                         account:inery_account,
                         name:"destroy",
                         authorization:[
                             {
                                 actor:inery_actor,
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

doPush(2000, inery_account, "Example Push Transcantion Using RPC-API")
