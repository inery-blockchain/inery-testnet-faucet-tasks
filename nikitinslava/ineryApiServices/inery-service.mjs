import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs'
import { NODE_RPC_IP, INERY_ACTOR, INERY_PRIVATE_KEY } from '../configServices/configuration.mjs';


// node server ip 
const rpc = new JsonRpc(NODE_RPC_IP);
const signatureProvider = new JsSignatureProvider([INERY_PRIVATE_KEY]);

// export the inery  api service object to use anywhere in code
export const IneryApiService = new Api({ rpc, signatureProvider });

//authorization options configuration
const authorizationConfig = {
    actor: INERY_ACTOR,
    permission: "active"
}

// broadcast options 
export const transactionBroadcastConfig = {
    broadcast: true,
    sign: true
}

export const authorization = [authorizationConfig];