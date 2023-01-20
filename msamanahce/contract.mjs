const { Api, JsonRpc, RpcError } = require('ineryjs');
const {JsSignatureProvider} = require('ineryjs/dist/eosjs-jssig');
const {TextDecoder, TextEncoder} = require('util');

const endpoint = "vmi1063985.contaboserver.net:8888";
const contract = "msamanahce";
const actor = "msamanahce";

const rpc = new JsonRpc(endpoint, {fetch});

const privateKey = process.env.PRIVATE_KEY;
const signatureProvider = new JsSignatureProvider([privateKey]);
const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});

const wasmFile = './path/to/contract.wasm';
const abiFile = './path/to/contract.abi';

const wasm = fs.readFileSync(wasmFile);
const abi = fs.readFileSync(abiFile);

async function pushContract() {
    try {
        const tx = await api.transact({
            actions: [
                {
                    account: 'chain',
                    name: 'Pushcontract',
                    authorization: [{
                        actor: actor,
                        permission: 'active'
                    }],
                    data: {
                        name: contract,
                        setcode: {
                            vmtype: 0,
                            vmversion: 0,
                            code: wasm.toString('hex')
                        },
                        setabi: {
                            abi: abi.toString()
                        }
                    }
                }
            ]
        }, {
            broadcast: true,
            sign: true
        });
        console.log(tx);
    } catch (error) {
        console.log(error);
    }
}

pushContract();
