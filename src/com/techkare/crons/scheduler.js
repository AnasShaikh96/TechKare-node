"use strict";

/**
 * @class cron
 * @classdesc Cron Ranges<br>
 *
 *  When specifying your cron values you'll need to make sure that your values fall within the ranges. For instance, some cron's use a 0-7 range for the day of week where both 0 and 7 represent Sunday. We do not.<br>
 *  Seconds: 0-59  </br>
 * Minutes: 0-59 </br>
 * Hours: 0-23 </br>
 * Day of Month: 1-31  </br>
 * Months: 0-11  <br>
 * Day of Week: 0-6  </br>
 * @memberof com.techkare
 */

const path = require("path");
const CronJob = require("cron").CronJob;
const mySql = require("../../../" +
  "/" +
  "libs" +
  "/" +
  "mySqlSequelize.js").mySqlSequelize;
const helper = require(".." +
  "/" +
  "helpers" +
  "/" +
  "common_helper.js").config;

/**
 * Export Base Cron Class
 * @memberof com.techkare
 * @module cron
 * @see com.techkare.cron
 */

module.exports.crons = class crons {
  constructor(db) {
    this._dbConfig = db;

    /**
     *  Cron Ranges<br>
     *
     *  When specifying your cron values you'll need to make sure that your values fall within the ranges. For instance, some cron's use a 0-7 range for the day of week where both 0 and 7 represent Sunday. We do not.<br>
     *  Seconds: 0-59 </br>
     *  Minutes: 0-59 </br>
     *  Hours: 0-23 </br>
     *  Day of Month: 1-31  </br>
     *  Months: 0-11  <br>
     *  Day of Week: 0-6  </br>
     */
    if (
      typeof process.env.NODE_APP_INSTANCE !== typeof undefined &&
      process.env.NODE_APP_INSTANCE == "0"
    ) {
    }
  }

  endDb(db) {
    console.log("End Connection");
    db.close();
  }

  startDb(callback) {
    console.log("Start Cron Database Connection.");
    var db = new mySql();
    var options = this._dbConfig;
    //console.log(options);
    db.hostName = options.host;
    db.userName = options.user;
    db.password = options.password;
    db.database = options.database;
    db.debugInfo = options.debug;
    db.createConnection(function (err, db) {
      if (err) {
        console.log(err);
        callback(error, null);
      } else {
        console.log("Connected");
        callback(null, db);
      }
    });
  }
};
