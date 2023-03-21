import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";

dotenv.config();

const blockchainUrl = "http://66.175.235.233:8888";
const contractAccount = "rizal23";
const actor = contractAccount;
const privateKey = "privateKey";
const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(blockchainUrl);
const api = new Api({ rpc, signatureProvider });

const createRecord = async (recordId, user, data) => {
  const recordData = { id: recordId, user, data };

  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account: contractAccount,
            name: "create",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: recordData,
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log("Record created:");
    console.log(tx, "\n");
    console.log("Response data:", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log("Error creating record:", error);
  }
};

const deleteRecord = async (recordId) => {
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account: contractAccount,
            name: "destroy",
            authorization: [
              {
                actor,
                permission: "active",
              },
            ],
            data: {
              id: recordId,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(`Record with ID ${recordId} destroyed by ${contractAccount}\n\n`);
    console.log("Response data:", tx.processed.action_traces[0].console);
  } catch (error) {
    console.log("Error destroying record:", error);
  }
};

const pushRecord = async (recordId, user, data) => {
  await createRecord(recordId, user, data);
  await deleteRecord(recordId);
};

pushRecord(1234, contractAccount, "This is a test record");
