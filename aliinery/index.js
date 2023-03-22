import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey]);

const json_rpc = new JsonRpc(process.env.URL_NODE);

const account = "aliinery";
const actor = "aliinery";

const pushApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

async function createTransaction(actionName, id, user, data) {
  try {
    const tx = await pushApi.transact({
      actions: [
        {
          account,
          name: actionName,
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
    },{ broadcast: true, sign: true });

    console.log(tx);
    console.log(tx.processed.action_traces[0].console);
  } catch (error) {
    console.log(error);
  }
}

const main = async () => {
  await createTransaction("createData", 5, account, "newdata");
  await createTransaction("createTx", 5, account, "createtx");
};

main();
