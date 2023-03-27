import { create_task } from './task/create.js'
import { destroy_task } from './task/destroy.js'
import * as dotenv from 'dotenv'
dotenv.config()

const account = process.env.account;
const id = Math.floor(Math.random() * 3000) + 1;

async function main(id, user, data) {
    await create_task(id, user, `Create Transaction ID ${id} by ${account}`);
    await destroy_task(id);
}
main(id, account);