import axios from 'axios';
import Inery from 'ineryjs';
import { config } from 'dotenv';

config();

const privateKey = process.env.PRIVATE_KEY;
const account = process.env.ACCOUNT_ADDRESS;
const amount = 1000;
const token = process.env.TOKEN_ADDRESS;
const url = process.env.NODE_URL;

async function convert() {
    const inery = new Inery(url, {
      privateKey,
      account
    });

    const transaction = inery.convert.convert(amount, token);

    try {
        const { data } = await axios.post(`${url}/transactions`, transaction);
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

convert();
