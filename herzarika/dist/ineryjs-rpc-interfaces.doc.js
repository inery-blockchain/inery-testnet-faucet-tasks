/**
 * @typedef {Object} TransactionReceiptHeader
 * @property {string} status
 * @property {number} cpu_usage_us
 * @property {number} net_usage_words
 */
/**
 * @typedef {Object} AbiJsonToBinResult
 * @property {string} binargs
 */
/**
 * @typedef {Object} TransactionTrace
 * @property {string} id
 * @property {number} block_num
 * @property {string} block_time
 * @property {string | null} producer_block_id
 * @property {TransactionReceiptHeader | null} receipt
 * @property {number} elapsed
 * @property {number} net_usage
 * @property {boolean} scheduled
 * @property {Array<ActionTrace>} action_traces
 * @property {AccountDelta | null}  account_ram_delta
 * @property {string | null} except
 * @property {number | null} error_code
 * @property {string[]} bill_to_accounts
 */
/**
 * @typedef {Object} Authorization
 * @property {string} actor
 * @property {string} permission
 */
/**
 * @typedef {Object} Abi_type
 * @property {string} new_type_name
 * @property {string} type
 */
/**
 * @typedef {Object} Abi_field
 * @property {string} name
 * @property {string} type
 */
/**
 * @typedef {Object} Abi_struct
 * @property {string} name
 * @property {string} base
 * @property {Array<Abi_field>} fields
 */
/**
 * @typedef {Object} Abi_action
 * @property {string} name
 * @property {string} type
 * @property {string} ricardian_contract
 */
/**
 * @typedef {Object} Abi_table
 * @property {string} name
 * @property {string} type
 * @property {string} index_type
 * @property {Array<string>} key_names
 * @property {Array<string>} key_types
 */
/**
 * @typedef {Object} Abi_ricardian_clause
 * @property {string} id
 * @property {string} body
 */
/**
 * @typedef {Object} Abi_error_message
 * @property {number} error_code
 * @property {string} error_msg
 */
/**
 * @typedef {Object} Abi_extension
 * @property {number} tag
 * @property {value} string
 * 
 */
/**
 * @typedef {Object} Abi_variant
 * @property {string} name
 * @property {Array<string>} types
 */
/**
 * @typedef {Object} Abi_action_result
 * @property {string} name
 * @property {string} result_type
 */
/**
 * @typedef {Object} Abi
 * @property {string} version
 * @property {Array<Abi_type>} types 
 * @property {Array<Abi_struct>} structs
 * @property {Array<Abi_action>} actions
 * @property {Array<Abi_table>} tables
 * @property {Array<Abi_ricardian_clause>} ricardian_clauses
 * @property {Array<Abi_error_message>} error_messages
 * @property {Array<Abi_extension>} abi_extensions
 * @property {Array<Abi_variant>} [variants]
 * @property {Array<Abi_action_result>} [action_results]
 * @property {Array<object>} [kv_tables]
 */
/**
* @typedef {Object} BlockHeader
* @property {string} timestamp
* @property {string} producer
* @property {number} confirmed
* @property {string} previous
* @property {string} transaction_mroot
* @property {string} action_mroot
* @property {number} schedule_version
* @property {ProducerScheduleType} [new_producers]
* @property {Array<any>} header_extensions
*/

/**
* @typedef {Object} SignedHeader
* @property {string} timestamp
* @property {string} producer
* @property {number} confirmed
* @property {string} previous
* @property {string} transaction_mroot
* @property {string} action_mroot
* @property {number} schedule_version
* @property {ProducerScheduleType} [new_producers]
* @property {Array<any>} header_extensions
* @property {string} producer_signature
*/
/**
 * @typedef {Object} AccountResourceInfo
 * @property {number} used
 * @property {number} available
 * @property {number} max
 * @property {string} [last_usage_update_time]
 * @property {number} [current_used]
 */
/**
 * @typedef {Object} ResourceOverview
 * @property {string} owner
 * @property {number} ram_bytes
 * @property {string} net_weight
 * @prop {string} cpu_weight
 */
/**
 * @typedef {Object} ResourceDelegation
 * @property {string} from
 * @property {string} to
 * @property {string} net_weight
 * @property {string} cpu_weight
 */
/**
 * @typedef {Object} RefundRequest
 * @property {string} owner
 * @property {string} request_time
 * @property {string} net_amount
 * @property {string} cpu_amount
 */
