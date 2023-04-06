import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs';

export function generateSignature(privateKey: string) {
    return new JsSignatureProvider([privateKey])
}

export function getApiInfo({remoteIp,privateKey}:IApiInfo) {
    let jsonRpc = new JsonRpc(remoteIp);
    let signature = generateSignature(privateKey)
    return new Api({
        rpc: jsonRpc,
        signatureProvider: signature
    });
}

interface IApiInfo{
    remoteIp:string;
    privateKey:string;
}