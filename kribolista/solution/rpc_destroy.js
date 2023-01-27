import { Userapi, account, actor } from "./config/config.js";

const Destroy = async (id) => {
  try {
    const hashId = await Userapi.transact(
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
    console.log(hashId);
  } catch (error) {
    console.log(error);
  }
};

Destroy(1960);
