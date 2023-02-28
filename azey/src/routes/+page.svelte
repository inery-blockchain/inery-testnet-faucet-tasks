<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please use the button above to launch the Inery CRUD function"}

    let create_id: number
    let create_data: string

    let read_id: number

    let update_id: number
    let update_data: string

    let destroy_id: number

    async function create(){
        const response = await fetch("/api/create", {
            method: "POST",
            body: JSON.stringify({
                id: create_id,
                user: "azey",
                data: create_data
            }),
            headers:{
                'content-type': 'application/json'
            }
        })
        
        api_store.set(response.json())
    }

    async function read(){
        const response = await fetch("/api/read", {
            method: "POST",
            body: JSON.stringify({
                id: read_id,
            }),
            headers:{
                'content-type': 'application/json'
            }
        })

        api_store.set(response.json())
    }

    async function update(){
        const response = await fetch("/api/update", {
            method: "POST",
            body: JSON.stringify({
                id: update_id,
                data: update_data
            }),
            headers:{
                'content-type': 'application/json'
            }
        })

        api_store.set(response.json())
    }

    async function destroy(){
        const response = await fetch("/api/destroy", {
            method: "POST",
            body: JSON.stringify({
                id: destroy_id,
            }),
            headers:{
                'content-type': 'application/json'
            }
        })

        api_store.set(response.json())
    }

</script>

<section class="animated-background">
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
</section>

<div class="container bg-base-500 mx-auto min-h-screen px-20 pb-20 pt-20">
    <div class="mb-10 text-center">
        <div class="text-5xl font-bold ">Inery Dapps</div>
        <div class="mt-3">Please use one of the buttons below to initiate the blockchain transaction<br> Following the completion of the transaction, a blockchain log will be displayed at the bottom</div>
    </div>
    <div class="grid grid-cols-2 gap-2">
        <label for="modal-create" class="btn btn-primary">Write</label>
        <label for="modal-read" class="btn btn-info">Read</label>
        <label for="modal-update" class="btn btn-primary">Update</label>
        <label for="modal-destroy" class="btn btn-error">Delete</label>
    </div>
    <div class="divider"></div>
    <div class="mockup-code">
        {#await $api_store}
            <pre data-prefix="$"><code>Your transaction is being processed on the blockchain</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>

<Modal modal_id="modal-create" modal_title="Create a new record in IneryDB" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="azey" class="input input-bordered w-full max-w-xs" disabled />
        <textarea bind:value={create_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Read an IneryDB record by ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="IneryDB record should be updated using its ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="remove a record from IneryDB using its ID" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>