/**
Not documented
export interface VoterInfo {
owner: string;
proxy: string;
producers: string[];
staked: number;
last_vote_weight: string;
proxied_vote_weight: string;
is_proxy: number;
flags1: number;
reserved2: number;
reserved3: string;
}
*/
/**Not documented 
export interface RexBalance {
version: number;
owner: string;
vote_stake: string;
rex_balance: string;
matured_rex: number;
rex_maturities: any;
}
*/
/**
 * @typedef {Object} Authority
 * @property {number} threshold
 * @property {Array<KeyWeight>} keys
 * @property {Array<PermissionLevelWeight>} accounts 
 * @property {Array<WaitWeight>} waits
 */
/**
 * @typedef {Object} KeyWeight
 * @property {string} key
 * @property {number} weight
 */
/**
 * @typedef {Object} Permission
 * @property {string} perm_name
 * @property {string} parent
 * @property {Authority} required_auth
 */
/**
 * @typedef {Object} PermissionLevel
 * @property {string} actor
 * @property {string} permission
 */
/**
 * @typedef {Object} PermissionLevelWeight
 * @property {PermissionLevel} permission
 * @property {number} weight
 */
/**
 * @typedef {Object} WaitWeight
 * @property {number} wait_sec
 * @property {number} weight
 */

/** Return value of `/v1/chain/get_abi` 
 * @typedef {Object} GetAbiResult
 * @property {string} account_name
 * @property {Abi} [abi]
*/

/** Return value of `/v1/chain/get_account` 
 * @typedef {Object} GetAccountResult
 * @property {string} account_name
 * @property {number} head_block_num
 * @property {string} head_block_time
 * @property {boolean} privileged
 * @property {string} last_code_update
 * @property {string} created
 * @property {string} [core_liquid_balance]
 * @property {number} ram_quota
 * @property {number} net_weight
 * @property {number} cpu_weight
 * @property {number} net_limit
 * @property {number} cpu_limit
 * @property {number} ram_usage
 * @property {Array<Permission>} permissions
 * @property {ResourceOverview | null} total_resources
 * @property {ResourceDelegation | null} self_delegated_bandwidth
 * @property {RefundRequest | null} refund_request
 * @property {any} voter_info
 * @property {any} rex_info
 */
/**
 * @typedef {Object} AccountResult
 * @property {string} account_name
 * @property {string} permission_name
 * @property {Authorization} [authorizing_account]
 * @property {string} [authorizing_key]
 * @property {number} weight
 * @property {number} threshold
 */

/** Return value of `/v1/chain/get_accounts_by_authorizers` 
 * @typedef {Object} GetAccountsByAuthorizersResult 
 * @property {Array<AccountResult>} accounts
*/
/**
 * @typedef {Object} GetActivatedProtocolFeaturesParams
 * @property {number} [limit]
 * @property {boolean} [search_by_block_num]
 * @property {boolean} [reverse]
 * @property {number} [lower_bound]
 * @property {number} [upper_bound]
 */
/** 
 * @typedef {Object} ActivatedProtocolFeature_specification
 * @property {string} name
 * @property {string} value 
 */
/**
 * @typedef {Object} ActivatedProtocolFeature 
 * @property {string} feature_digest
 * @property {number} activation_ordinal
 * @property {number} activation_block_num
 * @property {string} description_digest
 * @property {Array<string>} dependencies
 * @property {string} protocol_feature_type
 * @property {ActivatedProtocolFeature_specification} specification
 */
/** Return value of `/v1/chain/get_activated_protocol_features`
 * @typedef {Object} GetActivatedProtocolFeaturesResult
 * @property {Array<ActivatedProtocolFeature>} activated_protocol_features
 * @property {number} [more]
*/
/** Return value of `/v1/chain/get_block_info` 
 * @typedef {Object} GetBlockInfoResult
 * @property {string} timestamp
 * @property {string} producer
 * @property {number} confirmed
 * @property {string} previous
 * @property {string} transaction_mroot
 * @property {number} schedule_version
 * @property {string} producer_signature
 * @property {string} id
 * @property {number} block_num
 * @property {number} ref_block_num
 * @property {number} ref_block_prefix
*/
/** Returned action from nodinery, data is optional 
 * @typedef {Object} ProcessedAction
 * @property {string} account
 * @property  {string} name
 * @property {Array<Authorization>} authorization
 * @property {any} [data]
 * @property {string} [hex_data]
*/
/**
 * @typedef {Object} ProcessedTransaction
 * @property {string} [expiration]
 * @property {number} [ref_block_num]
 * @property {number} [ref_block_prefix]
 * @property {number} [max_net_usage_words]
 * @property {number} [max_cpu_usage_ms]
 * @property {number} [delay_sec]
 * @property {Array<ProcessedAction>} [context_free_actions]
 * @property {Uint8Array[]} [context_free_data]
 * @property {Array<ProcessedAction>} actions
 * @property {Array<any>} [transaction_extensions]
 * 
 */
