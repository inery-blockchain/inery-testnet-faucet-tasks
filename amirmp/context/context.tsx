import { acc, pushapi } from "./config";
import { Api } from "ineryjs";
import React, { createContext } from "react";


interface IPropsCreate {
  user: string;
  data: string;
  id: number;
}

interface ICreateContext {
  output: any;
  loading: boolean;
  ReadData: (id: any) => void;
  pushapi: Api;
  acc: string;
  Create: (props: IPropsCreate) => void;
  setStatus: (status: any) => void;
  status: string;
}

type Props = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<ICreateContext>({
  output: {},
  loading: false,
  ReadData: () => {},
  pushapi: pushapi,
  acc: acc,
  Create: () => {},
  setStatus: () => {},
  status: "",
});

export const CreateProvider = ({ children }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState<any>(
    "Inery Testnet"
  );
  const [status, setStatus] = React.useState<any>("");

  const Create = async ({ user, data, id }: IPropsCreate) => {
    const Hashdata = { user, data, id };
    try {
      setLoading(true);
      const tx = await pushapi.transact(
        {
          actions: [
            {
              account: actor,
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

  const ReadData = async ({ id }: IPropsCreate) => {
    try {
      setLoading(true);
      const tx = await pushapi.transact(
        {
          actions: [
            {
              account: actor,
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
        pushapi,
        actor,
        Create,
        output,
        loading,
        ReadData,
        setStatus,
        status,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
