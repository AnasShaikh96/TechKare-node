'use strict'
/**
* @namespace com.sample.config
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @public
* @alias config
* @memberof com.sample.config
* @enum {number | boolean | string}
*/

module.exports = {
	/**
	* Protocol
	* @type {string}
	*/
	"_protocol":"http",
	
	/**
	* System Domain
	* @type {string}
	*/
	"_host":"http://localhost:3000",
	/** 
	* System running port
	* @type {string}
	*/
	"_system_port":"3000",
	/** 
	* get ip info from request
	* @type {number}
	*/
	"_proxy":2,
	/**
	* enable debug mode
	* @type {boolean}
	*/
	"_debug":true,
	/**
	* Session Path Set
	* @type {string}
	*/
	"_sessionPath":"../../sessions",
	/** 
	* Pagination Start
	* @type {Number}
	*/
	"_start":"0",
	/** 
	* Pagination Limit
	* @type {Number}
	*/
	"_limit":"15",

	_time_zone:"UTC"
}
