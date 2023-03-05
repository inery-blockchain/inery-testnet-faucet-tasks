import { Api, JsonRpc, JsSignatureProvider } from "ineryjs"

const url = "https://tas.blockchain-servers.world/";
const rpc = new JsonRpc(url);
const private_key = `${process.env.REACT_APP_PRIVATE_KEY}`;
const signatureProvider = new JsSignatureProvider([private_key]);

export default class Transaction {
  constructor() {
    this.contractName = 'kbwp';
    this.contractSender = 'kbwp';

    this.inery = new Api({
      rpc,
      signatureProvider
    })
  }

  getTableRows = table => {
    return rpc.get_table_rows({json: true, code: this.contractSender, scope: this.contractName, table});
  };

  transaction = (action, data) => {
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
