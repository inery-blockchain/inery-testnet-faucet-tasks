import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";
import ora from "ora";
import chalk from "chalk";
dotenv.config();

const url = "http://your-ip:8888"; // ganti dengan alamat IP VPS node Anda
const account = "rizal52"; // ganti dengan nama akun inery Anda
const actor = "rizal52"; // ganti dengan nama inery Anda
const private_key = "your-private-key"; // ganti dengan kunci privat Anda

const signatureProvider = new JsSignatureProvider([private_key]);
const rpc = new JsonRpc(url);
const api = new Api({ rpc, signatureProvider });

const CreateTransaction = async (id, user, data) => {
  const Hashdata = { id, user, data };
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

const DestroyTransaction = async (id) => {
  try {
    const destroyTx = await api.transact(
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

    console.log(chalk.red("Record destroyed\n\n"));
    console.log(destroyTx, "\n");
    console.log("responses: \n", destroyTx.processed.action_traces[0].console);
  } catch (err) {
    console.log(err);
  }
};

const PushTransaction = async (DataId, user, data) => {
  const spinner = ora({
    text: "Processing transaction...",
    spinner: {
      interval: 150,
      frames: ["◐", "◓", "◑", "◒"],
    },
  }).start();

  try {
    await CreateTransaction(DataId, user, data);
    await DestroyTransaction(DataId);

    spinner.stop();
    console.log(chalk.green("Transaction completed!"));
  } catch (err) {
    spinner.stop();
    console.log(chalk.red(err));
  }
};

PushTransaction(619, account, "push done");
