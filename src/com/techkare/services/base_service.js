"use strict";

/**
 * @namespace com.techkare.servies
 * @auther Graymatrix soluations PVT LTD
 * @version 1.0.0
 */

/**
 * @class base_service
 * @classdesc Application Base Model
 * @memberof com.techkare.servies
 */

const path = require("path");
const csv = require("fast-csv");
const fs = require("fs");

/**
 * Export Base Service Class
 * @memberof com.techkare.servies
 * @module base_service
 * @see com.techkare.servies.base_service
 */

module.exports.base_service = class base_service {
  constructor() {}

  parseCsv(path, callback) {
    try {
      if (fs.existsSync(path)) {
        var stream = fs.createReadStream(path);
        var dataAdded = [];
        var errAdded = [];
        csv
          .fromStream(stream, { headers: true })
          .on("data", function (data) {
            dataAdded.push(data);
          })
          .on("error", function (err) {
            console.log(err);
          })
          .on("end", function () {
            console.log("File Reading Done");
            callback(null, dataAdded);
          });
      } else {
        callback({ success: 0, message: "File Not Found" }, null);
      }
    } catch (ex) {
      console.log("i m here in error");
    }
  }

  replaceAll(val, search, replacement) {
    var target = val;
    return target.replace(new RegExp(search, "g"), replacement);
  }
};
