const {JsonRpc,JsSignatureProvider,Api}=require("ineryjs");
const rpc=new JsonRpc("https://myurl");
const signatureProvider=new JsSignatureProvider(["private key 1"]);
const api=new Api({rpc,signatureProvider});

 try{
     console.log(await api.transact({
             actions:[
                 {
                     account:"account_name",
                     name:"action_name",
                     authorization:[
                         {
                             actor:"actor_name",
                             permission:"actor_permission"
                         }
                     ],
                     data:{
                      ...data
                     }
                 }
             ]
     },{broadcast:true,sign:true}));
 }
 catch(error){
     console.error(error);
 }
