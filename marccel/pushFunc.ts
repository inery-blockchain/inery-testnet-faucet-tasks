import { jsonApi, account, actor } from "./config";

interface IProps {
  id: number;
  data: string;
  user: string;
}

async function CreateFunc({ id, user, data }: IProps): Promise<string | void> {
  await jsonApi
    .transact(
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
    )
    .then((response: string | any) => console.log(response))
    .catch((error) => console.log(error));
}

CreateFunc({ id: 1420, user: account, data: "inery task 4" });
