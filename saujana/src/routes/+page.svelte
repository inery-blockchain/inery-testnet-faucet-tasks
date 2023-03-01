<script lang="ts">
	import { goto } from "$app/navigation";
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please click button to get your push transaction!!"}
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
                    user: "saujana",
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
    <title>Saujana Dapps</title>
</svelte:head>

  <body id="home" class="scrollspy">

    <!-- navbar -->
    <div class="navbar-fixed">
      <nav class="blue darken-2">
        <div class="container">
          <div class="nav-wrapper">
            <a href="#home" class="brand-logo">SAUJANA</a>
            <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a href="https://twitter.com/SaujanaOK">Twitter</a></li>
              <li><a href="https://fb.com/allampani">Facebook</a></li>
              <li><a href="https://discordapp.com/users/815456507113504789">Discord</a></li>
              <li><a href="https://t.me/SaujanaOK">Telegram</a></li>
              <li><a href="https://github.com/SaujanaOK">Github</a></li></ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- sidenav -->
    <ul class="sidenav" id="mobile-nav">
      <li><a href="https://twitter.com/SaujanaOK">Twitter</a></li>
      <li><a href="https://fb.com/allampani">Facebook</a></li>
      <li><a href="https://discordapp.com/users/815456507113504789">Discord</a></li>
      <li><a href="https://t.me/SaujanaOK">Telegram</a></li>
      <li><a href="https://github.com/SaujanaOK">Github</a></li>
    </ul>

<div class="container mx-auto min-h-screen px-20 pb-20 pt-20">
    <div class="flex justify-center">
             <div class="w-24 mask mask-square bordered">
              <img src="static/favicon.png" />
            </div>
          </div>
    </div>
    <div class="mb-10 text-center">
        <div class="text-4xl  animate__animated animate__fadeIn animate__delay-1s text-yellow-400 font-bold ">
        Dapp Inery Task 5 saujana
        </div>
        <div class="mt-4  animate__animated animate__fadeIn animate__delay-1s text-white ">Click one of the button below to run the blockchain transaction</div>
    </div>

    
        <div class="grid animate__animated animate__fadeIn animate__delay-2s grid-cols-4 gap-4">
            <label for="modal-create" class="btn bg-white text-red-500 btn-error">Create</label>
            <label for="modal-read" class="btn bg-white text-red-500 btn-error">View</label>
            <label for="modal-update" class="btn bg-white text-red-500 btn-error">Update</label>
            <label for="modal-destroy" class="btn bg-white text-red-500 btn-error">Delete</label>
        </div>
    
    <div class="divider"></div>
            <!-- detailed -->
            <div class="mockup-code animate__animated animate__fadeIn animate__delay-3s" >
                {#await $api_store}
                    <pre data-prefix="$"><code>Wait For The Transaction Buddy!!</code></pre>    
                {:then api} 
                    <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
                {/await}
            </div>
    
</div>

<Modal modal_id="modal-create" modal_title="Build New Record on Inery" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={create_id} type="text" placeholder="Type ID" class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="saujana" class="input input-bordered w-full max-w-xs" disabled />
        <textarea bind:value={create_data} class="textarea textarea-bordered w-full" placeholder="Type the details"></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="View Record by ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type ID" class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Record by ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type ID" class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_data} class="textarea textarea-bordered w-full" placeholder="Type the data..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Delete Record by ID" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={destroy_id} type="text" placeholder="Type ID" class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

    <!-- footer -->
    <footer class="blue darken-2 white-text center">
      <p class="flow-text">Inery DAPPS Program By Saujana - Copyright 2023.</p>
    </footer>