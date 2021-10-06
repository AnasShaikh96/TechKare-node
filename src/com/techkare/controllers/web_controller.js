"use strict";

/**
 * @class web_controller
 * @extends com.techkare.controllers.base_controller
 * @classdesc Application global app Controller
 * @memberof com.techkare.controllers
 */

const baseController = require("./base_controller.js").base_controller;

/**
 * Export App Controller Class
 * @memberof com.techkare.controllers
 * @module web_controller
 * @see com.techkare.controllers.web_controller
 */

module.exports.web_controller = class web_controller extends baseController {
  constructor() {
    super();
  }
  beforeLoad(req, res, next) {
    res.locals.domain = req.host;
    res.locals.protocol = req.protocol;
    if (req.csrfToken) {
      res.locals.token = req.csrfToken();
    }
    next();
  }

  /**
   * @summary Web root function
   * @public
   * @memberof com.techkare.controllers.web_controller
   * @function index
   * @param {request} req - User Request Object
   * @param {response} res - User Response Object
   */

  index(req, res, next) {
    // var db =  res.locals.SQLObject;

    // res.redirect("/login");
    next();
  }
  getHome(req, res, next) {
    res.render("index");
    next();
  }
  getService(req, res, next) {
    res.render("service");
    next();
  }
  getApp(req, res, next) {
    res.render("app");
    next();
  }
};