/**
 * @typedef {Object} PackedTransaction
 * @property {string} id
 * @property {Array<string>} signatures
 * @property {number | string} compression
 * @property {string} packed_context_free_data
 * @property {Array<string>} context_free_data
 * @property {string} packed_trx
 * @property {ProcessedTransaction} transaction
 */
/**
 * @typedef {Object} PackedTrx
 * @property {Array<string>} signatures
 * @property {number} compression
 * @property {string} packed_trx
 * @property {string} packed_context_free_data
 */
/**
 * @typedef {Object} TransactionReceipt
 * @property {string} status
 * @property {number} cpu_usage_us
 * @property {number} net_usage_words
 * @property {PackedTransaction} trx
 */
/** Return value of `/v1/chain/get_block` 
 * @typedef {Object} GetBlockResult
 * @property {string} timestamp
 * @property {string} producer
 * @property {number} confirmed
 * @property {string} previous
 * @property {string} transaction_mroot
 * @property {string} action_mroot
 * @property {number} schedule_version
 * @property {ProducerScheduleType | null} new_producers
 * @property {string} producer_signature 
 * @property {any} transactions
 * @property {string} id
 * @property {number} block_num
 * @property {number} ref_block_prefix
*/
/** Used to calculate TAPoS fields in transactions 
 * @typedef {Object} BlockTaposInfo
 * @property {number} block_num
 * @property {string} id
 * @property {string} [timestamp]
 * @property {BlockHeader} [header]
*/
/**
 * @typedef {Object} ProducerKey
 * @property {string} producer_name
 * @property {string} block_signing_key
 */
/**
 * @typedef {Object} ProducerAuthority
 * @property {string} producer_name
 * @property {Array<any>} authority
 */
 /**
  * @typedef {Object} ProducerAuthoritySchedule
  * @property {number} version
  * @property {Array<ProducerAuthority>} producers
  */
 /**
  * @typedef {Object} ProducerScheduleType
  * @property {number} version
  * @property {Array<ProducerKey>} producers
  */
/**
 * @typedef {Object} ScheduleInfo
 * @property {number} schedule_lib_num
 * @property {string} schedule_hash
 * @property {ProducerScheduleType} schedule
 */
/**
 * @typedef {Object} IncrementalMerkle
 * @property {Array<string>} _active_nodes
 * @property {number} _node_count
 */
/**
 * @typedef {Object} ProtocolFeatureActivationSet
 * @property {Array<string>} protocol_features
 */
 /**
  * @typedef {Object} SecurityGroupInfo
  * @property {number} version
  * @property {Array<string>} participants
  */
 /**
  * @typedef {Object} StateExtension
  * @property {SecurityGroupInfo} security_group_info
  */
/** Return value of `/v1/chain/get_block_header_state` 
 * @typedef {Object} GetBlockHeaderStateResult
 * @property {string} id
 * @property {SignedBlockHeader} header
 * @property {ScheduleInfo} pending_schedule
 * @property {ProtocolFeatureActivationSet} activated_protocol_features
 * @property {Array<string>} additional_signatures
 * @property {number} block_num
 * @property {number} dpos_proposed_irreversible_blocknum
 * @property {number} dpos_irreversible_blocknum
 * @property {ProducerAuthoritySchedule} active_schedule
 * @property {IncrementalMerkle} blockroot_merkle
 * @property {Map<string, number>} producer_to_last_produced
 * @property {Map<string, number>} producer_to_last_implied_irb
 * @property {any} valid_block_signing_authority
 * @property {Array<number>} confirm_count
 * @property {Array<any>} state_extension
*/

