/**
 * @typedef {Object} Action
 * @property {string} account
 * @property {string} name
 * @property {Array<Authorization>} authorization
 * @property {any} data
 * @property {string} [hex_data]
 */
/**
 * @typedef {SerializedAction}
 * @property {string} account
 * @property {string} name
 * @property {Array<Authorization>} authorization
 * @property {any} data
 */
/** Arguments to `getRequiredKeys` 
 * @typedef {Object} AuthorityProviderArgs
 * *Transaction that needs to be signed
 * @property {any} transaction
 * *Public keys associated with the private keys that the `SignatureProvider` holds
 * @property {Array<string>} availableKeys
*/
/**
 * @typedef {Object} BinaryAbi
 * @property {string} accountName
 * @property {Uint8Array} abi
 */
/**
 * @typedef {Object} SignArgs
 * @property {string} chainId
 * @property {Array<string>} requiredKeys
 * @property {Uint8Array} serializedTransaction
 * @property {Uint8Array} [serializedContextFreeData]
 * @property {Array<BinaryAbi>} abis
 */
/**
 * @typedef {Object} SignResult
 * @property {Array<string>} signatures
 * @property {Uint8Array} serializedTransaction
* @property {Uint8Array} serializedContextFreeData
 */
/**
 * @typedef {Object} ResourcePayer
 * @property {string} payer
 * @property {number} max_net_bytes
 * @property {number} max_cpu_us
 * @property {number} max_memory_bytes
 */
/**
 * @typedef {Object} Transaction
 * @property {string} [expiration]
 * @property {number} [ref_block_num]
 * @property {number} [ref_block_prefix]
 * @property {number} [max_net_usage_words]
 * @property {number} [max_cpu_usage_ms]
 * @property {number} [delay_sec]
 * @property {Array<Action>} [context_free_actions]
 * @property {Array<Uint8Array>} [context_free_data]
 * @property {Array<Action>} actions
 * @property {Array<any>} [transaction_extensions]
 * @property {ResourcePayer} [resource_payer]
 */

 /**
  * @summary Optional transact configuration object 
  * @typedef {Object} TransactConfig
  * @property {boolean} [broadcast]
  * @property {boolean} [sign]
  * @property {boolean} [readOnlyTrx]
  * @property {boolean} [returnFailureTraces]
  * @property {Array<string>} [requiredKeys]
  * @property {boolean} [compression]
  * @property {number} [blocksBehind]
  * @property {boolean} [useLastIrreversible]
  * @property {number} [expireSeconds]
  */
 /**
 * @typedef {Object} TransactionHeader
 * @property {string} expiration
 * @property {number} ref_block_num
 * @property {number} ref_block_prefix
 */
/**
 * @typedef {Object} AccountDelta
 * @property {string} account
 * @property {number} delta
 */
/**
 * @typedef {Object} AuthSequence
 * @property {string} account
 * @property {number} sequence
 */
/**
 * @typedef {Object} ActionReceipt
 * @property {string} receiver
 * @property {string}  act_digest
 * @property {number} global_sequence
 * @property {number} recv_sequence
 * @property {Array<any>} auth_sequence
 * @property {number} code_sequence
 * @property {number}  abi_sequence
 */
/**
 * @typedef {Object} ActionTrace
 * @property {number}   action_ordinal
 * @property {number}   creator_action_ordinal
 * @property {number}   closest_unnotified_ancestor_action_ordinal
 * @property {ActionReceipt}   receipt
 * @property {string}   receiver
 * @property {ProcessedAction}   act
 * @property {boolean}   context_free
 * @property {number}   elapsed
 * @property {string}   console
 * @property {string}   trx_id
 * @property {number}   block_num
 * @property {string}   block_time
 * @property {string | null}   producer_block_id
 * @property {Array<AccountDelta>}   account_ram_deltas
 * @property {Array<AccountDelta>}   account_disk_deltas
 * @property {any}   except
 * @property {number | null}   error_code
 * @property {any}   [return_value]
 * @property {string}   [return_value_hex_data]
 * @property {any}   [return_value_data]
 * @property {Array<ActionTrace>}   [inline_traces]
 */
/**
 * @typedef {Object} TransactResult
 * @property {string} transaction_id
 * @property {TransactionTrace} processed
 */
 /** 
  * @summary Optional query configuration object 
  * @typedef {Object} QueryConfig
  * @property {boolean} [sign]
  * @property {Array<string>} requiredKeys
  * @property {Array<Authorization>}
 */
 