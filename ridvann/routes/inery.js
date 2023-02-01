/*jslint node: true, nomen: true*/
"use strict";

module.exports = function (express, logger, config) {
	
	var path = require('path'),
	    router = express.Router(),
	    ineryController = require(path.join('..', 'controllers', 'ineryController'))(logger, config);

	/* GET users listing. */
	router.get('/transfer', function (req, res) {
		ineryController.getTransfer(function (err, result) {
			if (err) {
				res.status(err.status).json({
					message: err.message
				});
			} else {
				res.status(200).json(result);
			}

		});
	});
	
	return router;
};