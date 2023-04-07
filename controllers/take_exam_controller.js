var express = require('express')
  , router = express.Router()
  , {exam,response} = require('../models/exam')
  , student = require('../models/student')

router.get('/', isLoggedInAsStudent, function(req, res) {

    res.render('exams/take_exam_code_entry', {title: "Enter Exam Code", username: req.user.username});

});

router.post('/exam', isLoggedInAsStudent,async function(req, res) {
	var examCode = req.body.exam_code;
	var username = req.body.username;

    const examData = await exam.findOne({examCode})
   
        if(examData)
        {

            const studentData =await student.findOne({username})
                if(studentData)
                {
                    const responseData =await response.findOne({username,examCode})
                    if(responseData==null){
                            res.render('exams/take_exam', { title: 'Take Exam', exam_code: examCode, username: username,exam:examData}); 
                    }
                    else{
                        res.redirect('/take_exam');
                    }
            }
            
        }
        else
            res.redirect('/take_exam');
    })

router.get('/list/:examCode', isLoggedInAsStudent,async function(req, res) {
    const examCode = req.params.examCode
    console.log(examCode);
   const examData = await exam.findOne({examCode})
        res.send(JSON.stringify(examData));
    });


router.post('/submit', isLoggedInAsStudent,async function(req, res) {
    
    var username=req.body.username;
    var examCode=req.body.exam_code;
    let responses =[]
    var object=req.body
    console.log(object)
    for(i in object){
        if(i.length<=1){
        responses.push({
            question:i,
            response:object[i]
        })}
    }
    const newResponse = new response({username,examCode,responses})
    await newResponse.save()
    res.redirect('/take_exam/performance')
});

router.get('/performance', isLoggedInAsStudent, function(req, res) {

    res.render('exams/view_performance_code_entry', {title: "Enter Exam Code", username: req.user.username});

});

router.post('/performance_view', isLoggedInAsStudent,async function(req, res) {

    var username=req.body.username;
    var examCode=req.body.exam_code;
    const responseData = await response.findOne({username,examCode})
    if(responseData){
        const examData =await exam.findOne({examCode})

           var exam_obj = examData.questionList;
           console.log(exam_obj);
                    var response_obj = responseData.responses;
                    var total_questions = 0;
                    var attempted = 0;
                    var correct = 0;
                    var marks = 0;
                    for(var temp in exam_obj) {

                        if(response_obj[total_questions] != ' ')
                            attempted++;
                        if(exam_obj[total_questions].key == response_obj[total_questions].response){
                            correct++;
                            marks = marks + exam_obj[total_questions].marks
                        }
                        total_questions++;
                    }

                    res.render('exams/performance',{title: 'Result', total_questions: total_questions, attempted: attempted, correct: correct,marks:marks});
                
            }
    else
    {
        res.render('exams/view_performance_code_entry', {title: "Enter Exam Code", username: req.user.username});
    }                       
    })

module.exports = router;


function isLoggedInAsStudent(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.session.usertype=='student')
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}