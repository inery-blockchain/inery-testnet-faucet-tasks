import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";

dotenv.config();

const URL_NODE = process.env.URL_NODE!;
const ACCOUNT = "yusufinery";
const ACTOR = "yusufinery";
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const SIGNATURE_PROVIDER = new JsSignatureProvider([PRIVATE_KEY]);

const rpc = new JsonRpc(URL_NODE);

const api = new Api({
  rpc,
  signatureProvider: SIGNATURE_PROVIDER,
});

interface TransactionData {
  id: number;
  user: string;
  details: { name: string; ineryaccount: string };
}

async function createTransaction(data: TransactionData) {
  const { id, user, details } = data;
  const action = {
    account: ACCOUNT,
    name: "create",
    authorization: [{ actor: ACTOR, permission: "active" }],
    data: { id, user, ...details },
  };
  try {
    const response = await api.transact({ actions: [action] }, { broadcast: true, sign: true });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

createTransaction({
  id: 23,
  user: ACTOR,
  details: { name: "yusufinery", ineryaccount: ACTOR },
});
