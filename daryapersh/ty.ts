import { configParam } from "./envVar";
import { getApiInfo } from "./hepler";

const {account,actor,remoteIp,privateKey}=configParam;
const api = getApiInfo({remoteIp,privateKey})
interface IProps {
  id: number;
  data: string;
}

const Transaction = async ({ id, data }: IProps) => {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account,
            name: "update",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id,
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
  id: 1,
  data:"modifycation of data"
});
