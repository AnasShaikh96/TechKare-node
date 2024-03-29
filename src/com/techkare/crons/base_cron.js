"use strict";

/**
 * @namespace com.techkare.crons
 * @auther Graymatrix soluations PVT LTD
 * @version 1.0.0
 */

/**
 * @class base_cron
 * @classdesc Application Base Model
 * @memberof com.techkare.crons
 */

module.exports.base_cron = class base_cron {
  constructor() {}

  /**
   *  @summary Fire the Cron and running
   *  @public
   *  @memberof com.techkare.crons.base_cron
   *  @function fire
   *  @param {Object} args - cron arguments
   */

  fire() {
    console.log("start function not defined on child class");
  }
};
