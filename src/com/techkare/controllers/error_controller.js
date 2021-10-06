"use strict";

/**
 * @class error_controller
 * @extends com.techkare.controllers.base_controller
 * @classdesc Application global error Controller
 * @memberof com.techkare.controllers
 */

const baseController = require("./base_controller.js").base_controller;

/**
 * Export Error Controller Class
 * @memberof com.techkare.controllers
 * @module error_controller
 * @see com.techkare.controllers.error_controller
 */

module.exports.error_controller = class error_controller extends (
  baseController
) {
  constructor() {
    super();
  }

  /**
   * @summary Handle 404 request
   * @private
   * @memberof com.techkare.controllers.error_controller
   * @function forNotFor
   * @param {request} req - User Request Object
   * @param {response} res - User Response Object
   * @param {next} next - Express next param
   */

  forNotFor(req, res, next) {
    // res.status(404);

    // if(req.accepts('html')){
    // 	res.render('errors/404',{url:req.url});
    // 	return;
    // }

    // if(req.accepts("json")){
    // 	res.send({error:"Not Found"});
    // 	return;
    // }
    // res.type('txt').send("Not Found");
    if (!res.headersSent) {
      res.status(404);
      if (req.accepts("html")) {
        res.render("errors/404", { url: req.url });
        next();
        return;
      }
      if (req.accepts("json")) {
        res.send({ error: "Not Found" });
        next();
        return;
      }
      res.type("txt").send("Not Found");
    } else {
      next();
    }
  }

  /**
   * @summary Handle 500 request
   * @private
   * @memberof com.techkare.controllers.error_controller
   * @function fiveNotNot
   * @param {error} err - request Error Object
   * @param {request} req - User Request Object
   * @param {response} res - User Response Object
   * @param {next} next - Express next param
   */

  fiveNotNot(err, req, res, next) {
    console.log(err);
    if (err != null) {
      res.status(err.status || 500);
      res.render("errors/500", { error: err });
    } else {
      next();
    }
  }
};
