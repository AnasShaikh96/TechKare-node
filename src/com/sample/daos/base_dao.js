'use strict'

/**
* @namespace com.sample.daos
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @class base_dao
* @classdesc Application Base Model
* @memberof com.sample.daos
*/

const path = require("path");
const schema = require(".." + "/" + "schema" + "/" + "schemas.js").schemas;

/**
 * Export Base Dao
 * @memberof com.sample.daos
 * @module base_dao
 * @see com.sample.daos.base_dao
 */
module.exports.base_dao = class base_dao{
	constructor(name,db){
		const UserSchema = new schema(db.con)._tables[name];
		this._tableObj = UserSchema;
		this._table = name;
		this._db = db.class;
	}
	
	bulkCreate(data,callback){
		this._db.bulkInsert(data,this._tableObj,callback);
	}
	
	/**
	 *  @summary Fire Create Command In the Database and Store the Data
	 *  @private
	 *  @memberof com.sample.daos.base_dao
	 *  @param [object] data Data For Storing in the Database in Column Format
	 *  @param [function] callback return callback function
	 *  @function create
	 */
	
	create(data,callback){
		console.log("table",this._tableObj);
		this._db.save(data,this._tableObj,null,callback);
	}
	
	/**
	 *  @summary Fire Get Command In the Database and retrive the Data
	 *  @private
	 *  @memberof com.sample.daos.base_dao
	 *  @param [string] query Sql Querys
	 *  @param [function] callback return callback function
	 *  @function get
	 */
	
	get(query,args,callback){
		query = query.replace("{{tableName}}",this._table);
		console.log(query);
		this._db.customQuery(query,args,callback);
	}
	
	/**
	 *  @summary Fire Update Command In the Database and update the Data
	 *  @private
	 *  @memberof com.sample.daos.base_dao
	 *  @param [object] data Data For Storing in the Database in Column Format
	 *  @param [object] conditions Where Conditions
	 *  @param [function] callback return callback function
	 *  @function get
	 */
	
	update(data,conditions,callback){
		this._db.updateAll(data,this._tableObj,conditions,null,callback);
	}


	/**  
	*  @summary Delete the Record From database and Return in callback function  
	*  @private  
	*  @memberof com.sample.daos.base_dao  
	*  @function remove  
	*  @param {Object} condition - Database Query Condition for Execution  
	*  @param {Boolean} soft - Soft Delete the Record?  
	*  @param {Function} callback - Callback Function Call When Query execute.  
	*/  
	remove(condition,soft,callback){  
		this._db.deleteAll(this._tableObj,condition,soft,null,callback); 
	}
};
