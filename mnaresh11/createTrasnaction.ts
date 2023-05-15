import { configParams } from "./configEnvVar";
import { getApiInfoCreate } from "./helperCreate";

const {account,actor,nodeUrl,privateKey}=configParams;
const api = getApiInfoCreate({nodeUrl,privateKey})
interface IProps {
  id: number;
  user:string;
  data: string;
}

//create transaction
const TransactionCreation = async ({ id, user,data }: IProps) => {
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

TransactionCreation({
  id: 2,
  user:account,
  data:"create data"
});
