'use strict'


/**
* @namespace com.sample
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @file Application main entry Point for on Startup
* App Package for Createing Apis
* @requires express
* @requires body-parser
* @requires method-override
* @requires path
* @requires http
* @requires connect-flash
* @requires response-time
* @requires morgan
* @requires rotating-file-stream
* @requires fs
* @requires cli-table
* @requires express-session;
* @requires express-socket.io-session;
* @requires session-file-store;
* @requires cookie-parser;
* @requires compression;
* @requires request;
* @requires joi;
*/


const main = require("./src").index;
const packages = require("./package");

var packageConfig = {
	'name' : packages.name.replace(/\./g,"/")
};

var home = new main(packageConfig);
//home.LoadDB();
home.loadConfig(home.configType.system);
home.expreesConfiguration();
home.routes();
home.startServer();
home.printStack();

process.on('uncaughtException', function (err) {
  console.log(err);
})
