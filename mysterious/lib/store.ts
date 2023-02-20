import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { TransactOutput, PushTransactionInput, ReadOnlyResult } from "ineryjs/dist/ineryjs-api-interfaces";

export const transactionData: Writable<Promise<TransactOutput | PushTransactionInput | ReadOnlyResult>> = writable("Starting now...");