// import {
//   Api,
//   JsonRpc,
//   RpcError,
//   JsSignatureProvider,
// } from "./node_modules/ineryjs/dist/index.js";
import { ineryApiController } from "./utils/MasterInery.mjs";

const actor = "emblem1";
const account = "emblem1";
const api = ineryApiController();
// console.log(api);

async function create(id, user, data) {
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
      "======================================================================="
    );
    console.log(
      "===================== CREATE transaction details ======================"
    );
    console.log(
      "======================================================================="
    );
    console.log(tx, "\n");
    console.log(
      "Response from contract :",
      tx.processed.action_traces[0].console
    );
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

async function read(id) {
  try {
    const tx = await api.transact(
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
    );

    console.log(
      "======================================================================="
    );
    console.log(
      "===================== READ transaction details ========================"
    );
    console.log(
      "======================================================================="
    );
    console.log(tx, "\n");
    console.log(
      "Response from contract :",
      tx.processed.action_traces[0].console
    );
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

async function update(id, data) {
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
      "======================================================================="
    );
    console.log(
      "===================== UPDATE transaction details ======================"
    );
    console.log(
      "======================================================================="
    );
    console.log(tx, "\n");
    console.log(
      "Response from contract :",
      tx.processed.action_traces[0].console
    );
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
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
      "======================================================================="
    );
    console.log(
      "===================== DESTROY transaction details ====================="
    );
    console.log(
      "======================================================================="
    );
    console.log(tx, "\n");
    console.log(
      "Response from contract :",
      tx.processed.action_traces[0].console
    );
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

async function main(id, user, data) {
  await create(id, user, data);
  await read(id);
  await update(id, data);
  await destroy(id);
}

main(22738, account, "CRUD Transaction via JSON RPC");
