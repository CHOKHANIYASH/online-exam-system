
const passportLocalMongoose = require('passport-local-mongoose');

var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
  username:String,
  name:String,
  rollno:Number,
});
studentSchema.plugin(passportLocalMongoose)
const student = new mongoose.model('student',studentSchema)
module.exports = student
