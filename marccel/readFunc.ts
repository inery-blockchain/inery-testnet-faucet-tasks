import { jsonApi, account, actor } from "./config";

interface IReadFunc {
  id: number;
}

const ReadFunc = async ({ id }: IReadFunc): Promise<string | void> => {
  await jsonApi
    .transact(
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
    )
    .then((Response: string | any) => {
      console.log(Response);
    })
    .catch((error: Error) => console.log(error));
};

ReadFunc({id: 1420});
