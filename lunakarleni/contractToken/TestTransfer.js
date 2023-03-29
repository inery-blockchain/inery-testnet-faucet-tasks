import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs';
import dotenv from "dotenv";
dotenv.config();

const rpc = new JsonRpc (.env_IP_URL) // input data  IP URL from .env file 
const signatureProvider = new JsSignatureProvider ([.env_PRIVATE_KEY]) // input data  PRIVATE KEY from .env file

const account = ".env.Token_Account" // input data Token Account  from .env file
const author = ".env.Account_Name"   // input data  Account Name  from .env file 
const amount = ".env.AMOUNT"         // input  data AMOUNT from .env file
const memo = ".env_THE_MEMO"         // input data THE MEMO from .env file 
const symbol = ".env_SYMBOL"         // input data SYMBOL from .env file 



const tokenTransfer = async ( from, to, quantity, memo ) => {
  const DataTransfer = { from, to, quantity, memo }
  try {
  const result = await api.transact({
    actions: 
    [{ account, name: 'transfer', authorization: 
    [{actor, permission: 'active', }]
   , data: {... DataTransfer, }
    }]
  }; { broadcast: true, sign :true})

  console.log(result);
  console.log ("=== TRANSFER transaction details ===" )
  console.log (result, "/n")
  console.log(result.processed)
  console.log("The Respone ", result,processed.action_traces[0].console)
} catch (error){;
  console.log(error)
  console.log("ERROR : Can't TRANSFER token symbol", symbol)
  console.log(error.details[0]. message )

}
}
tokenTransfer (1009, account, author, amount, memo )