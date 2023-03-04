<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please click button above to run Inery transaction"}
    
    let insert_id: number
    let insert_stuid: number
    let insert_stuname: string
    let insert_ststate: string
    let insert_marks: number

    let read_id: number

    let update_id: number
    let update_stuname: string
    let update_ststate: string
    let update_marks: number

    let del_id: number

    async function create(){
        const response = await fetch("/api/insert", {
            method: "POST",
            body: JSON.stringify({
                id: insert_id,
                user: "thanhtamdc",
                stuid: insert_stuid,
		stuname: insert_stuname,
		ststate: insert_ststate,
		marks: insert_marks
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
                stuname: update_stuname,
		ststate: update_ststate,
		marks: update_marks
            }),
            headers:{
                'content-type': 'application/json'
            }
        })

        api_store.set(response.json())
    }

    async function destroy(){
        const response = await fetch("/api/del", {
            method: "POST",
            body: JSON.stringify({
                id: del_id,
            }),
            headers:{
                'content-type': 'application/json'
            }
        })

        api_store.set(response.json())
    }

</script>

<style type="text/css">
.bgimg {
    background-image: url('../bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}

.button1:hover {
  background-color: #4CAF50;
  color: white;
}

.button2 {
  background-color: white;
  color: black;
  border: 2px solid #008CBA;
}

.button2:hover {
  background-color: #008CBA;
  color: white;
}

.button3 {
  background-color: white;
  color: black;
  border: 2px solid #f44336;
}

.button3:hover {
  background-color: #f44336;
  color: white;
}

.button4 {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}

.button4:hover {
  background-color: #555555;
  color: white;
}
</style>

<title>Inery App</title>
<div class="container bg-base-200 mx-auto min-h-screen px-20 pb-20 pt-20 bgimg">
    <div class="mb-10 text-center">
        <div class="text-4xl font-bold ">Student Management System</div>
        <div class="mt-4">This is a simple student management system using Inery database</div>
    </div>

    <div class="grid grid-cols-4 gap-4">
        <label for="modal-create" class="button button1">CREATE NEW STUDENT PROFILE</label>
        <label for="modal-read" class="button button2">GET STUDENT PROFILE</label>
        <label for="modal-update" class="button button4">UPDATE STUDENT PROFILE</label>
        <label for="modal-destroy" class="button button3">DELETE STUDENT PROFILE</label>
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
    <div class="divider"></div>

</div>

<Modal modal_id="modal-create" modal_title="Create New Student Profile" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={insert_id} type="text" placeholder="ID..." class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="thanhtamdc" class="input input-bordered w-full max-w-xs" disabled />
        <input bind:value={insert_stuid} type="text" placeholder="Student ID..." class="input input-bordered w-full max-w-xs" />
	<input bind:value={insert_stuname} type="text" placeholder="Student Name..." class="input input-bordered w-full max-w-xs" />
	<input bind:value={insert_ststate} type="text" placeholder="State..." class="input input-bordered w-full max-w-xs" />
	<input bind:value={insert_marks} type="text" placeholder="Marks..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Get Student Info by ID" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={read_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Student Info by its ID" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={update_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
        <textarea bind:value={update_stuname} class="textarea textarea-bordered w-full" placeholder="Student Name..."></textarea>
	<textarea bind:value={update_ststate} class="textarea textarea-bordered w-full" placeholder="State..."></textarea>
	<textarea bind:value={update_marks} class="textarea textarea-bordered w-full" placeholder="Marks..."></textarea>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Delete Student Info by its ID" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
        <input bind:value={del_id} type="text" placeholder="Type the ID..." class="input input-bordered w-full max-w-xs" />
    </div>
</Modal>
