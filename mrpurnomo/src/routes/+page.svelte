<script lang="ts">
import "../apps/app.css";
import Modal from "$lib/Key.svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";
export const api_store: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("CLICK FOR PROCCESING TO START USING DAPPS")

let key_id: number
let key_data: string

async function create(){
api_store.set(
fetch("config/push", {method: "POST",
body: JSON.stringify({id: key_id,user: "",data: key_data}), // change this user with your name
headers:{'content-type': 'application/json'}}).then((res) => {
return res.json()}))}
</script>

<svelte:head>
<title>MrPurnomo - Dapps</title>
</svelte:head>

<div class="container bg-zinc-1000 mx-auto min-h-full px-20 pb-20 pt-20">
<div class="flex justify-center"></div>  
<div class="mb-5 text-center">
<div class="text-4xl font-bold">SIMPLE DAPPS FOR TASK 5 INERY PROJECT</div>
<div class="text-4xl font-bold ">BUILD BY MRPURNOMO</div>
<div class="divider"></div>
</div>
<div class="grid grid-cols-1 gap-4">
<label for="modal-create" class="btn btn-secondary">CLICK FOR PROCCESSING</label></div>
<div class="divider"></div>
<div class="mockup-code bg-secondary text-primary-content">
<pre><code>TRANSACTION WILL SHOW HERE</code></pre>
        {#await $api_store}
            <pre data-prefix=">"><code></code></pre>    
        {:then api} 
            <pre data-prefix=">"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}</div></div>
<Modal key="modal-create" on:click={() => create()}>
<div slot="body" class="flex flex-col gap-5">
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IF ERROR AFTER PROCCESS TRANSACTION, CHANGE WITH ANOTHER ID</label>
<input bind:value={key_id} type="text" placeholder="Enter ID Example : 26" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">"ENTER ID" (MANDATORY) "ENTER DATA" (OPTIONAL)</label>
<textarea bind:value={key_data} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Data To Send Example : Tester"></textarea></div>
</Modal>
