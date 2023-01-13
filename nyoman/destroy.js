import { transactApi, account, actor } from "./config.js";

const Destroy = async (id) => {
  try {
    const txId = await transactApi.transact(
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

Destroy(10);
