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

async function readData(uint256 id) public returns (string memory) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("read(uint256)", id);
    bytes memory response = in3.send(IN3.IN3_RPC_URL, encoded);
    (bool success, bytes memory result) = abi.decode(response, (bool, bytes));
    if (success) {
        return abi.decode(result, (string));
    } else {
        return "";
    }
}
