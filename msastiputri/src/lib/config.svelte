<script lang="ts">
export let key:string 
export let closing: string = "btn btn-warning"
export let button_proccess: string = "btn btn-warning"
</script>

<input type="checkbox" id="{key}" class="modal-toggle" />
<div class="modal modal-bottom">
<div class="modal-box relative"> 
<div class="modal-action">
         
<label on:click for ="{key}" class="{closing}">Back</label></div>
<slot name="body"></slot>
<div class="modal-action">
<label on:click for="{key}" class="{button_proccess}">PROCCESS</label></div>
</div>
</div>