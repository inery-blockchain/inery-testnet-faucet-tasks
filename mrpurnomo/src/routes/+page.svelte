<script lang="ts">
    import "../apps/app.css";
    import Modal from "$lib/Key.svelte";
    import Loader from "$lib/Loader.svelte";

    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
    import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";
    
    export let button_proccess: string = "btn btn-secondary"

    const api_store: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("CLICK FOR PROCCESING TO START USING DAPPS")

    let key_id: number
    let key_data: string

    let isLoader = false;
    let isSuccess = true;

    async function create() {
        try {
            const body = { id: key_id,user: "", data: key_data }; //your account name

            isLoader = true;

            const result = await fetch("config/push", {
                method: "POST",
                body: JSON.stringify(body), // change this user with your name
                headers: {'content-type': 'application/json'}
            });

            const json = await result.json();

            isLoader = false;
            
            api_store.set(json);
        } catch (err) {
            isLoader = false;
        }
    }
</script>

<svelte:head>
    <title>MrPurnomo - Dapps</title>
</svelte:head>

<div class="container bg-zinc-1000 mx-auto min-h-full px-20 pt-20 pb-20"> <!-- style="height: 100vh; background-color: red" -->
    <div class="mb-5 text-center">
       
        <div class="text-4xl font-bold ">BUILD BY MRPURNOMO </div>
        
    </div>
    
    <!-- show start -->
    
    <div class="divider"></div>

    <div class="mockup-code bg-secondary text-primary-content">
        <pre><code>TRANSACTION WILL SHOW HERE</code></pre>
        {#await $api_store}
            <pre data-prefix=">"><code></code></pre>    
        {:then api} 
            <pre data-prefix=">"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
    
    <div class="divider"></div>

    <!-- end show -->
    
    <div class="flex justify-center mb-5" style="{isLoader === false ? "display: none;" : ""}">
        <Loader />
    </div>

    <!-- start button -->
    
    <div class="divider"></div>

    <div class="grid grid-cols-1 gap-4">
        <label for="modal-create" class="btn btn-secondary">CLICK FOR PROCCESSING</label>
    </div>

    <!-- end button -->
</div>

<Modal key="modal-create">
    <div slot="body" class="flex flex-col gap-5">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IF ERROR AFTER PROCCESS TRANSACTION, CHANGE WITH ANOTHER ID</label>
        <input bind:value={key_id} type="text" placeholder="Enter ID Example : 26" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">"ENTER ID" (MANDATORY) "ENTER DATA" (OPTIONAL)</label>
        <textarea rows="10" bind:value={key_data} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Data To Send Example : Tester"></textarea>
    </div>

    <div slot="footer" class="flex flex-col gap-5">
        <div class="modal-action">
            <label on:click={create} for="modal-create" class="{button_proccess}">Proccess Transaction</label>
        </div>
    </div>
</Modal>
