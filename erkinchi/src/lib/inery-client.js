import { Api, JsonRpc, JsSignatureProvider } from "ineryjs"
import fetch from "node-fetch"
import { TextDecoder, TextEncoder } from "text-encoding"


const url = "https://tas.blockchain-servers.world/";
const rpc = new JsonRpc(url, { fetch });
const private_key = `${process.env.REACT_APP_PRIVATE_KEY}`;
const signatureProvider = new JsSignatureProvider([private_key]);


export default class IneryClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName;
    this.contractSender = contractSender;

    this.inery = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    })
  }

  getTableRows = table => {
    return rpc.get_table_rows({json: true, code: this.contractSender, scope: this.contractName, table});
  };

  transaction = (action, data) => {
    console.log(data)
    return this.inery.transact({
      blocksBehind: 3,
      expireSeconds: 30,
      actions: [
        {
          account: this.contractSender,
          name: action,
          authorization: [
            {
              actor: this.contractSender,
              permission: 'active'
            }
          ],
          data: {
            ...data
          }
        }
      ]
    });
  };
}
