<script lang="ts">

import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";
import Modal from "$lib/config.svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import "../default/app.css";

export const api_store: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("For Task 5 Inery")

let key_id: number
let key_data: string
let kill_id : number

// config for make a trasaction
async function create(){
api_store.set(
fetch("config/send", {method: "POST",
body: JSON.stringify({id: key_id,user: "msastiputri",data: key_data}), 
headers:{'content-type': 'application/json'}}).then((res) => {
return res.json()}))}

// config for kill transaction
async function kill(){
api_store.set(
fetch("config/kill", {method: "POST",
body: JSON.stringify({id: kill_id,}),
headers:{'content-type': 'application/json'}}).then((res) => {
return res.json()}))}
</script>
<svelte:head><title>MsAstiputri - Dapps</title></svelte:head>
<div class="container bg-zinc-1000 mx-auto min-h-full px-20 pb-20 pt-20">
<div class="flex justify-center"></div>  
<div class="mb-5 text-center">
<div class="text-4xl font-bold ">BUILD BY "MSASTIPUTRI"</div>
<div class="divider"></div></div>
<div class="grid grid-cols-1 gap-2">
<label for="modal-create" class="btn btn-warning">MAKE A TRANSACTION</label>
<div class="divider"></div>
<label for="modal-kill" class="btn btn-warning">KILL TRANSACTION</label></div>
<div class="divider"></div>
<div class="mockup-code bg-warning text-primary-content">

<pre><code>YOUR TRANSACTION HERE</code></pre>
{#await $api_store}<pre data-prefix="=>"><code></code></pre>    
{:then api} 
<pre data-prefix="=>"><code>{JSON.stringify(api, null, 4)}</code></pre>{/await}</div></div>

<Modal key="modal-create" on:click={() => create()}>
<div slot="body" class="flex flex-col gap-7">
<label for="message" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white">CHANGE ANOTHER ID IF YOU GOT ERROR</label>
<input bind:value={key_id} type="text" placeholder="Exam. 100" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
<textarea bind:value={key_data} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Exam. MsAstiputri"></textarea></div></Modal>
<Modal key="modal-kill" on:click={() => kill()}>
<div slot="body" class="flex flex-col gap-7">
<label for="message" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white">INPUT ID TO KILL</label>
<input bind:value={kill_id} type="text" placeholder="Exam. 100" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</Modal>
    