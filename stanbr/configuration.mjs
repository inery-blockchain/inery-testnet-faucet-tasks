import dotenv from 'dotenv';
dotenv.config(); //load all env variables

export const NODE_RPC_IP = process.env.NODE_RPC_IP; //node chain ip
export const INERY_ACCOUNT = process.env.INERY_ACCOUNT; // inery account name
export const INERY_ACTOR = process.env.INERY_ACTOR; //inery actor name 
export const INERY_PRIVATE_KEY = process.env.INERY_PRIVATE_KEY; //inery private key