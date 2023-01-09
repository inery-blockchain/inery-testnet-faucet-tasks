/**
 * @module WebAuthn-Sig
 */
import { SignatureProvider, SignatureProviderArgs } from './ineryjs-api-interfaces';
import { PushTransactionArgs } from './ineryjs-rpc-interfaces';
/** Signs transactions using WebAuthn */
export declare class WebAuthnSignatureProvider implements SignatureProvider {
    /** Map public key to credential ID (hex). User must populate this. */
    keys: Map<string, string>;
    /** Public keys that the `SignatureProvider` holds */
    getAvailableKeys(): Promise<string[]>;
    /** Sign a transaction */
    sign({ chainId, requiredKeys, serializedTransaction, serializedContextFreeData }: SignatureProviderArgs): Promise<PushTransactionArgs>;
}
