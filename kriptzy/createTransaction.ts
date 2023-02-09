import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE!);
const account = "kriptzy";
const actor = "kripzy";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey!]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

interface IProps {
  id: number;
  user: string;
  data: {};
}

const Transaction = async ({ id, user, data }: IProps) => {
  try {
    const tx = await api.transact(
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
    );
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
};

Transaction({
  id: 23,
  user: account,
  data: {
    name: "kriptzy",
    ineryaccount: "kriptzy",
  },
});
