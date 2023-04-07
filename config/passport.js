var LocalStrategy = require('passport-local').Strategy;

var admin = require('../models/admin.js');
var student = require('../models/student.js');
var FacultyUser = require('../models/faculty.js');

module.exports = function(passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function (user, done) {
        done(null, JSON.parse(user));
    });

    passport.use('local-login-admin', new LocalStrategy(admin.authenticate()));
    
    passport.use('local-login-student', new LocalStrategy(student.authenticate()));
    
    // passport.use('local-login-faculty', new LocalStrategy({}));

};
