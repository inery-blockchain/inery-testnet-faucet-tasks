import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE);
const account = "alter";
const actor = "alter";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey]);

const PushApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

const actionFunc = async (id, data, user) => {
  await PushApi.transact(
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
};

const readFunc = async (id) => {
  await PushApi.transact(
    {
      actions: [
        {
          account,
          name: "read",
          authorization: [
            {
              actor,
              permission: "active",
            },
          ],
          data: {
            id,
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
};

actionFunc(53112, "inery test for task4", account);
readFunc(53112);
