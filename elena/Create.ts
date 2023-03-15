import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();
const rpc = new JsonRpc(process.env.URL_NODE!);
const account = "elena";
const privateKey = process.env.PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([privateKey!]);

const Create = async () => {
  const api = new Api({
    rpc,
    signatureProvider,
  });
    
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "create",
            authorization: [
              {
                actor: account,
                permission: "active",
              },
            ],
            data: {
              id: 5,
              user: "elena",
              data: "inery task 4",
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

Create();
