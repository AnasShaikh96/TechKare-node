	'use strict'

/**
* @class error_routes
* @extends com.sample.routes.base_routes
* @classdesc Application global error routes
* @memberof com.sample.routes
*/

const baseRoute = require("./base_routes.js").base_routes;

/**
 * Export Error Routes Class
 * @memberof com.sample.routes
 * @module error_routes
 * @see com.sample.routes.error_routes
 */

module.exports.error_routes = class error_routes extends baseRoute{
	
	constructor(app){
		super(app,__filename);
	}
	
	/**
	* @summary create static URLs
	* @public
	* @memberof com.sample.routes.error_routes
	* @function load
	* @override
	*/
	
	load(){
		this.app.use(this.controller.forNotFor);
		this.app.use(this.controller.fiveNotNot);
	}
};
