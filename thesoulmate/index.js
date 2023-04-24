import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";

interface TransactionData {
  id: number;
  user: string;
  details: object;
}

async function createTransaction(
  data: TransactionData,
  rpcUrl: string,
  account: string,
  actor: string,
  privateKey: string
) {
  const rpc = new JsonRpc(rpcUrl);
  const signatureProvider = new JsSignatureProvider([privateKey]);
  const api = new Api({ rpc, signatureProvider });

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

dotenv.config();

const rpcUrl = process.env.URL_NODE!;
const account = "thesoulmate";
const actor = "thesoulmate";
const privateKey = process.env.PRIVATE_KEY;

createTransaction(
  {
    id: 23,
    user: actor,
    details: { name: "thesoulmate", ineryaccount: "thesoulmate" }
  },
  rpcUrl,
  account,
  actor,
  privateKey
);
