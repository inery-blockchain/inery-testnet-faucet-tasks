import dotenv from 'dotenv';
dotenv.config();

export const configParam = {
    actor: String(process.env.INERY_ACTOR),
    account: String(process.env.INERY_ACCOUNT),
    remoteIp: String(process.env.NODE_RPC_IP),
    privateKey: String(process.env.INERY_PRIVATE_KEY)
}
