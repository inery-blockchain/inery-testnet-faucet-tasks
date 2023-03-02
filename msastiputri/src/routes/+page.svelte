<script lang="ts">

import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import "../default/config.css";
export let button_proccess: string = "button-29"
export const config: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("Waiting...")

let id: number

// config for make a trasaction
async function create(){
config.set(
fetch("config/send", {method: "POST",
body: JSON.stringify({id: id,user: "msastiputri",}), 
headers:{'content-type': 'application/json'}}).then((res) => {
return res.json()}))}


// config for kill transaction
async function kill(){
config.set(
fetch("config/kill", {method: "POST",
body: JSON.stringify({id: id,}),
headers:{'content-type': 'application/json'}}).then((res) => {
return res.json()}))}
</script>

<div class="container bg-zinc-1100 mx-auto min-h-full px-10 pb-20 pt-30">  
<div class="mb-6 text-center">
    <div style="text-align:center">
    <form style="margin: auto; width: 185px;">
    <div class="divider"></div>
    <input bind:value={id} type="text" placeholder="ENTER NUMBER" class="block p-3 text-sm border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    <div class="divider"></div>
</form>
</div>
</div>
<div class="grid grid-cols-2 gap-2">
<label on:click={create} class="{button_proccess}">PROCCESS</label>
<label on:click={kill} class="{button_proccess}">KILL</label>
</div>
<div class="divider"></div>
{#await $config}<pre data-prefix="=>"><code></code></pre>    
{:then api} 
<pre data-prefix="=>"><code>{JSON.stringify(api, null, 3)}</code></pre>{/await}</div>
 