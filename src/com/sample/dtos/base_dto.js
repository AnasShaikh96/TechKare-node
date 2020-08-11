'use strict'

/**
* @namespace com.sample.dtos
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @class base_dto
* @classdesc Application Base Model
* @memberof com.sample.dtos
*/

const path = require("path");

/**
 * Export Base DTO Class Object
 * @memberof com.sample.dtos
 * @module base_dto
 * @see com.sample.dtos.base_dto
 */

module.exports.base_dto = class base_dto{
	constructor(){
		this._ = {};
		this._exclude = ['getAllMethods','_','_exclude','populate','getExtra','setExtra','toCamelCase','toJSON','parseData'];
	}
	
	/**
	* @summary getAllMethodName DTO Objects
	* @public
	* @momberof com.talkk.dao.dtos.base_dto
	* @function getAllMethods
	* @return propertyList
	*/
	
	getAllMethods(obj){
		let props = []
		do {
			const l = Object.getOwnPropertyNames(obj)
				.concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
				.sort()
				.filter((p, i, arr) => 
					p !== 'constructor' &&           //not the constructor
					(i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
					props.indexOf(p) === -1 &&         //not overridden in a child*/
					!this._exclude.includes(p)
				)
			props = props.concat(l)
		}
		while (
			(obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
			Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
		)

		return props
	}
	
	
	/**
	* @summary Populate DTO Objects
	* @public
	* @momberof com.talkk.dao.dtos.base_dto
	* @function populate
	*/

	populate(data){
		this._ = data;
	}
	
	/**
	 *  @summary Return Dto Values
	 *  @public
	 *  @memberof com.sample.dtos.base_dto
	 *  @function toJSON
	 *  @return Data Object
	 */
	
	toJSON(toString=false){
		if(toString){
			return this._;
		}else{
			var list = this.getAllMethods(this);
			//console.log(this);
			//console.log(this['IMEI']);
			var returnValue = {};
			for(var i in list){
				returnValue[list[i]] = this[list[i]];
			}
			//console.log(returnValue);
			return returnValue;
		}
	}
	
	/**
	 *  @summary Convert Data to CamelCase
	 *  @public
	 *  @memberof com.sample.dtos.base_dto
	 *  @function toCamelCase
	 *  @return Data Object
	 */
	
	parseData(value) {
		var temp = {};
		/*console.log(value);
		console.log(typeof value);*/
		var isArray = function(a) {
			return (!!a) && (a.constructor === Array);
		};
		var isObject = function(a) {
			return (!!a) && (a.constructor === Object);
		};
		if(isObject(value)){
			for(var i in value){
				temp[this.toCamelCase(i)] = value[i];
			}
		}else if(isArray(value)){
			temp = [];
			for(var i in value){
				if(isObject(value[i])){
					var tobject = {};
					for(var j in value[i]){
						tobject[this.toCamelCase(j)] = value[i][j];
					}
					temp.push(tobject);
				}else{
					temp.push(value[i]);
				}
			}
		}else{
			temp = value;
		}
		return temp;
	};
	
	
	/**
	 *  @summary Convert value to camel case
	 *  @public
	 *  @memberof com.sample.dtos.base_dto
	 *  @function toCamelCase
	 *  @return Data Object
	 */
	
	toCamelCase(value) {
		return value.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
			if (p2) return p2.toUpperCase();
			return p1.toLowerCase();        
		});
	};
	
	
	/**
	 *  @summary extra Fields  Set
	 *  @public
	 *  @memberof com.sample.dtos.base_dto
	 *  @function setExtra
	 *  @param {String} key - Fileds Name
	 *  @param {Object} value - Fileds Value
	 */
	 
	setExtra(key,value){
		this._[key] = value;
	}
	
	/**
	 *  @summary extra Fields Get
	 *  @public
	 *  @memberof com.sample.dtos.base_dto
	 *  @function getExtra
	 *  @param {String} key - Fileds Name
	 *  @return {Object}
	 */
	
	getExtra(key){
		return (this._[key]) ? this._[key] : "-";
	}
};
