import readline from 'readline'

import { Api, JsonRpc, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
import { Sign } from 'crypto';
dotenv.config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PREV_KEYS = process.env.SCKey // Inery Key
const LOG_URL = new JsonRpc(process.env.VPS) // IP Address
const account = process.env.Acc // Account

const Proof = new JsSignatureProvider([PREV_KEYS]); // Signature
const CallThash = new Api({rpc: LOG_URL, signatureProvider: Proof}) // Auth

const mathCaptcha = async () => {
    const num1 = Math.floor(Math.random() * 5);
    const num2 = Math.floor(Math.random() * 5);
    const operator = Math.random() > 0.5 ? "+" : "-";
    const correctAnswer = operator === "+" ? (num1 + num2) : (num1 - num2);
  
    const userAnswer = await new Promise((resolve) => {
      rl.question(`You're not a robot?, Solve this math problem: ${num1} ${operator} ${num2} = `, resolve);
    });
    
    if (parseInt(userAnswer) === correctAnswer) {
      console.log("Math captcha passed!");
      rl.close();
      return true;
    } else {
      console.log("Math captcha failed. Please try again.");
      rl.close();
      return false;
    }
}
async function Push_Create(id, user, data){
    try{
        const Transhash = await CallThash.transact({
            actions:[
                    {account, name:'create',
                    authorization:[{actor:'arfiyan', permission:'active',}],
                    data:{ id, user, data}}]},
                    {broadcast:true,sign:true})
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function Push_Read(id){
    try{
        const Transhash = await CallThash.transact({
            actions:[
                    {account, name:'read',
                    authorization:[{actor:'arfiyan', permission:'active',}],
                    data:{id}}]},
                    {broadcast:true,sign:true})
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function Push_Update(id, data){
    try{
        const Transhash = await CallThash.transact({
            actions:[
                    {account, name:'update',
                    authorization:[{actor:'arfiyan', permission:'active',}],
                    data:{id, data}}]},
                    {broadcast:true,sign:true})
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function Push_Destroy(id){
    try{
        const Transhash = await CallThash.transact({
            actions:[
                    {account, name:'destroy',
                    authorization:[{actor:'arfiyan', permission:'active',}],
                    data:{id}}]},
                    {broadcast:true,sign:true})
            console.log(Transhash)
        }catch(error){
    console.log(error)}}
async function main(id, user, data){
    if (await mathCaptcha()) {
        await Push_Create(id, user, data)
        await Push_Update(id, data)
        await Push_Read(id)
        await Push_Destroy(id)
    } else {
        console.log("Transaction cancelled due to failed math captcha.");
      }
} main(11560,account,"CRUD DATA TRANSACTION")
