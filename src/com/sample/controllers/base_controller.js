'use strict'

/**
* @namespace com.sample.controllers
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @class base_controller
* @classdesc Application Base Controller
* @memberof com.sample.controllers
*/

/**
 * Export Base Controller Class
 * @memberof com.sample.controllers
 * @module base_controller
 * @see com.sample.controllers.base_controller
 */

module.exports.base_controller = class base_controller{
	
	constructor(){
		
		/**
		* @private
		* @memberof com.sample.controllers.base_controller
		* @member
		* @type {ObjectArray}
		*/
		
		this.modules = {};
	}	
	
	/**
	* @summary add modules in controller
	* @public
	* @memberof com.sample.controllers.base_controller
	* @function _addModules
	* @param {string} - Module Variable Name
	* @param {moduleObject} - Module Object
	*/
	
	_addModules(moduleName,moduleValue){
		this.modules[moduleName] = moduleValue;
	}
};
