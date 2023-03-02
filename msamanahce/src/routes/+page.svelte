<script lang="ts">
import Modal from "$lib/setup.svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";
export const api_store: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("Wait max 30 Sec after push transaction, enjoy")
import "../app.css";

// All Config
let my_id: number
let my_data: string
let kill_id : number
let edited_key : number
let edited_id : string
const user = "msamanahce";
const method = "POST";

// All Proccessing
async function create(){api_store.set(fetch("proccess/destroy/edit/sending", {method,body: JSON.stringify({id: my_id,user,data: my_data}), headers:{'content-type': 'application/json'}}).then((res) => {return res.json()}))}
async function edit(){api_store.set(fetch("proccess/destroy/edit", {method,body: JSON.stringify({id: edited_key,data: edited_id}),headers:{'content-type': 'application/json'}}).then((res) => {return res.json()}))}
async function kill(){api_store.set(fetch("proccess/destroy", {method,body: JSON.stringify({id: kill_id,}),headers:{'content-type': 'application/json'}}).then((res) => {return res.json()}))}
</script>

<div class="divider"></div>

<svelte:head><title>Dapps</title></svelte:head>
<div class="container bg-zinc-100 mx-auto min-h-full px-20 pb-20 pt-20">
<div class="flex justify-center"></div>  
<div class="mb-5 text-center">
<div class="text-4xl font-black ">MANAGE BY MSAMANAHCE</div>

<div class="divider"></div></div>

<div class="grid grid-cols-1 gap-3">
<label for="modal-create" class="btn btn-dark">PROCCESS</label>
<label for="modal-edit" class="btn btn-dark">EDIT PROCCESS</label>
<label for="modal-kill" class="btn btn-dark">DESTROY PROCCESS</label></div>
<div class="divider"></div>
<div class="mockup-code bg-dark text-primary-content">
{#await $api_store}<pre data-prefix="~>"><code></code></pre>    
{:then api} 
<pre data-prefix="~>"><code>{JSON.stringify(api, null, 4)}</code></pre>{/await}</div></div>
<div class="divider"></div>

<Modal key="modal-create" on:click={() => create()}>
<div slot="body" class="flex flex-col gap-7">
<input bind:value={my_id} type="text" placeholder="Input Number" class="block p-2.5 w-full text-sm text-gray-950 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
<textarea bind:value={my_data} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Text"></textarea></div></Modal>
<Modal key="modal-edit" on:click={() => edit()}>
<div slot="body" class="flex flex-col gap-7">
<input bind:value={edited_key} type="text" placeholder="Input Number/ID After Push Transaction" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
<textarea bind:value={edited_id} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write What Ever You Want With Text"></textarea></div></Modal>
<Modal key="modal-kill" on:click={() => kill()}>
<div slot="body" class="flex flex-col gap-7">
<input bind:value={kill_id} type="text" placeholder="Input Number/ID To Kill" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /></Modal>
