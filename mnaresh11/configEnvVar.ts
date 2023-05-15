import dotenv from 'dotenv';
dotenv.config();

//read all env variables
export const configParams = {
    actor: String(process.env.ACTOR),
    account: String(process.env.ACCOUNT),
    nodeUrl: String(process.env.NODE_URL),
    privateKey: String(process.env.PRIVATE_KEY)
}
