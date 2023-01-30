import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE);
const account = "kiyotaka";
const actor = "kiyotaka";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey]);

const PushApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

async function action(id, data, account) {
  try {
    const ActionId = await PushApi.transact(
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
              user: account,
              data,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );
    console.log(ActionId);
  } catch (error) {
    console.log(error);
  }
}

async function actionUser(id, setAction) {
  try {
    const ActionId = await PushApi.transact(
      {
        actions: [
          {
            account,
            name: setAction,
            authorization: [
              {
                actor: account,
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
    );
    console.log(ActionId);
  } catch (error) {
    console.log(error);
  }
}

const main = async () => {
  console.log("running");
  await action(5312, "test", account);
  await actionUser(5312, "read");
  await actionUser(5312, "destroy");
};

main();
