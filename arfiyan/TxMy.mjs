import readline from 'readline'

import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
import { Sign } from 'crypto';
dotenv.config()

const rn = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PREV_KEYS = " " // Inery Key
const LOG_URL = new JsonRpc(process.env.VPS) // IP Address Yoyr VPS
const account = " " // Account Inery

// const id = 1000

const Proof = new JsSignatureProvider([PREV_KEYS]); // Signature
const CallThash = new Api({rpc: LOG_URL, signatureProvider: Proof}) // Auth

const mathCaptcha = async () => {
    const num1 = Math.floor(Math.random() * 4);
    const num2 = Math.floor(Math.random() * 4);
    const operator = Math.random() > 0.4 ? "+" : "-";
    const correctAnswer = operator === "+" ? (num1 + num2) : (num1 - num2);

    const userAnswer = await new Promise((resolve) => {
      rn.question(`You're not a robot?, Solve this math problem: ${num1} ${operator} ${num2} = `, resolve);
    });

    if (parseInt(userAnswer) === correctAnswer) {
      console.log("Math captcha passed!");
      rn.close();
      return true;
    } else {
      console.log("Math captcha failed. Please try again.");
      rn.close();
      return false;
    }
}

//const actor = "arfiyan"
const broadcast = true
const sign = true
const line = "++++++=======++++++"

async function Push_Create(id, user, data){
    try{
        const Transhash = await CallThash.transact({
        actions:[
            {account, name:'create',
            authorization:[{actor:'arfiyan', permission:'active',}], data:{ id, user, data}}]})
            console.log("\n\n", line, "Transaction CREATE details", line)
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function Push_Update(id, data){
    try{
        const Transhash = await CallThash.transact({
        actions:[
            {account, name:'update',
            authorization:[{actor:'arfiyan', permission:'active',}], data:{id, data}}]})
            console.log("\n\n", line, "Transaction UPDATE details", line)
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function Push_Destroy(id){
    try{
        const Transhash = await CallThash.transact({
        actions:[
            {account, name:'destroy',
            authorization:[{actor:'arfiyan', permission:'active',}], data:{id}}]})
            console.log("\n\n", line, "Transaction DESTROY details", line)
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function main(id, user, data){
    if (await mathCaptcha()) {
        await Push_Create(id, user, data)
        await Push_Update(id, data)
        await Push_Destroy(id)
    } else {
        console.log("Transaction cancelled due to failed math captcha.");
      }
} main(11560,account,"CRUD DATA TRANSACTION")
