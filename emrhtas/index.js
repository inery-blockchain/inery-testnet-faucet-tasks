import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";

dotenv.config();

const rpc = new JsonRpc(process.env.URL_NODE!);
const account = "emrhtas";
const actor = "emrhtas";
const privateKey = process.env.PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({
  rpc,
  signatureProvider,
});

interface TransactionData {
  id: number;
  user: string;
  details: object;
}

async function createTransaction(data: TransactionData) {
  try {
    const response = await api.transact(
      {
        actions: [
          {
            account,
            name: "create",
            authorization: [
              {
                actor,
                permission: "active"
              }
            ],
            data
          }
        ]
      },
      { broadcast: true, sign: true }
    );

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

createTransaction({
  id: 23,
  user: actor,
  details: { name: "emrhtas", ineryaccount: "emrhtas" }
});