/** Subset of `GetBlockHeaderStateResult` used to calculate TAPoS fields in transactions 
* @typedef {Object} BlockHeaderStateTaposInfo
 * @property {string} id
 * @property {SignedBlockHeader} header
 * @property {number} block_num
*/
/** Return value of `/v1/chain/get_code` 
 * @typedef {Object} GetCodeResult
 * @property {string} account_name
 * @property {string} code_hash
 * @property {string} wast
 * @property {string} wasm
 * @property {Abi} [abi]
*/
/** Return value of `/v1/chain/get_code_hash` 
 * @typedef {Object} GetCodeHashResult
 * @property {string} account_name
 * @property {string} code_hash
*/
/** Return value of `/v1/chain/get_currency_stats` 
 * @typedef {Object} GetCurrencyStatsResult
 * @property {string} supply
 * @property {string} max_supply
 * @property {string} issuer
*/
/** Return value of `/v1/chain/get_info` 
 * @typedef {Object} GetInfoResult
 * @property {string} server_version
 * @property {string} chain_id
 * @property {number} head_block_num
 * @property {number} last_irreversible_block_num
 * @property {number} last_irreversible_block_id
 * @property {string} [last_irreversible_block_time]
 * @property {string} head_block_id
 * @property {string} head_block_time
 * @property {string} head_block_producer
 * @property {number} virtual_block_cpu_limit
 * @property {number} virtual_block_net_limit
 * @property {number} block_cpu_limit
 * @property {number} block_net_limit
 * @property {string} [server_version_string]
 * @property {number} [fork_db_head_block_num]
 * @property {string} [fork_db_head_block_id]
 * @property {string} [server_full_version_string]
 * @property {number} [first_block_num]
*/
/** Return value of /v1/chain/get_producer_schedule 
 * @typedef {Object} GetProducerScheduleResult
 * @property {ProducerAuthoritySchedule | null} active
 * @property {ProducerAuthoritySchedule | null} pending
 * @property {ProducerAuthoritySchedule | null} proposed
*/
/**
 * @typedef {Object} ProducerDetails
 * @property {string} owner
 * @property {Array<any>} producer_authority
 * @property {string} url
 * @property {number} [is_active]
 * @property {string} total_votes
 * @property {string} producer_key
 * @property {number} [unpaid_blocks]
 * @property {string} [last_claim_time]
 * @property {number} [location]
 */
/** Return value of `/v1/chain/get_producers` 
 * @typedef {Object} GetProducersResult
 * @property {Array<ProducerDetails>} rows
 * @property {string} total_producer_vote_weight
 * @property {string} more
*/
/** Return value of `/v1/chain/get_raw_code_and_abi` 
 * @typedef {Object} GetRawCodeAndAbiResult
 * @property {string} account_name
 * @property {string} wasm
 * @property {string} abi
*/
/** Return value of `/v1/chain/get_raw_abi` 
 * @typedef {Object} GetRawAbiResult
 * @property {string} account_name
 * @property {string} code_hash
 * @property {string} abi_hash
 * @property {string} abi
*/
/**
 * @typedef {Object} DefferedTransaction_generation
 * @property {string} sender_trx_id
 * @property {string} sender_id
 * @property {string} sender
 */
/**
 * @typedef {Object} DefferedTransaction
 * @property {string} [expiration]
 * @property {number} [ref_block_num]
 * @property {number} [ref_block_prefix]
 * @property {number} [max_net_usage_words]
 * @property {number} [max_cpu_usage_ms]
 * @property {number} [delay_sec]
 * @property {Array<ProcessedAction>} [context_free_actions]
 * @property {Uint8Array[]} [context_free_data]
 * @property {Array<ProcessedAction>} actions
 * @property {Array<any>} [transaction_extensions]
 * @property {DefferedTransaction_generation} [deferred_transaction_generation]
 */
/**
 * @typedef {Object} GeneratedTransaction
 * @property {string} trx_id
 * @property {string} sender
 * @property {string} sender_id
  * @property {string} payer
 * @property {string} delay_until
 * @property {string} expiration
 * @property {string} published
 * @property {Array<string>} [packed_trx]
 * @property {Array<DefferedTransaction>} [transaction]
 */
/** Return value of `/v1/chain/get_scheduled_transactions` 
 * @typedef {Object} GetScheduledTransactionsResult
 * @property {Array<GeneratedTransaction>} transactions 
 * @property {string} more
*/

