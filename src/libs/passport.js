"use strict";

/**
 * @class passport
 * @classdesc Application Passport Library
 * @memberof com.techkare.libs
 */

var path = require("path");
var LocalStrategy = require("passport-local").Strategy;

/**
 * Export Application Index Object
 * @memberof com.techkare.libs
 * @module passport
 * @see com.techkare.libs.passport
 */

module.exports.passport = function (passport, app, options) {
  var opts = {};
  var db = null;
  //opts.secretOrKey = app.get("application_config")['session_secret'];
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {});

  // passport.use("Login",new LocalStrategy({
  // usernameField : 'email',
  // passwordField : 'password',
  // passReqToCallback : true
  // },function(req,username,password,done){
  // var cmsService = new cms_service();
  // cmsService.validateLogin(req,req.res.locals.SQLObject,function(error,success){
  // if(error){
  // return done(null,false);
  // }else{
  // console.log(success);
  // return done(null,success);
  // }
  // });
  // })
  // );
};
