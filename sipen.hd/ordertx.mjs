import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

// Please input yours detail account from .env 
const url = "http://165.227.141.118:8888"; 
const json_rpc = new JsonRpc(url);
const private_key = process.env.YOUR_ACCOUNT_PRIVATE_KEY;  // input your private key on here 

const account = "sipen.hd"; // input your account name 
const signature = new JsSignatureProvider([private_key]);

// Request API
const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
});

// Order Transaction ( input or create new data )

const orderTransaction = async (id, user, data) => {
    const Real_Data = { id, user, data };
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
                    ...Real_Data }}]},{broadcast: true, sign: true},
        );

        console.log("#######-ORDER TRANSACTION DETAIL-####")
                    console.log("#######")
                    console.log(Trx, "\n")
                    console.log("The Respone data:", Trx.processed.action_traces[0].console)
                    console.log("\n")
                }catch(error){
                    console.log(error)
                }
            }

orderTransaction(10900, account, " Crud test transaction on JSON RPC by sipenhd ")
