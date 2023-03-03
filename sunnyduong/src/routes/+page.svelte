<script lang="ts">
	import { goto } from "$app/navigation";
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please choose the acion"}

    let create_id: number
    let create_uname: string
    let create_uid: number
    let create_dep: string

    let read_id: number

    let update_id: number
    let update_uname: string
    let update_dep: string

    let destroy_id: number

    async function create(){
        
        api_store.set(
            fetch("/api/create", {
                method: "POST",
                body: JSON.stringify({
                    id: create_id,
                    user: "sunnyduong",
		    uname: create_uname,
                    uid: create_uid,
		    dep: create_dep
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
                    uname: update_uname,
		    dep: update_dep
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
    <title>Simple Inery DApp</title>
</svelte:head>

<div class="container bg-base-200 mx-auto min-h-screen px-20 pb-20 pt-20 bgimg">

    <div class="flex justify-center">
        <div on:click={() => goto("https://github.com/sunnyduong")} class="avatar relative cursor-pointer mb-4">
            
          </div>
    </div>
    <div class="mb-10 text-center">
        <div class="text-4xl font-bold ">Very Simple Employee Management System :)</div>
        <div class="mt-4">This program can Create, Read, Update And Delete Employee Info</div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="button">CREATE EMP</label>
        <label for="modal-read" class="button">GET INFO</label>
        <label for="modal-update" class="button">UPDATE EMP</label>
        <label for="modal-destroy" class="button">DELETE EMP</label>
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

<Modal modal_id="modal-create" modal_title="Create New Employee" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="sunnyduong" class="input input-bordered w-full max-w-xs" disabled />
	<input bind:value={create_uid} type="text" placeholder="Type the UID..." class="input input-bordered w-full max-w-xs" />
	<input bind:value={create_uname} type="text" placeholder="Type user name..." class="input input-bordered w-full max-w-xs" />
	<input bind:value={create_dep} type="text" placeholder="Type the department..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Read Emplyee info by ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the record ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Record on IneryDB by its ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <input bind:value={update_uname} type="text" placeholder="Type the Username..." class="input input-bordered w-full max-w-xs" />
        <input bind:value={update_dep} type="text" placeholder="Type new department..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Delete user" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type the User ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>
