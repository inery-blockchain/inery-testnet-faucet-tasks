import { Api, JsonRpc, RpcError, JsSignatureProvider } from '../dist/index.js'
#const {JsonRpc,JsSignatureProvider,Api}=require("ineryjs");
const rpc=new JsonRpc("http://115.79.196.38:8888");
const signatureProvider=new JsSignatureProvider(["5J76AWzhss3DP2VfmfP9N8SmUQuz6aoS7sWchoGNErmPfbzv3MG"]);
const api=new Api({rpc,signatureProvider});

 try{
     console.log(await api.transact({
             actions:[
                 {
                     account:"thanhtamdc",
                     name:"transfer",
                     authorization:[
                         {
                             actor:"thanhtamdc",
                             permission:"active"
                         }
                     ],
                     data:{
                      from: 'thanhtamdc',
					  to: 'inery',
					  quantity: '1.0000 TAMDC',
					  memo: ''
                     }
                 }
             ]
     },{broadcast:true,sign:true}));
 }
 catch(error){
     console.error(error);
 }
