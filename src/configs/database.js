"use strict";

/**
 * @public
 * @alias Database
 * @memberof com.techkare.config
 * @enum {string|number}
 */

module.exports = {
  /**
   * Database Host name
   * @type {string}
   */
  host: "localhost",
  /**
   * Database Username
   * @type {string}
   */
  user: "root",
  /**
   * Database Password
   * @type {string}
   */
  password: "pass@123",
  /**
   * Database Name
   * @type {string}
   */
  database: "test_db",
  /**
   * Database Connection Timeout
   * @type {Number}
   */
  connectTimeout: 10000,
  /**
   * Database Date Time Zone
   * @type {String}
   */
  timezone: "UTC",
  debug: true,
};
