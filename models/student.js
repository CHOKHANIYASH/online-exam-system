
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

// ,{
// // MAKE VALIDATION FUNCTIONS HERE
// // Create new student in the database
// create: function(student, cb) {
//   student.insert(student, cb);
// },

// findByUserName: function(username, cb) {
//   student.findOne({username: username}, {}, cb);
// },

// // // Retrieve student using username
// // getByUserName:async function(username, cb) {
// //   student.findOne({username: username},cb)
// //   // console.log(data)
// //   // cb(data, {});
// // },

// // Update an existing student by username
// update: function(prevusername, student, cb) {
//   student.update({username: prevusername},
//   { $set: {username: student.username, password: student.password,
//   name: student.name, rollno: student.rollno} },
//   cb);
// },

// // Remove an existing student by username
// remove: function(username, cb) {
//   student.remove({username: username}, cb);
// },

// // Register student to a course by username and course ID
// register: function(username, course_code, cb) {
// student.update(
//    { username: username },
//    { $addToSet: { course_list: { $each: [ course_code] } } }, cb);
// },

// deregister: function(username, course_code, cb) 
// {
// student.update(
// 	{username: username},
// 	{ $pull: {  course_list: course_code } },cb);
// },

// getBycourseid: function(username,course_code, cb) {
//   student.findOne({username: username, course_list :course_code}, {}, cb);
// }
// }
// ;







