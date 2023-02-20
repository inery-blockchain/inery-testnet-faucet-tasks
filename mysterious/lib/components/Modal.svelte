<script lang="ts">
  export interface ModalDetails {
    modalId: string;
    modalTitle: string;
    actionButtonClass?: string;
  }

  export let modalData: ModalDetails = {
    modalId: "",
    modalTitle: "",
  };
</script>

<input type="checkbox" bind:id="modalData.modalId" class="modal-toggle" />

<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative">
    <label class="btn btn-sm btn-circle absolute right-2 top-2" for="{modalData.modalId}">✕</label>
    <h3 class="font-bold text-lg mb-4">{modalData.modalTitle}</h3>
    <slot name="body"></slot>
    <div class="modal-action">
      <label
        class="{modalData.actionButtonClass || 'btn btn-primary'}"
        on:click={() => (modalData.modalId.checked = false)}
      >
        Enter
      </label>
    </div>
  </div>
</div>