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
                    user: "sunnyduong",
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
<style type="text/css">
.bgimg {
    background-image: url('../bg1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>

<svelte:head>
    <title>Inery Task 5</title>
</svelte:head>

<div class="container bg-base-200 mx-auto min-h-screen px-20 pb-20 pt-20 bgimg">

    <div class="flex justify-center">
        <div on:click={() => goto("https://github.com/sunnyduong")} class="avatar relative cursor-pointer mb-4">
            
          </div>
    </div>
    <div class="mb-10 text-center">
        <div class="text-4xl font-bold ">Inery Task 5</div>
        <div class="mt-4">Please Click Button To Run The Blockchain Transaction</div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="button">CREATE</label>
        <label for="modal-read" class="button">READ</label>
        <label for="modal-update" class="button">UPDATE</label>
        <label for="modal-destroy" class="button">DESTROY</label>
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

<Modal modal_id="modal-create" modal_title="Create New Record on IneryDB" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="sunnyduong" class="input input-bordered w-full max-w-xs" disabled />
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
