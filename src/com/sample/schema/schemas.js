'use strict'


module.exports.schemas = class schemas{
	constructor(sequelizeObj){
		this._squelize = sequelizeObj;
		this._tables = {
			
		}
	}
	
	setUp(){
		for(var i in this._tables){
			this._tables[i].sync();
		}
	}
}