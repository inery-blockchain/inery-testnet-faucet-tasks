<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please use the button above to launch the Inery CRUD function."}
    let write_id: number
    let write_data: string
    let read_id: number
    let update_id: number
    let update_data: string
    let delete_id: number

    async function performCRUD(method: string, id: number, data?: string) {
        let url = `/api/${method}`;
        let body = { id };
        if (method === "write") {
            body = { id, user: "azey", data };
        }
        if (method === "update") {
            body = { id, data };
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        api_store.set(response.json());
    }
    async function write() {
        performCRUD("write", write_id, write_data);
    }
    async function read() {
        performCRUD("read", read_id);
    }
    async function update() {
        performCRUD("update", update_id, update_data);
    }
    async function delete() {
        performCRUD("delete", delete_id);
    }
</script>
<div class="container bg-base-200 mx-auto min-h-screen px-20 pb-20 pt-20">
    <div class="mb-10 text-center">
        <div class="text-4xl font-bold ">Inery CRUD </div>
        <div class="mt-4">Please use one of the buttons below to initiate the blockchain transaction. <br> Following the completion of the transaction, a blockchain log will be displayed at the bottom.</div>
    </div>
    <div class="grid grid-cols-4 gap-4">
        <label for="modal-write" class="btn btn-primary">Write</label>
        <label for="modal-read" class="btn btn-info">Read</label>
        <label for="modal-update" class="btn btn-primary">Update</label>
        <label for="modal-delete" class="btn btn-error">Delete</label>
    </div>  
    <div class="divider"></div>
    <div class="mockup-code">
        {#await $api_store}
            <pre data-prefix="$"><code>Your transaction is being processed on the blockchain.</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>
<Modal modal_id="modal-write" modal_title="Create a new record in IneryDB." on:click={() => write()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={write_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="azey" class="input input-bordered w-full max-w-xs" disabled />
        <textarea bind:value={write_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>
<Modal modal_id="modal-read" modal_title="Read an IneryDB record by ID." on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>
<Modal modal_id="modal-update" modal_title="IneryDB record should be updated using its ID." on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>
<Modal modal_id="modal-delete" modal_title="remove a record from IneryDB using its ID" on:click={() => delete()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={delete_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>