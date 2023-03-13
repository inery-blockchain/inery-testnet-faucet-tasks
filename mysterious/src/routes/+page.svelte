<script lang="ts">
	import { goto } from "$app/navigation";
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please click button above to run"}

    let create_id: number
    let create_data: string

    let read_id: number

    let update_id: number
    let update_data: string

    let destroy_id: number

    async function create(){
        
        api_store.set(
            fetch("/api/create", {
                method: "POST",
                body: JSON.stringify({
                    id: create_id,
                    user: "mysterious",
                    data: create_data
                }),
                headers:{
                    'content-type': 'application/json'
                }
            }).then((res) => {
                return res.json()
            })
        )
    }

    async function read(){
        api_store.set(
            fetch("/api/read", {
                method: "POST",
                body: JSON.stringify({
                    id: read_id,
                }),
                headers:{
                    'content-type': 'application/json'
                }
            }).then((res) => {
                return res.json()
            })
        )
    }

    async function update(){
        api_store.set(
            fetch("/api/update", {
                method: "POST",
                body: JSON.stringify({
                    id: update_id,
                    data: update_data
                }),
                headers:{
                    'content-type': 'application/json'
                }
            }).then((res) => {
                return res.json()
            })
        )
    }

    async function destroy(){
        api_store.set(
            fetch("/api/destroy", {
                method: "POST",
                body: JSON.stringify({
                    id: destroy_id,
                }),
                headers:{
                    'content-type': 'application/json'
                }
            }).then((res) => {
                return res.json()
            })
        )

    }

</script>

<svelte:head>
    <title>Inery Dapp</title>
</svelte:head>

<div class="bg-gradient-to-t from-pink-500 mx-auto min-h-screen px-20 pb-20 pt-20">
    <div class="flex justify-center">
        <div on:click={() => goto("https://github.com/inery-blockchain")} class="avatar relative cursor-pointer mb-4">
            <div class="w-8 h-8 rounded-full absolute z-20 bottom-0 right-0">
            </div>
            <div class="w-30 mask mask-box">
            </div>
          </div>
    </div>
    <div class="mb-4 text-left">
        <div class="text-5xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 text-center text-transparent bg-clip-text">INERY BLOCKCHAIN</div>
        <div class="text-5xl font-bold bg-gradient-to-r from-pink-500 bg-clip-text text-transparent text-center">Inery Crud Dapps Mysterious</div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="btn btn-info">CREATE</label>
        <label for="modal-read" class="btn btn-info">READ</label>
        <label for="modal-update" class="btn btn-info">UPDATE</label>
        <label for="modal-destroy" class="btn btn-info">DESTROY</label>
    </div>
    
    <div class="divider"></div>

    <!-- detailed -->
    <div class="mockup-code btn-info">
        {#await $api_store}
            <pre data-prefix="$"><code>Waiting your transaction to proceed on the blockchain..</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>

<Modal modal_id="modal-create" modal_title="Create New Record on IneryDB" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="mysterious" class="input input-bordered w-full max-w-xs" disabled />
        <textarea bind:value={create_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Read Record on IneryDB by its ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
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