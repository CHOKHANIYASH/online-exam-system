
var student = require('../models/student')
var mongoose = require('mongoose');
var responseSchema = new mongoose.Schema({
  username:String,
  examCode:String,
  responses:[{
    question:String,
    response:String
  }]
})
const response = mongoose.model('response',responseSchema)
var examSchema = new mongoose.Schema({
  examName:String,
  examCode:String,
  durationHours: Number,
	durationMinutes: Number,
  questionList:[{  question:String,
    optionA:String,
    optionB:String,
    optionC:String,
    optionD:String,
    key:String,
    marks:Number,
}]

});
const exam = mongoose.model('exam',examSchema)

module.exports = {exam,response}

/*
{
// MAKE VALIDATION FUNCTIONS HERE
// Create new student in the database
create: function(exam, cb) {
  exam_collection.insert(exam, cb);
},

getByExamCode: function(exam_code, cb) {
  exam_collection.findOne({exam_code: exam_code}, cb);
},

getResponseByExamCode: function(exam_code, username, cb) {
  response_collection.findOne({exam_code: exam_code, username: username}, cb);
},

addQuestion: function(exam_code, question_full, cb) {
exam_collection.update(
   { exam_code: exam_code },
   { $push: { question_list: { $each: [ 
     {question: question_full.question,
     optionA: question_full.optionA,
     optionB: question_full.optionB,
     optionC: question_full.optionC,
     optionD: question_full.optionD,
     key: question_full.key
    } ] } } }, cb);
},

// Submit Responses
addResponses: function(username, exam_code, response, cb) {

  var temp_response = 
  {
      username: username,
      exam_code: exam_code,
      response: response
  };
  response_collection.insert(temp_response, cb);
},

checkResponse: function(username, exam_code, cb) {
  response_collection.findOne({username:username, exam_code: exam_code}, cb);
}

};*/