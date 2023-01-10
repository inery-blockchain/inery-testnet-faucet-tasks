
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LESSOPEN: string;
	export const HISTFILESIZE: string;
	export const HISTTIMEFORMAT: string;
	export const NULINK_KEYSTORE_PASSWORD: string;
	export const USER: string;
	export const SSH_CLIENT: string;
	export const LC_TIME: string;
	export const npm_config_user_agent: string;
	export const CELESTIA_CHAIN_ID: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const OLLO_PORT: string;
	export const SHLVL: string;
	export const npm_config_noproxy: string;
	export const MOTD_SHOWN: string;
	export const HOME: string;
	export const OLDPWD: string;
	export const SSH_TTY: string;
	export const npm_package_json: string;
	export const LC_MONETARY: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const CELESTIA_PORT: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_engine_strict: string;
	export const NIBIRU_CHAIN_ID: string;
	export const COLOR: string;
	export const NVM_DIR: string;
	export const npm_config_metrics_registry: string;
	export const STRIDENODE: string;
	export const LOGNAME: string;
	export const WALLET: string;
	export const SEI_CHAIN_ID: string;
	export const _: string;
	export const npm_config_prefix: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const LE_WORKING_DIR: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_cache: string;
	export const SOURCED_PORT: string;
	export const NIBIRU_PORT: string;
	export const SOURCENODE: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const HAQQD_CHAIN_ID: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const LC_ADDRESS: string;
	export const STATESET_CHAIN_ID: string;
	export const XDG_RUNTIME_DIR: string;
	export const NIBIRU_WALLET_ADDRESS: string;
	export const SEI_PORT: string;
	export const HISTSIZE: string;
	export const LANG: string;
	export const LC_TELEPHONE: string;
	export const NIBIRU_VALOPER_ADDRESS: string;
	export const LS_COLORS: string;
	export const npm_lifecycle_script: string;
	export const SHELL: string;
	export const LC_NAME: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const LESSCLOSE: string;
	export const KEY: string;
	export const LC_MEASUREMENT: string;
	export const LC_IDENTIFICATION: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const PKEY: string;
	export const npm_execpath: string;
	export const SSH_CONNECTION: string;
	export const NVM_CD_FLAGS: string;
	export const npm_config_global_prefix: string;
	export const LC_NUMERIC: string;
	export const npm_command: string;
	export const LC_PAPER: string;
	export const HISTFILE: string;
	export const UTC: string;
	export const OLLO_CHAIN_ID: string;
	export const NODENAME: string;
	export const NVM_RC_VERSION: string;
	export const NULINK_OPERATOR_ETH_PASSWORD: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LESSOPEN: string;
		HISTFILESIZE: string;
		HISTTIMEFORMAT: string;
		NULINK_KEYSTORE_PASSWORD: string;
		USER: string;
		SSH_CLIENT: string;
		LC_TIME: string;
		npm_config_user_agent: string;
		CELESTIA_CHAIN_ID: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		OLLO_PORT: string;
		SHLVL: string;
		npm_config_noproxy: string;
		MOTD_SHOWN: string;
		HOME: string;
		OLDPWD: string;
		SSH_TTY: string;
		npm_package_json: string;
		LC_MONETARY: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		CELESTIA_PORT: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_engine_strict: string;
		NIBIRU_CHAIN_ID: string;
		COLOR: string;
		NVM_DIR: string;
		npm_config_metrics_registry: string;
		STRIDENODE: string;
		LOGNAME: string;
		WALLET: string;
		SEI_CHAIN_ID: string;
		_: string;
		npm_config_prefix: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		LE_WORKING_DIR: string;
		XDG_SESSION_ID: string;
		npm_config_cache: string;
		SOURCED_PORT: string;
		NIBIRU_PORT: string;
		SOURCENODE: string;
		npm_config_node_gyp: string;
		PATH: string;
		HAQQD_CHAIN_ID: string;
		NODE: string;
		npm_package_name: string;
		LC_ADDRESS: string;
		STATESET_CHAIN_ID: string;
		XDG_RUNTIME_DIR: string;
		NIBIRU_WALLET_ADDRESS: string;
		SEI_PORT: string;
		HISTSIZE: string;
		LANG: string;
		LC_TELEPHONE: string;
		NIBIRU_VALOPER_ADDRESS: string;
		LS_COLORS: string;
		npm_lifecycle_script: string;
		SHELL: string;
		LC_NAME: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		LESSCLOSE: string;
		KEY: string;
		LC_MEASUREMENT: string;
		LC_IDENTIFICATION: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		PKEY: string;
		npm_execpath: string;
		SSH_CONNECTION: string;
		NVM_CD_FLAGS: string;
		npm_config_global_prefix: string;
		LC_NUMERIC: string;
		npm_command: string;
		LC_PAPER: string;
		HISTFILE: string;
		UTC: string;
		OLLO_CHAIN_ID: string;
		NODENAME: string;
		NVM_RC_VERSION: string;
		NULINK_OPERATOR_ETH_PASSWORD: string;
		INIT_CWD: string;
		EDITOR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
