"use strict";

/**
 * @class index
 * @classdesc Start Application Main
 * @memberof com.techkare
 */

const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const http = require("http");
const app = express();
const passport = require("passport");
const flash = require("connect-flash");
const responseTime = require("response-time");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const fs = require("fs");
const Table = require("cli-table");
const Session = require("express-session");
const FileStore = require("session-file-store")(Session);
const cookieParser = require("cookie-parser");
const compression = require("compression");
const curl = require("request");
//const acl				= require('express-acl');
const Sequelize = require("sequelize");
const csrf = require("csurf");
const console = require("." + "/" + "libs" + "/" + "common.js").common;
const mySql = require("." +
  "/" +
  "libs" +
  "/" +
  "mySqlSequelize.js").mySqlSequelize;
const oldInput = require("old-input");

module.exports.index = class index {
  constructor(Package) {
    /**
     * @private
     * @memberof com.techkare.index
     * @type {Object}
     */

    this._package = Package;

    /**
     * @private
     * @memberof com.techkare.index
     * @type {Object}
     */

    this._config = {};

    /**
     * @private
     * @memberof com.techkare.index
     * @type {Object}
     */

    this._server = null;

    /**
     * @public
     * @memberof com.techkare.index
     * @enum {number}
     */

    this.configType = {
      /** load config from configs/app.json file */
      system: 0,
      /** load config from custom file path*/
      custom: 1,
    };

    /**
     * @public
     * @memberof com.techkare.index
     * @type {Object}
     */

    this._console = console;

    this._app = app;
  }

  /**
   * @summary Load Application Config to private variable
   * @public
   * @memberof com.techkare.index
   * @function loadConfig
   * @param {string} configType config type like system or custom
   * @param {string} path - config file path
   */

  loadConfig(configType, configPath = null) {
    this._messages = require(__dirname +
      "/" +
      "configs" +
      "/" +
      "messages.js").messages;
    if (configType == 0) {
      this._config["app"] = require(__dirname + "/" + "configs" + "/" + "app");
      this._config["database"] = require(__dirname +
        "/" +
        "configs" +
        "/" +
        "database");

      if (
        fs.existsSync(
          __dirname + "/" + this._package.name + "/" + "/crons/scheduler.js"
        )
      ) {
        this._cron = new (require(__dirname +
          "/" +
          this._package.name +
          "/" +
          "/crons/scheduler.js").crons)(this._config["database"]);
      } else {
        console.log("No cron available");
      }
    } else {
      this._config["app"] = require(configPath);
    }
  }

  /**
   * @summary Get Application Config to private variable
   * @public
   * @memberof com.techkare.index
   * @function getConfig
   * @return {Object} Config JSObject
   */

  getConfig() {
    return this._config;
  }

  /**
   * @summary load routes
   * @public
   * @memberof com.techkare.index
   * @function routes
   */

  routes() {
    //this._schema = require(__dirname + "/" + this._package.name + "/" + "schema" + "/" + "autoload.js");
    new (require(__dirname +
      "/" +
      this._package.name +
      "/" +
      "routes" +
      "/" +
      "web_routes.js").web_routes)(app).load();
    new (require(__dirname +
      "/" +
      this._package.name +
      "/" +
      "routes" +
      "/" +
      "app_routes.js").app_routes)(app).load();
    new (require(__dirname +
      "/" +
      this._package.name +
      "/" +
      "routes" +
      "/" +
      "error_routes.js").error_routes)(app).load();
    // app.use(this.endDb);
  }

  /**
   *  @summary Get Request Offset and Store in req.locals
   *  @public
   *  @memberof com.techkare.index
   *  @function getRequestOffset
   *  @param {Request} req - Request Object
   *  @param {Response} res - Response Object
   *  @param {Next} next - Next Function Action Object
   */

  getRequestOffset(req, res, next) {
    var checkCurrentTimeZone = false;
    //console.log(JSON.stringify(req.session));
    if (req.session.request_ip) {
      if (req.session.request_ip != req.ip) {
        req.session.request_timeOffset = 0;
        checkCurrentTimeZone = true;
      }
    } else {
      if (req.ip != "::ffff:127.0.0.1") {
        req.session.request_timeOffset = 0;
        checkCurrentTimeZone = true;
      }
    }
    //console.log(req.ip);
    if (checkCurrentTimeZone) {
      curl(
        {
          url: "https://timezoneapi.io/api/ip/?" + req.ip,
          method: "GET",
        },
        function (error, response, body) {
          //console.log(body);
          if (response) {
            if (response.statusCode == 200) {
              try {
                var responseData = JSON.parse(body);
                if (responseData.hasOwnProperty("data")) {
                  if (responseData.data.hasOwnProperty("datetime")) {
                    var offset = 0;
                    if (responseData.data.datetime != null) {
                      offset = responseData.data.datetime.offset_seconds;
                    }
                    req.session.request_timeOffset = offset;
                    req.session.request_ip = req.ip;
                  }
                  //console.log(responseData);
                }
              } catch (e) {
                console.log(e);
              }
            }
            if (req.session.request_timeOffset) {
              res.locals.timeOffset = req.session.request_timeOffset;
            }
          }
          next();
        }
      );
    } else {
      if (req.session.request_timeOffset) {
        res.locals.timeOffset = req.session.request_timeOffset;
      }
      next();
    }
  }

  headers(req, res, next) {
    //		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    console.log(req.path);
    next();
  }

  /**
   * @summary start Db Connection
   * @public
   * @memberof com.techkare.index
   * @function startDb
   */

  startDb(r, req, res, next) {
    console.log("Start DB");
    var db = new mySql();
    var options = r._config["database"];
    db.hostName = r._config["database"].host;
    db.userName = r._config["database"].user;
    db.password = r._config["database"].password;
    db.database = r._config["database"].database;
    db.debugInfo = r._config["database"].debug;
    db.createConnection(function (err, success) {
      if (err) {
        console.log(err);
        res.json({ success: 0, message: "Database Connection Error" });
        //r.endDb(req,res);
        return;
      } else {
        console.log("Database connected");
        res.locals.SQLObject = success;
        next();
      }
    });
  }

  /**
   * @summary end Db Connection
   * @public
   * @memberof com.techkare.index
   * @function endDb
   */

  endDb(req, res, next) {
    console.log("End Connection");
    res.locals.SQLObject.class.close();
    next();
  }

  /**
   * @summary create Exprees configurations
   * @public
   * @memberof com.techkare.index
   * @function expreesConfiguration
   */

  expreesConfiguration() {
    var proxy = 2;
    if (this._config.hasOwnProperty("app")) {
      /*acl.config({
				rules:this._config["acl"]
			},{
				status: 'Access Denied',
				customMessage: 'You are not authorized to access this resource'
			});*/
      const session_file_options = {
        path:
          __dirname + !this._config.app._sessionPath
            ? "../sessions"
            : this._config.app._sessionPath,
        encrypt: true,
      };

      this._session = Session({
        store: new FileStore(session_file_options),
        secret: !this._config.app.sessionSecret
          ? "JJHUYNSKJNSJKCNSDJKNJKNJKDCKSNCKSD"
          : this._config.app.sessionSecret,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        name: !this._config.app.sessionName
          ? this._package.name
          : this._package.name,
        cookie: {
          secure: false,
          maxAge: 86400000,
        },
      });

      if (this._config.app.hasOwnProperty("_proxy")) {
        proxy = this._config.app._proxy;
      } else {
        proxy = 2;
      }
      app.set("app_config", this._config);
      app.set("messages", this._messages);
      app.set("trust proxy", proxy);
      var logDirectory = path.join(__dirname, ".." + "/" + ".." + "/" + "log");
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
      var accessLogStream = rfs(this._package.name + ".log", {
        interval: "1d",
        path: logDirectory,
      });

      var p = require(__dirname + "/" + "libs" + "/" + "passport.js").passport(
        passport,
        app,
        this._config.database
      );

      app.use(compression());
      app.use(morgan("combined", { stream: accessLogStream }));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cookieParser(this._config.app.sessionSecret));
      app.use(bodyParser.json());
      app.use(methodOverride());
      app.use(this.headers);
      app.disable("x-powered-by");
      app.set("etag", false);
      app.set("host", this._config.app._host);
      app.use(responseTime());
      app.use(express.static(__dirname + "/" + "res" + "/" + "public"));
      app.use(
        express.static(__dirname + "/" + ".." + "/" + ".." + "/" + "jsdoc")
      );
      app.use(
        express.static(__dirname + "/" + ".." + "/" + ".." + "/" + "Uploads")
      );
      app.use(passport.initialize());
      app.set("views", __dirname + "/" + "res" + "/" + "views");
      app.set("view engine", "ejs");
      var debug = 0;
      if (this._config.app.hasOwnProperty("_debug")) {
        if (this._config.app._debug == true) {
          app.enable("verbose errors");
        } else {
          app.disable("verbose errors");
        }
      } else {
        app.enable("verbose errors");
      }
      app.use(this.addMessages.bind(null, this));
      app.use(this._session);
      app.use(passport.session());
      app.use(flash());

      app.use(this.conditionalCSRF);
      app.use(oldInput);
      //app.use(this.getRequestOffset);
      // app.use(this.startDb.bind(null,this));
    }
  }

  /**
   * @summary Create Applicaton Express Server from load config
   * @public
   * @memberof com.techkare.index
   * @function startServer
   * @throws {null} throw an error if application config not set
   */

  startServer() {
    if (
      fs.existsSync(
        __dirname + "/" + this._package.name + "/" + "/schema/schemas.js"
      )
    ) {
      var db = new mySql();
      var options = this._config["database"];
      db.hostName = this._config["database"].host;
      db.userName = this._config["database"].user;
      db.password = this._config["database"].password;
      db.database = this._config["database"].database;
      db.debugInfo = this._config["database"].debug;
      db.createConnection(
        function (r, err, success) {
          if (err) {
            console.log(err);
            //res.json({success:0,message:"Database Connection Error"});
            //r.endDb(req,res);
            return;
          } else {
            console.log("Database connected");
            new (require(__dirname +
              "/" +
              r._package.name +
              "/" +
              "/schema/schemas.js").schemas)(success.con).setUp();
          }
        }.bind(null, this)
      );
    } else {
      console.log("Schema Not FOUND.");
    }
    if (this.hasOwnProperty("_config")) {
      if (Object.keys(this._config).length > 0) {
        this._server = http.createServer(app);
        this._server.listen(this._config.app._system_port, function () {});
        this._server.on(
          "listening",
          function (r) {
            console.log("Server is Up on : " + r._config.app._system_port);
          }.bind(null, this)
        );

        this._server.on("error", function (err) {
          if (err.code == "EADDRINUSE") {
            console.log("Port Already In Use");
          } else {
            console.log(err);
          }
        });
      } else {
        throw "Config not set. Please set and try again.";
      }
    } else {
      throw "Config not set. Please set and try again.";
    }
  }

  /**
   * @summary Print all routes Stack
   * @public
   * @memberof com.techkare.index
   * @function printStack
   */

  printStack() {
    var table = new Table({ head: ["", "Path", "Action name"] });
    for (var key in app._router.stack) {
      if (app._router.stack.hasOwnProperty(key)) {
        var val = app._router.stack[key];
        if (val.route) {
          val = val.route;
          var _o = {};
          _o[val.stack[0].method] = [val.path];
          _o[val.stack[0].method].push(val.stack[0].name);
          table.push(_o);
        }
      }
    }
    console.log("\n" + table.toString());
  }

  /**
   * @summary append Messages in the request
   * @public
   * @memberof com.nifty.index
   * @function addMessages
   * @param {request} req - User Request Object
   * @param {response} res - User Response Object
   * @param {next} next - Next Function Handler
   */
  addMessages(r, req, res, next) {
    res.locals.messages = app.get("messages");
    res.locals.app_config = r._config["app"];
    next();
  }

  /**
   * @summary Check csrf token for required routes
   * @public
   * @memberof com.techkare.index
   * @function conditionalCSRF
   * @param {request} req - User Request Object
   * @param {response} res - User Response Object
   * @param {next} next - Next Function Handler
   */
  conditionalCSRF(req, res, next) {
    //compute needCSRF here as appropriate based on req.path or whatever
    var path = req.path;
    var needCSRF = true;
    if (
      path.indexOf("api") >= 0 ||
      req.path.indexOf("/admin/products/bulk-upload") != -1
    ) {
      needCSRF = false;
    }

    if (needCSRF) {
      var obj = csrf({ cookie: true });
      obj(req, res, next);
    } else {
      next();
    }
  }
};
