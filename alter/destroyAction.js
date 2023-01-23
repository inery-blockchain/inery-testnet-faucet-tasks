import { PushApi, account, actor } from "./inery-config.js";

const DestroyAction = async (id) => {
  try {
    const txId = await PushApi.transact(
      {
        actions: [
          {
            account,
            name: "destroy",
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
    console.log(txId);
  } catch (error) {
    console.log(error);
  }
};

DestroyAction(94323);
