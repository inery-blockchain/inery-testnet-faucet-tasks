require("dotenv").config();
const { Api, JsonRpc, JsSignatureProvider } = require("ineryjs");
const fs = require("fs");
const url = process.env.INERY_NODE_RPC;
const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY;
const actor = process.env.FROM_ACCOUNT;
const quantity = process.env.AMOUNT;
const symbol = process.env.TOKEN_SYMBOL;
const memo = process.env.MEMO;
const turu = process.env.SLEEP;
const signature = new JsSignatureProvider([private_key]);
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});


async function transferBatch(){
  let sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
    let whitelist = fs.readFileSync("recipient.txt", "utf-8");
    let list = whitelist.split(/\r?\n/);
    for (let index = 0; index < list.length; index++) {
        const element = list[index];

    const result = await api.transact({
        actions: [{
          account: 'inery.token',
          name: 'transfer',
          authorization: [{
            actor: actor,
            permission: 'active',
          }],
          data: {
            from: actor,
            to: element,
            quantity: `${quantity} ${symbol}`,
            memo: memo
          }
        }]
      });
      console.log(result);    
      await sleep(sleep);
    }
} transferBatch();
