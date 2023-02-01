import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
dotenv.config();

const json_rpc = new JsonRpc(process.env.URL_NODE!);
const account = "baal";

const actor = "baal";
const privateKey = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([privateKey!]);

const pushApi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

interface IProps {
  id: number;
  data: string;
  user: string;
}

interface IRead {
  id: number;
}

const CreateFunc = async ({ id, data, user }: IProps) => {
  try {
    const output = await pushApi.transact(
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
    console.log(output);
  } catch (error) {
    console.log(error);
  }
  // .then((res) => {
  //   console.log(res);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

const FuncRead = async ({ id }: IRead) => {
  try {
    const output = await pushApi.transact(
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
    );
    console.log(output);
  } catch (error) {
    console.log(error);
  }
};

CreateFunc({ id: 1200, data: "testing inery task 4", user: account });
FuncRead({ id: 1200 });
