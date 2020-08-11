'use strict'
const Sequelize			= require('sequelize');
const path 				= require("path");
const dateformat 		= require("dateformat");
const baseLibs 			= require("." + "/" + "base_lib.js").base_lib;

module.exports.mySqlSequelize = class mySqlSequelize extends baseLibs{
	constructor(){
		super();
		this.host_name = "";
		this.user_name = "";
		this.pwd = "";
		this.base = "";
		this.multiple_statements = false;
		this.debug = null;
		this.connection = null;
	}
	
	set hostName(hostname){
		this.host_name = hostname;
	}
	
	get hostName(){
		return this.host_name;
	}
	
	set userName(user){
		this.user_name = user;
	}
	
	get userName(){
		return this.user_name;
	}
	
	set password(password){
		this.pwd = password;
	}
	
	get password(){
		return this.pwd;
	}
	
	set database(database){
		this.base = database;
	}
	
	get database(){
		return this.base;
	}
	
	set debugInfo(debug){
		this.debug = debug;
	}
	
	get debugInfo(){
		return this.debug;
	}
	
	set multipleStatements(BOOL){
		this.multiple_statements = BOOL;
	}
	
	get multipleStatements(){
		return this.multiple_statements;
	}
	createConnection(callback){
		var options = {
			// the sql dialect of the database
			// currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
			dialect: 'mysql',

			// custom host; default: localhost
			host: this.host_name,

			// custom port; default: dialect default

			// custom protocol; default: 'tcp'
			// postgres only, useful for Heroku
			protocol: 'tcp',

			// disable logging; default: console.log
			logging: this.debug,

			// you can also pass any dialect options to the underlying dialect library
			// - default is empty
			// - currently supported: 'mysql', 'postgres', 'mssql'
			dialectOptions: {
				supportBigNumbers: true,
				bigNumberStrings: true
			},

			// the storage engine for sqlite
			// - default ':memory:'
			storage: 'path/to/database.sqlite',

			// disable inserting undefined values as NULL
			// - default: false
			omitNull: true,

			// a flag for using a native library or not.
			// in the case of 'pg' -- set this to true will allow SSL support
			// - default: false
			native: true,

			// Specify options, which are used when sequelize.define is called.
			// The following example:
			//   define: { timestamps: false }
			// is basically the same as:
			//   sequelize.define(name, attributes, { timestamps: false })
			// so defining the timestamps for each model will be not necessary
			define: {
				underscored: true,
				paranoid	: true,
				freezeTableName: true,
				charset: 'utf8',
				dialectOptions: {
					collate: 'utf8_general_ci'
				},
				timestamps: true
			},

			// similar for sync: you can define this to always force sync for models
			sync: { 
				force: false
			},

			// pool configuration used to pool database connections
			pool: {
				max: 5,
				idle: 30000,
				acquire: 60000,
			},

			// isolation level of each transaction
			// defaults to dialect default
			//isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
		}
		this.connection = new Sequelize(this.database,this.user_name,this.pwd,options);
		this.connection.authenticate().then(function(con){
			callback(null,{con : con.connection,class:con});
		}.bind(null,this)).catch(err=>{
			this.connection = null;
			callback(err,null);
		});
	}
	createTable(Columns,tablename,callback){
		var table  = this.connection.define(tablename,Columns);
		table.sync().then(()=>{
			callback(null,"Success");
		}).catch(error=>{
			callback(error,null);
		});
		/*var query = "CREATE TABLE IF NOT EXISTS "+tablename+"(";
		for(var col in Columns){
			query += "`"+col+"` "+Columns[col]+",";
		}
		query += "`created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,`updated_at` TIMESTAMP NOT NULL,`deleted_at` TIMESTAMP NULL";
		if(primary.length>0){
			for(var pr in primary){
				query += ", PRIMARY KEY(`"+primary[pr]+"`)";
			}
		}
		query += ") ENGINE = InnoDB";
		var querys = this.connection.query(query,function(err,rows,fields){
			if(this.debug)
				this.debug.log(querys.sql);
			if(err)
				callback(err,null);
			else{
				var tables = {result:rows,field:fields};
				callback(null,tables);
			}
		});*/
	}
	
	bulkInsert(data,model,callback){
		var bulkInsert = model.bulkCreate(data).then(dump=>{
			callback(null,dump);
		}).catch(error=>{
			callback(error,null);
		})
	}
	
	save(data,model,trans,callback){
		model.create(data,{transaction : trans}).then(dump=>{
			callback(null,dump);
		}).catch(error=>{
			callback(error,null);
		})
		/*data['created_at'] = new Date();
		data['updated_at'] = new Date();
		var query = "INSERT INTO "+tablename+" SET ?";
		console.log(query);
		var querys = this.connection.query(query,data,callback);
		if(this.debug)
			this.debug.log(querys.sql);*/
	}

	updateAll(data,model,conditions,trans,callback){
		model.update(data,{where:conditions,transaction : trans}).then(dump=>{
			callback(null,dump);
		}).catch(error=>{
			callback(error,null);
		});
		/*data['updated_at'] = new Date();
		
		var query = "UPDATE "+tablename+" SET ?";
		if(conditions.length>0){
			query += " where ";
			console.log(conditions);
			for(var k in conditions){
				
				for(var m in conditions[k]){
					query += " "+m+conditions[k][m];
				}
			}
			query += " and deleted_at IS NULL";
		}else{
			query += " where deleted_at IS NULL";
		}
		console.log(query);
		var querys = this.connection.query(query,[data],callback);
		if(this.debug)
			this.debug.log(querys.sql);*/
	}
	getRecord(model,fileds,conditions,trans,callback){
		model.findAll({
			attributes:fields,
			where : conditions,
			transaction : trans
		}).then(dump=>{
			callback(null,dump);
		}).catch(error=>{
			callback(error,null);
		});
		/*var query = "SELECT ";
		if(fileds.length>0){
			for(var k in fileds){
				query+= fileds[k]+",";
			}
		}else{
			query += "*,";
		}
		query = query.substring(0,query.length-1);
		query += " FROM "+tablename;
		if(conditions.length>0){
			query += " where ";
			for(var k in conditions){
				for(var m in conditions[k]){
					query += " "+m+conditions[k][m];
				}
			}
			query += " and deleted_at IS NULL";
		}else{
			query += " where deleted_at IS NULL";
		}
		
		
		var querys = this.connection.query(query,function(err,rows,fields){
			if(err)
				callback(err,null);
			else{
				var tables = {result:rows,field:fields};
				callback(null,tables);
			}
		});
		if(this.debug)
			this.debug.log(querys.sql);*/
	}
	deleteAll(model,conditions,soft=true,trans,callback){
		model.destroy({
			where : conditions,
			force : ((soft) ? false : true),
			transaction : trans
		}).then(dump=>{
			callback(null,dump);
		}).catch(error=>{
			callback(error,null);
		});
		/*var query = "";
		if(soft){
			query += "UPDATE "+tablename+" SET deleted_at=?";
		}else{
			query += "DELETE FROM "+tablename;
		}
		if(conditions.length>0){
			query += " where ";
			for(var k in conditions){
				for(var m in conditions[k]){
					query += " "+m+conditions[k][m];
				}
			}
		}
		
		var querys = this.connection.query(query,[new Date()],function(error,rows,fields){
			if(error)
				callback(error,null);
			else{
				var tables = {result:rows,field:fields};
				callback(null,tables);
			}
		});
		if(this.debug)
			this.debug.log(querys.sql);*/
	}
	customQuery(query,param,callback){
		//console.log(param)
		this.connection.query(query,{bind:param}).then(data=>{
			//console.log(data);
			callback(null,{result:data[0]});
		}).catch(error=>{
			callback(error,null);
		});
		/*var querys = this.connection.query(query,param,function(error,rows,fields){
			// console.log(error);return false;
			//console.log(error);
			if(error){
				callback(error,null);
			}else{
				var tables = {result:rows,field:fields};
				callback(null,tables);
			}
		});
		if(this.debug)
			this.debug.log(querys.sql);*/
	}
	createTransaction(callback){
		this.connection.transaction(function(trans){
			callback(trans);
		});
	}
	close(){
		// this.connection.end(function(err){
			// if(err){
				// console.log(err);
			// this.connection = null;
			//this.connection.end();
			this.connection.close()
			// }
		// });
		// this.connection.destroy();
	}
}