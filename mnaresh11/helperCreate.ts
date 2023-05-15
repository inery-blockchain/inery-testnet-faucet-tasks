import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';

export function generateSignature(privateKey: string) {
    return new JsSignatureProvider([privateKey])
}

export function getApiInfoCreate({nodeUrl,privateKey}:IApiInfo) {
    let jsonRpc = new JsonRpc(nodeUrl);
    let signature = generateSignature(privateKey)
    return new Api({
        rpc: jsonRpc,
        signatureProvider: signature
    });
}

interface IApiInfo{
    nodeUrl:string;
    privateKey:string;
}