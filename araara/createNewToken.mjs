const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('ineryjs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenv.config();
dotenvExpand.expand(dotenv.config());

const account = process.env.TOKEN_CONTRACT;
const issuer = process.env.ISSUER_ACCOUNT;
const symbol = process.env.TOKEN_SYMBOL;
const totalSupply = process.env.TOTAL_SUPPLY;

const jsonRpc = new JsonRpc(process.env.INERY_NODE_RPC);
const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY]);

const api = new Api({
    rpc: jsonRpc,
    signatureProvider
});

async function createNewToken(issuer, totalSupply) {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account,
                    name: "create",
                    authorization: [
                        {
                            actor: issuer,
                            permission: "active"
                        }
                    ],
                    data: {
                        issuer,
                        maximum_supply: totalSupply
                    }
                }
            ]
        }, { broadcast: true, sign: true });

        console.log("CREATE transaction details:");
        console.log(tx.processed);
        console.log("RPC Push transaction action CREATE details:");
        console.log(tx.processed.action_traces[0].act);
    } catch (error) {
        console.log("ERROR: Can't create token symbol", symbol);
        console.log("DETAILS:", error.details[0].message);
    }
}

createNewToken(issuer, totalSupply);
