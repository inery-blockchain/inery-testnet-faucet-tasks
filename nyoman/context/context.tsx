import React, { createContext } from "react";
import { Api } from "ineryjs";
import { api, actor } from "./inery-config";

interface IPropsCreate {
  id: number;
  user: string;
  data: string;
}

interface ICreateContext {
  api: Api;
  actor: string;
  Create: (props: IPropsCreate) => void;
  output: any;
  loading: boolean;
  ReadData: (id: any) => void;
  setStatus: (status: any) => void;
  status: string;
}

type Props = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<ICreateContext>({
  api: api,
  actor: actor,
  Create: () => {},
  output: {},
  loading: false,
  ReadData: () => {},
  setStatus: () => {},
  status: "",
});

export const CreateProvider = ({ children }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState<any>(
    "execute the button above to see the output"
  );
  const [status, setStatus] = React.useState<any>("");

  const Create = async ({ id, user, data }: IPropsCreate) => {
    const Hashdata = { id, user, data };
    try {
      setLoading(true);
      const tx = await api.transact(
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
                ...Hashdata,
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
      const tx = await api.transact(
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
        api,
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
