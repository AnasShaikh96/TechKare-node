'use strict'

/**
* @class common
* @classdesc Application Common Library
* @memberof com.sample.libs
*/

const Table = require('cli-table');
function CommonActions(){};

/**
 *  @summary Log In the Console which user printed
 *  @public
 *  @memberof com.sample.libs.common
 *  @function log
 *  @param {Object} data Printing Content in console
 */

CommonActions.log = function(data){
	var currentDate = new Date();
	var logDate = ((currentDate.getDate()<10) ? "0" : "")+currentDate.getDate()+"/"+((currentDate.getMonth()<10) ? "0" : "")+currentDate.getMonth()+"/"+currentDate.getFullYear()+" "+((currentDate.getHours()<10) ? "0" : "")+currentDate.getHours()+":"+((currentDate.getMinutes()<10) ? "0" : "")+currentDate.getMinutes()+":"+((currentDate.getSeconds()<10) ? "0" : "")+currentDate.getSeconds()+":"+currentDate.getMilliseconds();
	
	if(typeof data === 'object'){
		console.log("Bot Log at : "+logDate+" : "+data);
	}else{
		console.log("Bot Log at : "+logDate+" : "+data);
	}
}

/**
 *  @summary Error Log In the Console which user printed
 *  @public
 *  @memberof com.sample.libs.common
 *  @function error
 *  @param {Object} data Printing Content in console
 */

CommonActions.error = function(data){
	var currentDate = new Date();
	var logDate = ((currentDate.getDate()<10) ? "0" : "")+currentDate.getDate()+"/"+((currentDate.getMonth()<10) ? "0" : "")+currentDate.getMonth()+"/"+currentDate.getFullYear()+" "+((currentDate.getHours()<10) ? "0" : "")+currentDate.getHours()+":"+((currentDate.getMinutes()<10) ? "0" : "")+currentDate.getMinutes()+":"+((currentDate.getSeconds()<10) ? "0" : "")+currentDate.getSeconds()+":"+currentDate.getMilliseconds();
	
	if(typeof data === 'object'){
		console.error("Bot Error at : "+logDate+" : "+JSON.stringify(data));
	}else{
		console.error("Bot Error at : "+logDate+" : "+data);
	}
}

CommonActions.stringToDate = function(_date,_format,_delimiter){
	 var formatLowerCase=_format.toLowerCase(); 
	 var formatItems=formatLowerCase.split(_delimiter);            
	 var dateItems=_date.split(_delimiter);            
	 var monthIndex=formatItems.indexOf("mm");            
	 var dayIndex=formatItems.indexOf("dd");            
	 var yearIndex=formatItems.indexOf("yyyy");            
	 var month=parseInt(dateItems[monthIndex]);            
	 month-=1;            
	 var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);            
	 return formatedDate;
}

CommonActions.abbreviateNumber = function(number) {
    var SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
    var tier = Math.log10(Math.abs(number)) / 3 | 0;
    if(tier == 0) return number;
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    var formatted = scaled.toFixed(1) + '';
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2);
    return formatted + postfix;
}

CommonActions.getMonthText = function(monthNumber) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthNumber];
}

/**
 * Export Application Common Object
 * @memberof com.sample.libs
 * @module common
 * @see com.sample.libs.common
 */

module.exports.common = CommonActions;
