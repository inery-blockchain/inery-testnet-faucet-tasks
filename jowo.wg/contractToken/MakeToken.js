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



const MakeToken = async ( issue, maximum_supply ) => {
  const TheData = { issue, maximum_supply }
  try {
  const result = await api.transact({
    actions: 
    [{ account, name: 'transfer', authorization: 
    [{actor, permission: 'active', }]
   , data: {... TheData, }
    }]
  }; { broadcast: true, sign :true})

  console.log(result);
  console.log ("=== MAKE TOKEN  transaction details ===" )
  console.log (result, "/n")
  console.log(result.processed)
  console.log("The Respone ", result,processed.action_traces[0].console)
} catch (error){;
  console.log(error)
  console.log("ERROR : Can't MAKE TOKEN token symbol", symbol)
  console.log(error.details[0]. message )

}
}
MakeToken(1009, author, amount,)