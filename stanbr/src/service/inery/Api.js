import getIneryApi from "./connection"; //load inery object

export const createApi = async (params) => {
  //
  const ineryApi = getIneryApi();
  const tx = await ineryApi.transact(
    {
      actions: [
        {
          account: params.account,
          name: "create",
          authorization: [
            {
              actor: params.actor,
              permission: "active",
            },
          ],
          data: {
            id: params.id,
            user: params.user,
            data: params.data,
          },
        },
      ],
    },
    { broadcast: true, sign: true }
  );
  return tx;
};

export const readApi = async (params) => {
  const ineryApi = getIneryApi();
  const tx = await ineryApi.transact(
    {
      actions: [
        {
          account: params.account,
          name: "read",
          authorization: [
            {
              actor: params.actor,
              permission: "active",
            },
          ],
          data: {
            id: params.id,
          },
        },
      ],
    },
    { broadcast: true, sign: true }
  );
  console.log(JSON.stringify(tx));
  return tx;
};
