import { g as globalApis } from './chunk-constants.797d3ebf.js';
import { i as index } from './chunk-integrations-utils.9717ad89.js';
import 'node:url';
import 'pathe';
import './chunk-utils-env.860d90c2.js';
import 'std-env';
import '@vitest/runner';
import './chunk-utils-import.847b4a2d.js';
import '@vitest/runner/utils';
import '@vitest/utils';
import './chunk-utils-global.442d1d33.js';
import 'chai';
import './vendor-_commonjsHelpers.addc3445.js';
import '@vitest/expect';
import './chunk-runtime-rpc.9c0386cc.js';
import './chunk-snapshot-env.a347d647.js';
import './chunk-utils-base.904102a8.js';
import './chunk-utils-tasks.d07dcea9.js';
import 'util';
import '@vitest/spy';
import './chunk-integrations-run-once.38756e30.js';

function registerApiGlobally() {
  globalApis.forEach((api) => {
    globalThis[api] = index[api];
  });
}

export { registerApiGlobally };
