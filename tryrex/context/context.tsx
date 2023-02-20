import { createContext, useState } from "react";
import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";

const url = "https://tas.blockchain-servers.world";
const json_rpc = new JsonRpc(url);
const private_key = process.env.PRIVATE_KEY; // import private key from .env file;
const actor = "tryrex";
const signature = new JsSignatureProvider([private_key!]);

const api = new Api({
  rpc: json_rpc,
  signatureProvider: signature,
});

interface IPropsCreate {
  id: number;
  user: string;
  data: string;
}

interface IRead {
  id: number;
}

interface ICreateContext {
  api: Api;
  actor: string;
  output: string;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  createHandler: (props: IPropsCreate) => void;
  Read: (props: IRead) => void;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}

type Props = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<ICreateContext>({
  api: api,
  actor: actor,
  output: "",
  setOutput: () => {},
  loading: false,
  createHandler: () => {},
  Read: () => {},
  setCurrent: () => {},
});

export const CreateProvider = ({ children }: Props) => {
  const [output, setOutput] = useState("select the button above");
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("");

  const createHandler = async ({ id, user, data }: IPropsCreate) => {
    const Hashdata = { id, user, data };
    try {
      setLoading(true);
      const tx = await api.transact(
        {
          actions: [
            {
              account: actor,
              name: current,
              authorization: [
                {
                  actor,
                  permission: "active",
                },
              ],
              data: {
                ...Hashdata,
              },
            },
          ],
        },
        { broadcast: true, sign: true }
      );
      setOutput(tx as any);
      console.log(tx);
    } catch (error) {
      setOutput("Error!, please check your input");
      console.log(error);
    }
    setLoading(false);
  };

  const Read = async ({ id }: IRead) => {
    try {
      setLoading(true);
      const tx = await api.transact(
        {
          actions: [
            {
              account: actor,
              name: current,
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
      setOutput(tx as any);
      console.log(tx);
    } catch (error) {
      setOutput("Error!, please check your input");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        api,
        actor,
        output,
        setOutput,
        loading,
        createHandler,
        Read,
        setCurrent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
