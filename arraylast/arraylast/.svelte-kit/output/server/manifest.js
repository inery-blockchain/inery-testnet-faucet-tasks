export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-b7ff2c2a.js","imports":["_app/immutable/start-b7ff2c2a.js","_app/immutable/chunks/index-7ad743c7.js","_app/immutable/chunks/singletons-4002b19e.js","_app/immutable/chunks/index-7c92740e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/create",
				pattern: /^\/api\/create\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/create/_server.ts.js')
			},
			{
				id: "/api/destroy",
				pattern: /^\/api\/destroy\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/destroy/_server.ts.js')
			},
			{
				id: "/api/read",
				pattern: /^\/api\/read\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/read/_server.ts.js')
			},
			{
				id: "/api/update",
				pattern: /^\/api\/update\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/update/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
