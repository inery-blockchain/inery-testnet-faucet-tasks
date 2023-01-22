const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenv.config();
dotenvExpand.expand(dotenv.config());

const tokenContract = process.env.TOKEN_CONTRACT;
const sender = process.env.SENDER_ACCOUNT;
const recipient = process.env.RECIPIENT_ACCOUNT;
const symbol = process.env.TOKEN_SYMBOL;
const amount = process.env.TRANSFER_AMOUNT;
const memo = process.env.TRANSFER_MEMO;

const jsonRpc = new JsonRpc(process.env.INERY_NODE_RPC);
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const api = new Api({
    rpc: jsonRpc,
    signatureProvider
});

async function moveTokens(sender, recipient, amount, memo) {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account: tokenContract,
                    name: "transfer",
                    authorization: [
                        {
                            actor: sender,
                            permission: "active"
                        }
                    ],
                    data: {
                        from: sender,
                        to: recipient,
                        quantity: amount,
                        memo
                    }
                }
            ]
        }, { broadcast: true, sign: true });

        console.log("TRANSFER transaction details:");
        console.log(tx.processed);
        console.log("RPC Push transaction action TRANSFER details:");
        console.log(tx.processed.action_traces[0].act);
    } catch (error) {
        console.log("ERROR: Can't transfer token symbol", symbol);
        console.log("DETAILS:", error.details[0].message);
    }
}

moveTokens(sender, recipient, amount, memo);
