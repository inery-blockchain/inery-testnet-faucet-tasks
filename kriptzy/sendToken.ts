import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE as string);
const account = "kriptzy";
const actor = "kriptzy";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey!]);
const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

interface IProps {
  from: string;
  to: string;
  quantity: string;
  memo: string;
}

const sendToken = async ({ from, to, quantity, memo }: IProps) => {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "transfer",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              from,
              to,
              quantity,
              memo,
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

sendToken({
  from: "kriptzy",
  to: "inery",
  quantity: "10 INR",
  memo: "inery task 4",
});
