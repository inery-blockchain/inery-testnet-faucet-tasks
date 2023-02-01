import axios from 'axios';
import { config } from 'dotenv';
import Inery from 'ineryjs';

config();

const blockHeight = 100;
const url = process.env.NODE_URL;

async function getBlockInfo() {
    try {
        const { data } = await axios.get(`${url}/blocks/${blockHeight}`);
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

getBlockInfo();
