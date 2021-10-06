"use strict";

/**
 * @class error_routes
 * @extends com.techkare.routes.base_routes
 * @classdesc Application global error routes
 * @memberof com.techkare.routes
 */

const baseRoute = require("./base_routes.js").base_routes;

/**
 * Export Error Routes Class
 * @memberof com.techkare.routes
 * @module error_routes
 * @see com.techkare.routes.error_routes
 */

module.exports.error_routes = class error_routes extends baseRoute {
  constructor(app) {
    super(app, __filename);
  }

  /**
   * @summary create static URLs
   * @public
   * @memberof com.techkare.routes.error_routes
   * @function load
   * @override
   */

  load() {
    this.app.use(this.controller.forNotFor);
    this.app.use(this.controller.fiveNotNot);
  }
};
