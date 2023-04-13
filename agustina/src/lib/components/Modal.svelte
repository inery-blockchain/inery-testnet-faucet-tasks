<script lang="ts">
    export let modal_id:string 
    export let modal_title: string
    export let action_button_class: string = "btn btn-accent"
</script>
<input type="checkbox" id="{modal_id}" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
        
    <label for="{modal_id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-4">{modal_title}</h3>
    <slot name="body"></slot>
    <div class="modal-action">
        <label on:click for="{modal_id}" class="{action_button_class}">Send Transaction</label>
    </div>
    </div>
</div>
