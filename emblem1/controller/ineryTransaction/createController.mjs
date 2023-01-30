import { ineryApiController } from "../../utils/MasterInery.mjs";

// rpc api
const api = ineryApiController();

async function createPushTransaction(id, user, account, actor, data) {
  //   console.log(id, user, account, actor, data);
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

    console.log(
      "===================== CREATE transaction details ======================"
    );
    console.log(tx, "\n");
    console.log(
      "Response from contract :",
      tx.processed.action_traces[0].console
    );
    console.log("\n");
    console.log(
      "======================================================================="
    );
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}
export async function createController(id, user, account, actor, data) {
  await createPushTransaction(id, user, account, actor, data);
}