/** Return value of `/v1/chain/get_table_rows` and `/v1/chain/get_kv_table_rows` 
 * @typedef {Object} GetTableRowsResult
 * @property {Array<any>} rows
 * @property {boolean} more
 * @property {string} next_key
 * @property {string} next_key_bytes
*/
/**
 * @typedef {Object} GetTableByScopeResultRow
 * @property {string} code
 * @property {string} scope
 * @property {string} table
 * @property {string} payer
 * @property {number} count
 */
/** Return value of `/v1/chain/get_table_by_scope` 
 * @typedef {Object} GetTableByScopeResult
 * @property {Array<GetTableByScopeResultRow>} rows
 * @property {string} more
*/
/** Arguments for `push_transaction` 
 * @typedef {Object} PushTransactionArgs
 * @property {Array<string>} signatures
 * @property {number} compression
 * @property {Uint8Array} serializedTransaction
* @property {Uint8Array} [serializedContextFreeData]
*/
/** Return value of `/v1/chain/push_ro_transaction` 
 * @typedef {Object} ReadOnlyTransactResult
 * @property {number} head_block_num
 * @property {string} head_block_id
 * @property {number} last_irreversible_block_num
 * @property {string} last_irreversible_block_id
 * @property {string} code_hash
 * @property {Array<string>} pending_transactions
 * @property {TransactionTrace} result
*/
/**
 * @typedef {Object} DBSizeIndexCount
 * @property {string} index
 * @property {number} row_count
 */
/** Return value of `/v1/db_size/get` 
 * @typedef {Object} DBSizeGetResult
 * @property {number} free_bytes
 * @property {number} used_bytes
 * @property {number} size
 * @property {Array<DBSizeIndexCount>} indices
*/
/**
 * @typedef {Object} TraceApiAction
 * @property {number} global_sequence
 * @property {string} receiver
 * @property {string} account
 * @property {string} action
 * @property {Array<Authorization>} authorization
 * @property {any} data
 * @property {any} return_value
 */
/**
 * @typedef {Object} TraceApiTransactionHeader
 * @property {string} expiration
 * @property {number} ref_block_num
 * @property {number} ref_block_prefix
 * @property {number} max_net_usage_words
 * @property {number} max_cpu_usage_ms
 * @property {number} delay_sec
 */
/**
 * @typedef {Object} TraceApiTransaction
 * @property {string} id
 * @property {Array<TraceApiAction>} actions
 * @property {string} [status]
 * @property {number} [cpu_usage_us]
 * @property {number} [net_usage_words]
 * @property {Array<string>} [signatures]
 * @property {TraceApiTransactionHeader} [transaction_header]
 * @property {Array<string>} bill_to_accounts
 */
/** Return value of `/v1/trace_api/get_block` 
 * @typedef {Object} TraceApiGetBlockResult
 * @property {string} id
 * @property {number} number
 * @property {string} previous_id
 * @property {string} status
 * @property {string} timestamp
 * @property {string} producer
 * @property {string} [transaction_mroot]
 * @property {string} [action_mroot]
 * @property {number} schedule_version
 * @property {TraceApiTransaction} transactions
*/
/**
 * @typedef {Object} OrderedActionResult
 * @property {number} global_action_seq
 * @property {number} account_action_seq
 * @property {number} block_num
 * @property {string} block_time
 * @property {any} action_trace
 */
/** Return value of /v1/history/get_actions 
 * @typedef {Object} GetActionsResult
 * @property {Array<OrderedActionResult>} actions
 * @property {number} last_irreversible_block
 * @property {boolean} [time_limit_exceeded_error]
*/
/** Return value of /v1/history/get_transaction 
 * @typedef {Object} GetTransactionResult
 * @property {string} id
 * @property {any} trx
 * @property {string} block_time
 * @property {number} block_num
 * @property {number} last_irreversible_block
 * @property {Array<any>} traces
*/
/** Return value of /v1/history/get_key_accounts 
 * @typedef {Object} GetKeyAccountsResult
 * @property {Array<string>} account_names
*/
/**
 * Return value of /v1/history/get_controlled_accounts 
 * @typedef {Object} GetControlledAccountsResult 
 * @property {Array<string>} controlled_accounts
 */
