<script lang="ts">
    export let key:string 
    export let button_close: string = "btn btn-secondary"
</script>

<input type="checkbox" id="{key}" class="modal-toggle">
<div class="modal modal-bottom">
    <div class="modal-box relative" style="background-color: dark">
        <div class="modal-action">     
            <label on:click for="{key}" class="{button_close}">Close</label>
        </div>
        <slot name="body"></slot>
        <slot name="footer"></slot>
    </div>
</div>
