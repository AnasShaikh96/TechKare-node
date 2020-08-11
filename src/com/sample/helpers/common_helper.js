'use strict'

/**
* @class common_helper
* @extends com.sample.helpers.base_helper
* @classdesc Application Base Model
* @memberof com.sample.helpers
*/

const path 			= require("path");
const baseHelper 	= require("." + "/" + "base_helper.js").base_helper;
const global_vars 	= require("../../../configs/global_vars.js");
const messages 		= require("../../../configs/messages.js").messages;
/**
 * Export Common Helper Class Object
 * @memberof com.sample.helpers
 * @module common_helper
 * @see com.sample.helpers.common_helper

 */

module.exports.common_helper = class common_helper extends baseHelper{
	constructor(){
		super();
	}

	/**
	 *  @summery Create Filter Query
	 *  @public
	 *  @memberof com.sample.helpers.common_helper
	 *  @function createFilter
	 *  @param {Object} filter - Data To be Filter
	 *  @return Where Query
	 */

	createFilter(filter,allowdeleted=true,handler="and"){
		var query = "";
		if(typeof filter !== typeof undefined && filter != null){
			query += "where ";
			for(var i=0;i<filter.length;i++){
				var param = filter[i];
				var flag = (filter.length-1)<=i;
				query += this.handlerOr(param,"and",flag);
			}
			query += ((filter.length>0) ? " and " : "") + ((allowdeleted) ? "deleted_at is NULL" : "1=1");
		}else{
            query += "where ";
			query += (allowdeleted) ? "deleted_at is NULL" : "";
		}
		return query;
	}

	checkQuery(param){
		var rString = "";
		// console.log();
		switch(param[1]){
			case "=":
				rString += param[0] + " = '" + param[2] + "'";
				break;
			case ">":
				rString += param[0] + " > '" + param[2] + "'";
				break;
			case ">=":
				rString += param[0] + " >= '" + param[2] + "'";
				break;
			case "<":
				rString += param[0] + " < '" + param[2] + "'";
				break;
			case "<=":
				rString += param[0] + " <= '" + param[2] + "'";
				break;
			case "!=":
				rString += param[0] + " <> '" + param[2] + "'";
				break;
			case "in":
				rString += param[0] + " in (" + param[2] + ")";
				break;
			case "not in":
				rString += param[0] + " not in (" + param[2] + ")";
				break;
			case "is":
				rString += param[0] + " is " + param[2];
				break;
			case "is not":
				rString += param[0] + " is not " + param[2];
				break;
			case "like":
				rString += param[0] + " like '" + param[2] + "%'";
				break;
			case "%like%":
				rString += param[0] + " like '%" +param[2] +"%'";
				break;
			default:
				rString += param[0] + " = " + param[2];
				break;
		}
		return rString;
	}




	handlerOr(param,handler,terminate=false){
		var rString = "";
		// console.log("ccccccc"+terminate);
		if(param[0]=="OR"){
			rString += "(";
			for(var i in param[1]){
				var flag = (param[1].length-1)<=i;
				// console.log("csdcsd" + flag);
				// console.log(i);
				rString += this.handlerOr(param[1][i],"or",flag);
				// console.log(rString);
			}
			rString += ")";
		}else{
			rString += this.checkQuery(param);

			if(terminate==false){
				if(handler=="and")
					rString += " and ";
				else
					rString += " or ";
			}
		}
		// console.log(rString);
		return rString;
	}

	formatValidationError(validationModel,req=''){
		var saveData = null;
        var errorMessage = {};
        if(validationModel.hasOwnProperty("error") && validationModel.error!=null){
            var errorMessages = validationModel.error.details;
            for(var i in errorMessages){
                if(!errorMessage.hasOwnProperty(errorMessages[i].path)){
                    errorMessage[errorMessages[i].path] = errorMessages[i].message;
                    if(req){
                        req.oldInput.setError(errorMessages[i].path, errorMessages[i].message);
                    }
                }
            }
            var errorObj={};
            errorObj.errorType ='V';
            errorObj.msg=errorMessage;
            return errorObj;//super.generateRes('',0,errorObj);
        }else{
        	saveData = validationModel.value;
            return saveData;//super.generateRes('',1,saveData);
        }
	}
};

// module.exports.validationError = {
	
// }

module.exports.message = {
	getAllMessages:()=>{
        return messages;
    },
    getRequestMessage:(req)=>{
		return req.client._httpMessage.locals.messages;
	},
	getMessage:(key)=>{
		//console.log(messages)
        var pattern=key.split(".");
        var value='';
        if(pattern.length>1){
            for(var i in pattern){
                if(value == ""){
                    if(typeof messages[pattern[i]] !== typeof undefined){
                        value=messages[pattern[i]];
                    }
                } else {
                    if(typeof value[pattern[i]] !== typeof undefined) {
                        value = value[pattern[i]];
                    }
                }
            }
            if(typeof value !== typeof undefined){
                return value;
            } else {
                return '';
            }
        } else {
            if(typeof messages[key] !== typeof undefined){
                return messages[key];
            } else {
                return '';
            }
        }
	},
	getApplicationConfig:(req)=>{
		return req.client._httpMessage.locals.app_config;
	}

}


module.exports.config = {
    getGV:(key)=>{
        var pattern=key.split(".");
        var value='';
        if(pattern.length>1){
            for(var i in pattern){
                if(value == ""){
                    if(typeof global_vars[pattern[i]] !== typeof undefined){
                        value=global_vars[pattern[i]];
                    }
                } else {
                        if(typeof value[pattern[i]] !== typeof undefined) {
                        value = value[pattern[i]];
                        }
                }
                }
                if(typeof value !== typeof undefined){
                   return value;
                } else {
                   return '';
                }
        } else {
            if(typeof global_vars[key] !== typeof undefined){
                return global_vars[key];
            } else {
                return '';
            }
        }
    }
}