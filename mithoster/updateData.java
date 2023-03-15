import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs'
import * as dotenv from 'dotenv'
dotenv.config()

const rpc = new JsonRpc(process.env.NODE_URL)
const signatureProvider = new JsSignatureProvider([process.env.PRIV_KEY])
const api = new Api({ rpc, signatureProvider })
const account = process.env.ACCOUNT
const id = 1000
const data = "INERY JSON-RPC CRUD push transaction"

await api.getAbi(account, true)

async function updateData(uint256 id, string memory data) public returns (bool) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("update(uint256,string)", id, data);
    in3.sendTransaction(IN3.IN3_RPC_URL, encoded);
    return true;
}
