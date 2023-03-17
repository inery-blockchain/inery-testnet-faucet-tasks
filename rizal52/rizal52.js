import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
import ora from "ora";
import chalk from "chalk";
dotenv.config();

const ineryUrl = "http://your-ip:8888"; // ganti dengan alamat IP VPS node Anda
const ineryAccount = "rizal52"; // ganti dengan nama akun inery Anda
const ineryActor = "rizal52"; // ganti dengan nama inery Anda
const ineryPrivateKey = "your-private-key"; // ganti dengan kunci privat Anda

const signatureProvider = new JsSignatureProvider([ineryPrivateKey]);
const rpc = new JsonRpc(ineryUrl);
const api = new Api({ rpc, signatureProvider });

const createTransaction = async (id, user, data) => {
  const Hashdata = { id, user, data };
  try {
    const tx = await api.transact(
      {
        actions: [
          {
            account: ineryAccount,
            name: "create",
            authorization: [
              {
                actor: ineryActor,
                permission: "active",
              },
            ],
            data: {
              ...Hashdata,
            },
          },
        ],
      },
      { broadcast: true, sign: true }
    );

    console.log(tx, "\n");
    console.log("\nResponsed data:", tx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const destroyTransaction = async (id) => {
  try {
    const destroyTx = await api.transact(
      {
        actions: [
          {
            account: ineryAccount,
            name: "destroy",
            authorization: [
              {
                actor: ineryActor,
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

    console.log(chalk.red("Record destroyed\n\n"));
    console.log(destroyTx, "\n");
    console.log("responses: \n", destroyTx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const pushTransaction = async (dataId, user, data) => {
  const spinner = ora({
    text: "Processing transaction...",
    spinner: {
      interval: 150,
      frames: ["◐", "◓", "◑", "◒"],
    },
  }).start();

  try {
    await createTransaction(dataId, user, data);
    await destroyTransaction(dataId);

    spinner.stop();
    console.log(chalk.green("Transaction completed!"));
  } catch (err) {
    spinner.stop();
    console.log(chalk.red(err));
  }
};

pushTransaction(619, ineryAccount, "push done");
