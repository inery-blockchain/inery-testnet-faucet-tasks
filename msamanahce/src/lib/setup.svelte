<script lang="ts">
export let key:string 
export let button_proccess: string = "btn btn-dark"
</script>
<input type="checkbox" id="{key}" class="modal-toggle" />
<div class="modal modal-top black">
<div class="modal-box relative"> 
<slot name="body"></slot>
<div class="modal-action">
<label on:click for="{key}" class="{button_proccess}">PROCCESS & EXIT</label></div></div></div>