<script lang="ts">
    import "../config/config.css";
    import Loader from "../loading/Loader.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
    import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";
    export let button_proccess: string = "btn btn-secondary"
    
    const api: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("TRANSACTION WILL SHOW HERE")
    const user ='mrpurnomo'; //your account name
    let key_id: number
    let key_data: string
    let isLoader = false;
    let isSuccess = true;

    async function create() {
    try {const body = { id: key_id,user, data: key_data }; 
    isLoader = true;
    const result = await fetch("config/push", {
    method: "POST",body: JSON.stringify(body), // change this user with your name
    headers: {'content-type': 'application/json'}});
    const json = await result.json();
    isLoader = false; api.set(json); } catch (err) {
    isLoader = false;}}
</script>

<div class="container bg-zinc-1000 mx-auto min-h-full px-20 pt-20 pb-20"> <!-- style="height: 100vh; background-color: red" -->
<div style="text-align:center">
    <form style="margin: auto; width: 180px;">
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input bind:value={key_id} type="text" placeholder="Enter ID" class="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input bind:value={key_data} class="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Data"/>
</form>
</div>
    <!-- start button -->
    <div class="container bg-zinc-1000 mx-auto min-h-full px-20 pt-5 pb-5">
    <div class="grid grid-cols-1 gap-4">
    <div style="text-align:center">
    <label on:click={create} class="{button_proccess}">PROCCESS</label>
    </div>
    </div>
</div>
    <!-- end button -->
<div class="line-5"></div>
<div class="flex justify-center mb-5" style="{isLoader === false ? "display: none;" : ""}">
<Loader />
</div>

<div style="text-align:center">
<div class="bg-danger text-secondary-content">
{#await $api}
<pre data-prefix=">"><code></code></pre>    
{:then api} 
<pre data-prefix=">"><code>{JSON.stringify(api, null, 1)}</code></pre>    
{/await}
</div>
</div>
<div class="line-5"></div>
</div>
