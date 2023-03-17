import { account, actor, pushapi } from "./config";
import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import React, { createContext } from "react";

interface ICreateContext {
  output: any;
  loading: boolean;
  Read: (id: any) => void;
  pushapi: Api;
  actor: string;
  account: string;
  Create: (props: IPropsCreate) => void;
  Destroy: (id: any) => void;
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
  ReadTx: () => {},
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

  const Create = async ({ user, data, id }: IPropsCreate) => {
    const hx = { user, data, id };
    try {
      setLoading(true);
      const ctx = await pushapi.transact(
        {
          actions: [
            {
              account,
              name: "Create",
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
        
        
      console.log(ctx, "\n");
      console.log("\nResponse data:", ctx.processed.action_traces[0].console);
      setOutput(ctx);
    } catch (error) {
      console.log(error);
      setOutput(error);
    }
    setLoading(false);
  };
  
  const Destroy = async ({ id }: IPropsCreate) => {
    try {
      setLoading(true);
      const dtx = await pushapi.transact(
        {
          actions: [
            {
              account,
              name: "Destroy",
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
        
      console.log("Record destroyed by amirmp\n\n");
      console.log(dtx, "\n");
      console.log("responses: \n", dtx.processed.action_traces[0].console);
      setOutput(dtx);
    } catch (error) {
      console.log(error);
      setOutput(error);
    }
    setLoading(false);
  };

  const Read = async ({ id }: IPropsCreate) => {
    try {
      setLoading(true);
      const rtx = await pushapi.transact(
        {
          actions: [
            {
              account,
              name: "Read",
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
        
      console.log(rtx, "\n");
      setOutput(rtx);
    } catch (error) {
      console.log(error);
      setOutput(error);
    }
    setLoading(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        pushapi,
        actor,
        account,
        Create,
        Destroy,
        output,
        loading,
        ReadTx,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
