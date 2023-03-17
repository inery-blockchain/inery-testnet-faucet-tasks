<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please choose the action dude"}

    let ineryname: name
    let inerybauthor: string

    let ineryread_id: number

    let ineryupdate_id: number
    let ineryupdate_data: string

    let inerydestroy_id: number

    async function insert(){
        const response = await fetch("/api/insert", {
            method: "POST",
            body: JSON.stringify({
                ineryname: ineryname,
               ineryauthor: ineryauthor
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
                id: ineryread_id,
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
                id: ineryupdate_id,
                data: ineryupdate_data
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
                id: inerydestroy_id,
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
        <div class="text-4xl font-bold ">Todo Inery blockchain transaction </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="btn btn-primary">Insert data</label>
        <label for="modal-read" class="btn btn-info">Read data</label>
        <label for="modal-destroy" class="btn btn-error">Delete Data</label>
    </div>
    
    <div class="divider"></div>

    <!-- detailed -->
    <div class="mockup-code">
        {#await $api_store}
            <pre data-prefix="$"><code>Waiting your transaction to proceed on the blockchain..-_-</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>

<Modal modal_id="modal-create" modal_title="Create data" on:click={() => insert()}>
    <div slot="body" class="flex flex-col gap-4 modal-lg">
Name only allow lower characters + number no space.
        <input bind:value={ineryname} type="text" class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={ineryauthor} class="textarea textarea-bordered w-full" placeholder="Book Author..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Read data" on:click={() => get()}>
    <div slot="body" class="flex flex-col gap-4 modal-lg">
        <input bind:value={ineryread_id} type="text" class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update data" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={ineryupdate_id} type="text" class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={ineryupdate_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Destroy data" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={inerydestroy_id} type="text" class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>
