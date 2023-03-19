<script lang="ts">
	import { goto } from "$app/navigation";
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
        
        api_store.set(
            fetch("/api/create", {
                method: "POST",
                body: JSON.stringify({
                    id: create_id,
                    user: "mbokde",
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
<div class="container bg mx-auto min-h-screen px-20 pb-20 pt-20">
    <div class="flex justify-center">
            <div class="w-24 mask mask-box">
              <img src="https://avatars.githubusercontent.com/u/97181725?v=4" />
            </div>
    </div>
    <div class="mb-10 text-center">
        <div class="text-4xl font-bold ">Simple Transaction</div>
        <div class="mt-4">Please Click Button To Run Transaction</div>
    </div>

    <div class="grid grid-cols-1 gap-8">
        <label for="modal-create" class="btn">create transaction</label>
        <label for="modal-update" class="btn">update transaction</label>
        <label for="modal-destroy" class="btn">destroy transaction</label>
    </div>
    
    <div class="divider"></div>

    <!-- detailed -->
    <div class="mockup-code">
        {#await $api_store}
            <pre data-prefix="$"><code>Please waiting your transaction...</code></pre>    
        {:then api} 
            <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
        {/await}
    </div>
</div>

<Modal modal_id="modal-create" modal_title="Create transaction" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type Your ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update transaction" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type Your ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Destroy transaction" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type Your ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>