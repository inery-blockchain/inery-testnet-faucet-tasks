<script lang="ts">
	import { goto } from "$app/navigation";
    import Modal from "$lib/components/Modal.svelte";
    import { api_store } from "$lib/store";
    let api_result: {} = {res: "Please click button above"}

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
                    user: "agustina",
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
    <title>Example Dapp agustina</title>
</svelte:head>

<div class="container  mx-auto min-h-screen px-20 pb-20 pt-20">
	<!-- box title -->
	<div class="animate__animated animate__fadeIn animate__delay-1s mb-10 text-center">
		<div class="w-full">
			<div class="w-full h-11 rounded-t-lg bg-brown-200 flex justify-start items-center space-x-1.5 px-3">
				<span class="w-3 h-3 rounded-full bg-green-400"></span>
				<span class="w-3 h-3 rounded-full bg-blue-400"></span>
				<span class="w-3 h-3 rounded-full bg-yellow-400"></span>
			</div>
			<div class="bg-brown-100 border-t-0 rounded-b-lg w-full p-6">
				<div class="text-6xl animate__animated animate__fadeIn animate__delay-1s font-bold p-6 text-plate-700">
					Example Dapp By Agustina
				</div>
			</div>
		</div>
	</div>
	<!-- box app -->
	<div class="animate__animated animate__fadeIn animate__delay-2s mb-10">
		<div class="w-full">
			<div class="w-full h-11 rounded-t-lg bg-brown-200 flex justify-start items-center space-x-1.5 px-3">
				<span class="w-3 h-3 rounded-full bg-green-400"></span>
				<span class="w-3 h-3 rounded-full bg-blue-400"></span>
				<span class="w-3 h-3 rounded-full bg-yellow-400"></span>
			</div>
			<div class="bg-brown-100 border-t-0 rounded-b-lg w-full p-6">
					<div class="animate__animated animate__fadeIn animate__delay-2s">
						    <div class="mb-10 text-center">
							<span class="animate__animated animate__fadeIn animate__delay-2s inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-accent text-white rounded">Inery Task 5 Simple Dapp</span>
							<div class="mt-4 animate__animated animate__fadeIn animate__delay-2s bg-brown-300 rounded-lg py-5 px-6 mb-4 text-base text-gray-800 mb-3" role="alert">Click button below to begin CRUD Transaction.</div>
						    </div>
						    <div class="grid animate__animated animate__fadeIn animate__delay-2s grid-cols-4 gap-4">
							<label for="modal-create" class="btn btn-accent btn-outline">Create</label>
							<label for="modal-read" class="btn btn-accent btn-outline">Read</label>
							<label for="modal-update" class="btn btn-accent btn-outline">Update</label>
							<label for="modal-destroy" class="btn btn-accent btn-outline">Destroy</label>
						    </div>

						    <div class="divider"></div>

						    <!-- detailed -->
						    <div class="mockup-code bg-accent text-accent-content animate__animated animate__fadeIn animate__delay-2s">
							{#await $api_store}
							    <pre data-prefix="$"><code>Sending transaction...</code></pre>    
							{:then api} 
							    <pre data-prefix="$"><code>{JSON.stringify(api, null, 4)}</code></pre>    
							{/await}
						    </div>
					</div>
			</div>
		</div>
	</div>

</div>

<Modal modal_id="modal-create" modal_title="Create Record" on:click={() => create()}>
    <div slot="body" class="flex flex-col gap-4">
	<label class="label">
		<span class="label-text">Input ID :</span>
  	</label>
        	<input bind:value={create_id} type="text" placeholder="ID" class="input input-bordered input-accent w-full" />
	<label class="label">
		<span class="label-text">Account :</span>
  	</label>
        	<input type="text" placeholder="agustina" class="input input-bordered input-accent w-full" disabled />
	<label class="label">
	    <span class="label-text-alt">This is owner account.</span>
  	</label>
	<label class="label">
	    <span class="label-text">Memo :</span>
  	</label>
        	<textarea bind:value={create_data} class="textarea textarea-bordered textarea-accent w-full" placeholder="Memo"></textarea>
    </div>
</Modal>

<Modal modal_id="modal-read" modal_title="Read Record" on:click={() => read()}>
    <div slot="body" class="flex flex-col gap-4">
	<label class="label">
		<span class="label-text">ID :</span>
	</label>
		<input bind:value={read_id} type="text" placeholder="ID" class="input input-bordered input-accent w-full" />
	<label class="label">
	    <span class="label-text-alt">Enter the ID according to the previous transaction.</span>
  	</label>
    </div>
</Modal>

<Modal modal_id="modal-update" modal_title="Update Record" on:click={() => update()}>
    <div slot="body" class="flex flex-col gap-4">
	<label class="label">
		<span class="label-text">ID :</span>
	</label>
        <input bind:value={update_id} type="text" placeholder="ID" class="input input-bordered input-accent w-full" />
	<label class="label">
		<span class="label-text">Update Data :</span>
	</label>
        <textarea bind:value={update_data} class="textarea textarea-bordered textarea-accent w-full" placeholder="Update memo data"></textarea>
	 <label class="label">
		<span class="label-text-alt">This action will change the current data with spesific ID.</span>
	</label>
    </div>
</Modal>

<Modal modal_id="modal-destroy" modal_title="Destroy Record" on:click={() => destroy()}>
    <div slot="body" class="flex flex-col gap-4">
	<label class="label">
		<span class="label-text">ID :</span>
	</label>
        <input bind:value={destroy_id} type="text" placeholder="ID" class="input input-bordered input-accent w-full" />
	<label class="label">
		<span class="label-text-alt">This action will destroy your ID that you created before.</span>
	</label>
    </div>
</Modal>
