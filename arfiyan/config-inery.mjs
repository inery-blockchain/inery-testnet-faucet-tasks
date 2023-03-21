import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'

const url = "http://vmi1076416.contaboserver.net:8888"

const json_rpc = new JsonRpc(url) 
const private_key = "5K551AXU2ezdhZSzTKcRtN6HHsz2fUp5LomE6hVuaxYLfEcW7rc"; 
const actor = "alternativ"
const account = "arfiyan"
const signature  = new JsSignatureProvider([private_key]);

const userapi = new Api({ rpc: json_rpc, signatureProvider: signature });

export { userapi, actor, account };

