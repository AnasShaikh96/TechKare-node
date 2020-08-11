'use strict'

/**
* @namespace com.sample.routes
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @class base_routes
* @classdesc Application Base routes
* @memberof com.sample.routes
*/

const path = require("path");
const express = require("express");

/**
 * Export Base Routes Class
 * @memberof com.sample.routes
 * @module base_routes
 * @see com.sample.routes.base_routes
 */

module.exports.base_routes = class base_routes{
	
	constructor(app,name){
		this.app = app;
		this.express = express;
		var ContollerFile = name;
		ContollerFile = ContollerFile.replace(__dirname,"");
		ContollerFile = __dirname + "/" + ".." + "/" + "controllers" +ContollerFile.replace("routes","controller");
		this.controller = new (require(ContollerFile)[path.basename(ContollerFile).replace(".js","")]);
		this.controller._addModules("app",this.app);
	}
	
	/**
	* @summary Load Modules
	* @public
	* @memberof com.sample.routes.base_routes
	* @function _addModules
	*/
	
	_addModules(key,value){
		this.controller._addModules(key,value);
	}
	
	/**
	* @summary create static URLs
	* @public
	* @memberof com.sample.routes.base_routes
	* @function load
	*/
	
	load(){
		console.log("Base Routes");
	}
};
