import { ineryApiController } from "../../utils/MasterInery.mjs";

// rpc api
const api = ineryApiController();

async function deletePushTransaction(id, user, account, actor, data) {
  try {
    const tx = await api.transact(
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

    console.log(
      "===================== DELETE transaction details ======================"
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
export async function deleteController(id, user, account, actor, data) {
  await deletePushTransaction(id, user, account, actor, data);
}
