<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please click button above to run Inery CRUD function"}

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
                user: "kimkhoathao",
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



<div class="container bg-base-200 mx-auto min-h-screen px-20 pb-20 pt-20">
    <div class="mb-10 text-center">
        <div class="text-4xl font-bold ">Inery Simple CRUD DAPP</div>
        <div class="mt-4">Click one of the button below to run the blockchain transaction</div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="btn btn-primary">Create</label>
        <label for="modal-read" class="btn btn-info">Read</label>
        <label for="modal-update" class="btn btn-primary">Update</label>
        <label for="modal-destroy" class="btn btn-error">Destroy</label>
    </div>
    
    <div class="divider"></div>

    <!-- detailed -->
    <div class="mockup-code">
        {#await $api_store}
            <pre data-prefix="$"><code>Waiting your transaction to proceed on the blockchain..</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>

<Modal modal_id="modal-create" modal_title="Create New Record" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="kimkhoathao" class="input input-bordered w-full max-w-xs" disabled />
        <textarea bind:value={create_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Read Record by ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Record by ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Destroy Record by ID" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>