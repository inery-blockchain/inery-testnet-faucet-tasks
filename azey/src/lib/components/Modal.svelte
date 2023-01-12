<script lang="ts">
    export interface Modal {
        modalId: string;
        modalTitle: string;
        actionButtonClass?: string;
    }
    export let modal: Modal = {
        modalId: '',
        modalTitle: '',
    };
</script>
<input type="checkbox" [id]="modal.modalId" class="modal-toggle" />

<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
    <label [for]="modal.modalId" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-4">{{ modal.modalTitle }}</h3>
    <ng-content select="[slot='body']"></ng-content>
    <div class="modal-action">
        <label (click)="modal.modalId.checked = false" [class]="modal.actionButtonClass || 'btn btn-primary'">Submit</label>
    </div>
    </div>
</div>