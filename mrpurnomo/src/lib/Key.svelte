<script lang="ts">
export let key:string 
export let button_close: string = "btn btn-secondary"
export let button_proccess: string = "btn btn-secondary"
</script>

<input type="checkbox" id="{key}" class="modal-toggle" />
<div class="modal modal-bottom">
<div class="modal-box relative"> 
<div class="modal-action">
         
<label on:click for ="{key}" class="{button_close}">Close</label></div>
<slot name="body"></slot>
<div class="modal-action">
<label on:click for="{key}" class="{button_proccess}">Proccess Transaction</label></div>
</div>
</div>