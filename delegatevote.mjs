import axios from 'axios';
import Inery from 'ineryjs';
import { config } from 'dotenv';

config();

const privateKey = process.env.PRIVATE_KEY;
const account = process.env.ACCOUNT_ADDRESS;
const delegateUsername = "delegateusername";
const addVotes = ["+username1","+username2","+username3"];
const url = process.env.NODE_URL;

async function voteDelegate() {
    const inery = new Inery(url, {
      privateKey,
      account
    });

    const transaction = inery.delegate.vote(delegateUsername,addVotes);

    try {
        const { data } = await axios.post(${url}/transactions, transaction);
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

voteDelegate();