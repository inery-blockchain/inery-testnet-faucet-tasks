/// <reference types="node" />
import { BNInput, ec as EC } from 'elliptic';
import { Key, KeyType } from './ineryjs-numeric';
import { PublicKey, Signature } from './ineryjs-key-conversions';
/** Represents/stores a private key and provides easy conversion for use with `elliptic` lib */
export declare class PrivateKey {
    private key;
    private ec;
    constructor(key: Key, ec: EC);
    /** Instantiate private key from an `elliptic`-format private key */
    static fromElliptic(privKey: EC.KeyPair, keyType: KeyType, ec?: EC): PrivateKey;
    /** Instantiate private key from an INERYIO-format private key */
    static fromString(keyString: string, ec?: EC): PrivateKey;
    /** Export private key as `elliptic`-format private key */
    toElliptic(): EC.KeyPair;
    toLegacyString(): string;
    /** Export private key as INERYIO-format private key */
    toString(): string;
    /** Get key type from key */
    getType(): KeyType;
    /** Retrieve the public key from a private key */
    getPublicKey(): PublicKey;
    /** Sign a message or hashed message digest with private key */
    sign(data: BNInput, shouldHash?: boolean, encoding?: BufferEncoding): Signature;
    /** Validate a private key */
    isValid(): boolean;
}
