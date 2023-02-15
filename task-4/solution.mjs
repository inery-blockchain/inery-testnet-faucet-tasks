import { Api, JsonRpc, JsSignatureProvider } from "ineryjs";
import dotenv from "dotenv";

dotenv.config();

//Create and Destroy Transaction with Api IneryJS

const privateKey = process.env.PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(process.env.RPC_URL);
const api = new Api({ rpc, signatureProvider });

const createTransaction = async () => {
    const result = await api.transact(
        {
        actions: [
            {
            account: "inery",
            name: "create",
            authorization: [
                {
                actor: "inery",
                permission: "active",
                },
            ],
            data: {
                id: 1,
                name: "John Doe",
                age: 42,
                email: "",
            },
            },
        ],
        },
        {
        blocksBehind: 3,
        expireSeconds: 30,
        }
    );
    console.log(result);
    };

const readTransaction = async () => {
    const result = await api.transact(
        {
        actions: [
            {
            account: "inery",
            name: "read",
            authorization: [
                {
                actor: "inery",
                permission: "active",
                },
            ],
            data: {
                id: 1,
            },
            },
        ],
        },
        {
        blocksBehind: 3,
        expireSeconds: 30,
        }
    );
    console.log(result);
    };

const updateTransaction = async () => {
    const result = await api.transact(
        {
        actions: [
            {
            account: "inery",
            name: "update",
            authorization: [
                {
                actor: "inery",
                permission: "active",
                },
            ],
            data: {
                id: 1,
                name: "John Doe",
                age: 43,
                email: "",
            },
            },
        ],
        },
        {
        blocksBehind: 3,
        expireSeconds: 30,
        }
    );
    console.log(result);
    };

const deleteTransaction = async () => {
    const result = await api.transact(
        {
        actions: [
            {
            account: "inery",
            name: "remove",
            authorization: [
                {
                actor: "inery",
                permission: "active",
                },
            ],
            data: {
                id: 1,
            },
            },
        ],
        },
        {
        blocksBehind: 3,
        expireSeconds: 30,
        }
    );
    console.log(result);
    };

const main = async () => {
    await createTransaction();
    await readTransaction();
    await updateTransaction();
    await readTransaction();
    await deleteTransaction();
};

main(1, account, "Create new Data via JSON RPC");

