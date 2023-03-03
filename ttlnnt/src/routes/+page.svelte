<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please choose the action"}

    let bname: name
    let bauthor: string

    let read_id: number

    let update_id: number
    let update_data: string

    let destroy_id: number

    async function insert(){
        const response = await fetch("/api/insert", {
            method: "POST",
            body: JSON.stringify({
                bname: bname,
                bauthor: bauthor
            }),
            headers:{
                'content-type': 'application/json'
            }
        })
        
        api_store.set(response.json())
    }

    async function get(){
        const response = await fetch("/api/get", {
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
        <div class="text-4xl font-bold ">Simple Book Management.</div>
        <div class="mt-4">Please click one of button below to run the blockchain transaction <br> after the transaction executed you will see a blockchain log in the bottom</div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="btn btn-primary">Insert New Book</label>
        <label for="modal-read" class="btn btn-info">Get Book Info By ID</label>
        <label for="modal-destroy" class="btn btn-error">Delete Book By ID</label>
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

<Modal modal_id="modal-create" modal_title="Create New Book on IneryDB" on:click={() => insert()}>
    <div slot="body" class="flex flex-col gap-4 modal-lg">
Name only allow lower characters + number no space.
        <input bind:value={bname} type="text" placeholder="bookname123" class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={bauthor} class="textarea textarea-bordered w-full" placeholder="Book Author..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Get book info by ID" on:click={() => get()}>
    <div slot="body" class="flex flex-col gap-4 modal-lg">
        <input bind:value={read_id} type="text" placeholder="Type the book ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Record on IneryDB by its ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Destroy Record on IneryDB by its ID" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>
