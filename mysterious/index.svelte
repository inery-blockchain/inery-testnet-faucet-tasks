// TypeScript code for modal component
export let modalId: string;
export let modalTitle: string;
export let actionButtonClass: string = "btn btn-primary";

<script>
import { writable } from 'svelte/store';

// Store to hold API response
const apiStore = writable("");

// Function to make API request for Write operation
async function writeToAPI(data: any) {
  try {
    const response = await fetch("API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    apiStore.set(JSON.stringify(result));
  } catch (error) {
    apiStore.set("Error: " + error.message);
  }
}

// Function to make API request for Read operation
async function readFromAPI(id: string) {
  try {
    const response = await fetch(`API_ENDPOINT/${id}`);
    const result = await response.json();
    apiStore.set(JSON.stringify(result));
  } catch (error) {
    apiStore.set("Error: " + error.message);
  }
}

// Function to make API request for Update operation
async function updateAPI(id: string, data: any) {
  try {
    const response = await fetch(`API_ENDPOINT/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    apiStore.set(JSON.stringify(result));
  } catch (error) {
    apiStore.set("Error: " + error.message);
  }
}

// Function to make API request for Delete operation
async function deleteFromAPI(id: string) {
  try {
    const response = await fetch(`API_ENDPOINT/${id}`, {
      method: "DELETE"
    });
    const result = await response.json();
    apiStore.set(JSON.stringify(result));
  } catch (error) {
    apiStore.set("Error: " + error.message);
  }
}
</script>
<!-- Svelte code for UI -->
<input type="checkbox" id="{modalId}" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative">
    <label for="{modalId}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-4">{modalTitle}</h3>
    <slot name="body"></slot>
    <div class="modal-action">
      <label on:click="{() => submitForm()}" for="{mod