import { ineryApiController } from "../../utils/MasterInery.mjs";

// rpc api
const api = ineryApiController();

async function updatePushTransaction(id, user, account, actor, data) {
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

    console.log(
      "===================== UPDATE transaction details ======================"
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
export async function updateController(id, user, account, actor, data) {
  await updatePushTransaction(id, user, account, actor, data);
}
