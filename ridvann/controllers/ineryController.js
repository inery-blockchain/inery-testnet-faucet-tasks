/*jslint node: true, nomen: true*/
"use strict";

const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('../libs/ineryjs/dist/index.js');

const user1PrivateKey = "User Private Key"; // User private key
const signatureProvider = new JsSignatureProvider([user1PrivateKey]);

const url="http://ec2-13-36-25-38.eu-west-3.compute.amazonaws.com:8888";
const rpc = new JsonRpc(url);

const api = new Api({ rpc, signatureProvider });

module.exports = function (logger, config) {

	var funcs = {};

	funcs.getTransfer = function(callback){

		(async () => {
			const result = await api.transact({
			  actions: [{
				account: 'inery.token',
				name: 'transfer',
				authorization: [{
				  actor: 'ridvann',
				  permission: 'active',
				}],
				data: {
				  from: 'ridvann',
				  to: 'master.pro',
				  quantity: '0.0001 RCA',
				  memo: ''
				}
			  }]

			});
			logger.info('Response:' + result);

			callback(null, result);
		  })();

	}

	return funcs;
};