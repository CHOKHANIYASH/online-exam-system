var express = require('express');
var router = express.Router();

// var monk = require('monk');
// var db = monk('localhost:27017/examdb');
// var adminSchema = db.get('admin');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var adminSchema = new mongoose.Schema({
  username:String,
  name:String,
  institute:String,
});
adminSchema.plugin(passportLocalMongoose)
const admin = mongoose.model('admin',adminSchema)


module.exports = admin;
