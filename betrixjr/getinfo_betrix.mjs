import axios from 'axios';
import { config } from 'dotenv';
import Inery from 'ineryjs';

config();

const privateKey = process.env.PRIVATE_KEY;
const account = process.env.ACCOUNT_ADDRESS;
const url = process.env.NODE_URL;

async function getAccountInfo() {
    const inery = new Inery(url, {
      privateKey,
      account
    });
    try {
        const accountInfo = await inery.account.getAccount(account);
        console.log(accountInfo);
    } catch (error) {
        console.log("Error: ", error);
    }
}

getAccountInfo();
