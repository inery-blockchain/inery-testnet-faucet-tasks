<script lang="ts">
	import { goto } from "$app/navigation";
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Lets Click The Button Above To Run Inery CRUD Function"}

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
                    user: "diefky1212",
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
    <title>Diefky1212 - Inery Task 5</title>
</svelte:head>

<div class="container bg-gradient-to-r from-neutral-800 via-slate-400 to-neutral-800 mx-auto min-h-screen px-12 pb-20 pt-20">
    <div class="flex justify-evenly">
        <div on:click={() => goto("https://github.com/Diefky/inery-testnet-faucet-tasks/tree/task5/Diefky1212")} class="avatar relative cursor-pointer mb-4">
            <div class="w-8 h-8 rounded-full absolute z-20 bottom-0 right-0">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />	    
            </div>
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://avatars.githubusercontent.com/u/13850553?s=400&u=6632e6769512b9872cab8d2251ed56f2e7fc92ed&v=4" />   
            </div>		
           </div>
    </div>
    <div class="mb-10 text-center">
        <div class="text-blue-700 text-4xl font-bold ">Inery Crud Dapps On Task5 By Diefky1212</div>
        <div class="text-indigo-50 mt-4">Click the button below to run a simple transaction with Inery Blockchain <br> After the transaction complete you will see the logs</div>
    </div>

    <div class="grid grid-cols-4 gap-8">
        <label for="modal-create" class="btn btn-primary btn-sm">BUILD</label>
        <label for="modal-read" class="btn btn-success btn-sm">VIEW</label>
        <label for="modal-update" class="btn btn-info btn-sm">UPDATE</label>
        <label for="modal-destroy" class="btn btn-error btn-sm">DESTROY</label>
    </div>
    
    <div class="divider"></div>

    <!-- detailed -->
    <div class="mockup-code bg-neutral-800 text-primary-content">
        {#await $api_store}
            <pre data-prefix="$"><code>Waiting your transaction to proceed on the blockchain..</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>

<Modal modal_id="modal-create" modal_title="Build New Record on Inery" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="diefky1212" class="input input-bordered w-full max-w-xs" disabled />
        <textarea bind:value={create_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="View Record by your ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Record on Inery by your ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Destroy Record on Inery by your ID" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>
