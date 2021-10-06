"use strict";

/**
 * @class web_routes
 * @extends com.techkare.routes.base_routes
 * @classdesc Application global app routes
 * @memberof com.techkare.routes
 */

const baseRoute = require("./base_routes.js").base_routes;
const path = require("path");

/**
 * Export App Routes Class
 * @memberof com.techkare.routes
 * @module api_routes
 * @see com.techkare.routes.web_routes
 */

module.exports.web_routes = class web_routes extends baseRoute {
  constructor(app) {
    super(app, __filename);
  }

  /**
   * @summary create static URLs
   * @public
   * @memberof com.techkare.routes.web_routes
   * @function load
   * @override
   */

  load() {
    this.app.get("/", this.controller.beforeLoad, this.controller.getHome);

    this.app.get(
      "/service",
      this.controller.beforeLoad,
      this.controller.getService
    );
    this.app.get("/app", this.controller.beforeLoad, this.controller.getApp);
  }
};
