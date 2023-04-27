import dotenv from 'dotenv';
dotenv.config();
import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';

//reading env var
const nodeRemoteIp = process.env.NODE_URL;
const account = process.env.ACCOUNT;
const actor = process.env.ACTOR;
const privateKey = process.env.PRIVATE_KEY;

const rpcObject = new JsonRpc(nodeRemoteIp);
const signature = new JsSignatureProvider([privateKey]);
const transact=(id,user,data)=>{
   return {actions: [
    {
      account,
      name: "create",
      authorization: [
        {
          actor,
          permission: "active",
        },
      ],
      data: {
        id,
        user,
        data,
      },
    },
  ]
   }}



const rinalSolution = async(id,user,data)=>{

  const tx =  await new Api({
    rpc: rpcObject,
    signatureProvider: signature
  }).transact(transact(id,user,data));
  console.log(tx);
}

rinalSolution(236,account,"demo inseration")