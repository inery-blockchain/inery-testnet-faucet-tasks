import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { TransactResult } from "ineryjs/dist/ineryjs-api-interfaces";
import type { PushTransactionArgs, ReadOnlyTransactResult } from "ineryjs/dist/ineryjs-rpc-interfaces";

export const api_store: Writable<Promise<TransactResult | PushTransactionArgs | ReadOnlyTransactResult>> = writable("Your transaction details will appear here")