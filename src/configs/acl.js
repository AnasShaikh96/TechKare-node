"use strict";

/**
 * @public
 * @alias ACL
 * @memberof com.techkare.config
 * @enum {String}
 */

module.exports.ACL = [
  {
    group: "guest",
    permissions: [
      {
        resource: "login",
        methods: ["POST", "GET"],
        action: "allow",
      },
      {
        resource: "forgotPassword",
        methods: ["POST", "GET"],
        action: "allow",
      },
      {
        resource: "*",
        methods: ["POST", "GET", "PUT", "DELETE"],
        action: "deny",
      },
    ],
  },
  {
    group: "M",
    permissions: [
      {
        resource: "dashboard",
        methods: ["GET"],
        action: "allow",
      },
      {
        resource: "calender",
        methods: ["GET"],
        action: "allow",
      },
      {
        resource: "profile",
        methods: ["GET", "POST"],
        action: "allow",
      },
      {
        resource: "logout",
        methods: ["GET"],
        action: "allow",
      },
      {
        resource: "changePassword",
        methods: ["GET", "POST"],
        action: "allow",
      },
    ],
  },
  {
    group: "A",
    permissions: [
      {
        resource: "dashboard",
        methods: ["GET"],
        action: "allow",
      },
      {
        resource: "logout",
        methods: ["GET"],
        action: "allow",
      },
      {
        resource: "users/create",
        methods: ["GET", "POST"],
        action: "allow",
      },
      {
        resource: "users/edit/*",
        methods: ["GET", "POST"],
        action: "allow",
      },
      {
        resource: "users/delete/*",
        methods: ["POST"],
        action: "allow",
      },
      {
        resource: "users/*",
        methods: ["GET"],
        action: "allow",
      },
      {
        resource: "calender",
        methods: ["GET"],
        action: "deny",
      },
      {
        resource: "changePassword",
        methods: ["GET", "POST"],
        action: "allow",
      },
      {
        resource: "*",
        methods: ["GET"],
        action: "deny",
      },
    ],
  },
];
