'use strict'

/**
* @namespace com.sample.models
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @class base_model
* @classdesc Application Base Model
* @memberof com.sample.models
*/

const path = require("path");
const helper = require(".." + "/" + "helpers" + "/" + "common_helper.js").common_helper; 

/**
 * Export Base Model Class
 * @memberof com.sample.models
 * @module base_model
 * @see com.sample.models.base_model
 */

module.exports.base_model = class base_model{
	
	constructor(name,db){
		if(name){
			var ContollerFile = name;
			ContollerFile = ContollerFile.replace(__dirname,"");
			var tempName = ContollerFile;
			ContollerFile = __dirname + "/" + ".." + "/" + "daos" + "/" + ContollerFile.replace("model","dao");
			var DTOFile  = __dirname + "/" + ".." + "/" + "dtos"  + tempName.replace("model","dto");
			this.dao = new (require(ContollerFile)[path.basename(ContollerFile).replace(".js","")])(db);
			this.dto = require(DTOFile)[path.basename(DTOFile).replace(".js","")];
			//console.log(db);
		}
	}
	
	bulkCreate(data,callback){
		this.dao.bulkCreate(data,callback);
	}
	
	/**
	* @summary Model Create
	* @public
	* @memberof com.sample.models.base_model
	* @function create
	* @param {Object} data - Save Date With Key Value Pair
	* @param {function} callback - callback Function 
	*/
	
	create(data,callback){
		this.dao.create(data,callback);
	}
	
	/**
	* @summary Model Update
	* @public
	* @memberof com.sample.models.base_model
	* @function update
	* @param {object} data - Update Value for Column Format
	* @param {object} conditions - Where Conditions
	* @param {function} callback - callback Function 
	*/
	
	update(data,conditions,callback){
		this.dao.update(data,conditions,callback);
	}
	
	/**
		* @summary Model Delete
		* @public
		* @memberof com.sample.models.base_model
		* @function delete
		* @param {object} conditions 	- Where Condition
		* @param {boolean} soft			- To delete the record permanently or soft delete (Possible values true ,false)
		* @param {function} callback 	- callback function
	*/
	
	delete(conditions,soft,callback){
		this.dao.remove(conditions,soft,callback);
	}
	
	/**
	* @summary Model Select
	* @public
	* @memberof com.sample.models.base_model
	* @function select
	* @param {string} query - Sql Querys
	* @param {function} callback - callback Function 
	*/
	
	select(query,args,callback){
		this.dao.select(query,args,function(r,error,success){
			if(success!=null){
				//console.log(success);
				var tempDump = [];
				for(var i in success.result){
					var k = new r.dto();
					//console.log();
					k.populate(JSON.parse(JSON.stringify(success.result[i])));
					tempDump.push(k);
				}
			}
			callback(error,tempDump);
		}.bind(null,this));
	}


	/**
	* @summary Model getResultSet
	* @public
	* @memberof com.sample.models.base_model
	* @function select
	* @param {string} query - Sql Querys
	* @param {function} callback - callback Function 
	*/
	getRecord(filterObj,callback,query='',join_conditions=''){
		var filterQuery = new helper().createFilter(filterObj.conditions);
        if(!query){
            var query="select * from {{tableName}} ";
        }
        query+=filterQuery;
        console.log(query);
        if(typeof filterObj.page !== typeof undefined && typeof filterObj.limit !== typeof undefined ){
            var resultObj={};
            var countQuery="select count({{tableName}}.id) as recCount from {{tableName}} " + filterQuery;
            this.dao.select(countQuery,function(r,error,success){
                if(error){
                    callback(error,null);
                } else {
                    resultObj.totalCount=success.result[0].recCount;
                    query+=' limit '+((parseInt(filterObj.page)-1)*parseInt(filterObj.limit))+','+parseInt(filterObj.limit);
                    r.dao.select(query,function(error,success){
                        if(error){
                            callback(error,null);
                        } else {
                            resultObj.result=success.result;
                            callback(null,resultObj);
                        }
                    });
                }
            }.bind(null,this));
        } else {
        	// console.log(query);return false;
        	this.dao.select(query,function(error,success){
                if(error){
                    callback(error,null);
                } else {
                    var resultObj={};
                    resultObj.result=success.result;
                    callback(null,resultObj);
                }
            });
        }
    }
};
