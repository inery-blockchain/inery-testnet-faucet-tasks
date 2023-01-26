import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE);
const account = "ayanokouji";

const actor = "ayanokouji";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey]);

const ineryApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

async function Push(id, data, user) {
  await ineryApi
    .transact(
      {
        actions: [
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
        ],
      },
      { broadcast: true, sign: true }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

Push(120, "testing inery task 4", account);
