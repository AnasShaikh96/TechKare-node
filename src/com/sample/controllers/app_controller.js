'use strict'

/**
* @class app_controller
* @extends com.sample.controllers.base_controller
* @classdesc Application global app Controller
* @memberof com.sample.controllers
*/

const baseController = require("./base_controller.js").base_controller;

/**
 * Export App Controller Class
 * @memberof com.sample.controllers
 * @module app_controller
 * @see com.sample.controllers.app_controller
 */

module.exports.app_controller = class app_controller extends baseController{
	
	constructor(){
		super();
	}
	beforeLoad(req,res,next){
		
		res.locals.domain = req.host;
		res.locals.protocol = req.protocol;
		if (req.csrfToken) {
			res.locals.token = req.csrfToken();
		}
		next();
		
	}
	
	/**
	* @summary Web root function
	* @public
	* @memberof com.sample.controllers.app_controller
	* @function index
	* @param {request} req - User Request Object
	* @param {response} res - User Response Object
	*/
	
	index(req,res,next){
		// var db =  res.locals.SQLObject;

		// res.redirect("/login");
		next();
		
	}
	getHome(req,res,next){
		res.render('index');
		next();
	}
};
