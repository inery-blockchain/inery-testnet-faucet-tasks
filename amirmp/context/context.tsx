import { Api, JsSignatureProvider, JsonRpc } from "ineryjs";
import React, { createContext } from "react";

const node_url = "https://tas.blockchain-servers.world";
const actor = "amirmp";
const account = "amirmp";
const json_rpc = new JsonRpc(node_url);
const private_key = process.env.PRIVATE_KEY;
const signature = new JsSignatureProvider([private_key!]);


const pushapi = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

interface ICreateContext {
  output: any;
  loading: boolean;
  ReadData: (id: any) => void;
  pushapi: Api;
  actor: string;
  account: string;
  Create: (props: IPropsCreate) => void;
  Destroy: (props: IPropsCreate) => void;
  setStatus: (status: any) => void;
  status: string;
}

interface IPropsCreate {
  user: string;
  data: string;
  id: number;
}

type Props = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<ICreateContext>({
  output: {},
  loading: false,
  setStatus: () => {},
  status: "",
  ReadData: () => {},
  pushapi: pushapi,
  actor: actor,
  account: account,
  Create: () => {},
  Destroy: () => {},
});

export const CreateProvider = ({ children }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState<any>(
    "Inery Testnet"
  );
  const [status, setStatus] = React.useState<any>("");

  const Create = async ({ user, data, id }: IPropsCreate) => {
    const hx = { user, data, id };
    try {
      setLoading(true);
      const tx = await pushapi.transact(
        {
          actions: [
            {
              account,
              name: status,
              authorization: [
                {
                  actor,
                  permission: "active",
                },
              ],
              data: {
                user, data, id,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      console.log(tx);
      setOutput(tx);
    } catch (error) {
      console.log(error);
      setOutput(error);
    }
    setLoading(false);
  };
  
  const Destroy = async ({ id }: IPropsCreate) => {
    const hx = { id };
    try {
      setLoading(true);
      const tx = await pushapi.transact(
        {
          actions: [
            {
              account,
              name: status,
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
      console.log(tx);
      setOutput(tx);
    } catch (error) {
      console.log(error);
      setOutput(error);
    }
    setLoading(false);
  };

  const ReadData = async ({ id }: IPropsCreate) => {
    try {
      setLoading(true);
      const tx = await pushapi.transact(
        {
          actions: [
            {
              account,
              name: status,
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
      console.log(tx);
      setOutput(tx);
    } catch (error) {
      console.log(error);
      setOutput(error);
    }
    setLoading(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        setStatus,
        status,
        pushapi,
        actor,
        account,
        Create,
        Destroy,
        output,
        loading,
        ReadData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
