<script lang="ts">
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";

export const key: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("No Transaction")
import "../style.css";

export let proccess: string = "button-85"

// All Config
let my_id: number
let my_data: string

const user = "msamanahce";
const method = "POST";

// All Proccessing
async function create(){key.set(fetch("proccess/destroy/edit/sending", {method,body: JSON.stringify({id: my_id,user,data: my_data}), headers:{'content-type': 'application/json'}}).then((res) => {return res.json()}))}

</script>

<svelte:head><title>Dapps Inery Task 5</title></svelte:head>
<div class="min-h-full px-20 pb-20 pt-20">
<div class="flex justify-center"></div>  

<div class="grid grid-cols-1 gap-3">
    <label on:click ="{create}" class={proccess}><center>MAKE</center></label>
</div>

<div class="divider"></div>
<div style="text-align:center">
        <form style="rounded-input">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
        <input bind:value={my_id} type="text" placeholder="ENTER NUMBER" class="button-85" />
     </form>
    </div>
    
<div class="divider"></div>

<div class="button-85">
{#await $key}<pre data-prefix="~>"><code></code></pre>    
{:then api} 
<pre data-prefix="~>"><code>{JSON.stringify(api, null, 4)}</code></pre>{/await}</div></div>
