'use strict'
const Sequelize			= require('sequelize');

module.exports.base_schema = class base_schema{
	constructor(){
		this._sequelize = Sequelize;
	}
}