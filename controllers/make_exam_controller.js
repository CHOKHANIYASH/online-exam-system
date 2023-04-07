const express = require('express')
  , router = express.Router()
  , {exam,response} = require('../models/exam')
  , course = require('../models/student')

router.get('/new', isLoggedInAsAdmin, function(req, res) {
	var default_exam = {
	  exam_name: "Exam Name",
	  exam_code: "Exam Code",
	  duration_hours:1,
	  duration_minutes:0,
	  course_code: "Course Code",
	  faculty_username:"Faculty User Name"
	};
	res.render('exams/new', { title: 'Make New Exam', exam: default_exam});
});

router.get('/view',(req,res)=>{
	res.render('exams/view_exam_code_entry')
})

router.post('/create', isLoggedInAsAdmin,async function(req, res) {
	var examData = {
	  examName: req.body.exam_name,
	  examCode: req.body.exam_code,
	  durationHours: req.body.duration_hours,
	  durationMinutes: req.body.duration_minutes,
	};
	var examCode =  req.body.exam_code;
	const doc =await exam.findOne({examCode})
	console.log(doc)
		if(doc)
			{res.redirect('/make_exam/new');}
		else
		{	
			const newExam = new exam(examData)
			await newExam.save()	
			res.render('exams/question_list', {exam:examData})
		}
	})

router.post('/question_list', isLoggedInAsAdmin,async function(req, res) {
	console.log(req.body.exam_code);
	const examData =await exam.findOne({examCode:req.body.exam_code})
	console.log(examData);
        res.render('exams/question_list', {exam: examData});
});

router.get('/add_question', isLoggedInAsAdmin, function(req,res) {
	var exam_code = req.body.exam_code;
	var default_question_full = {
	  question: "Question",
	  optionA: "option A",
	  optionB: "option B",
	  optionC: "option C",
	  optionD: "option D",
	  key: "Key",
	};
	res.render('exams/new_question', { title: 'Add New Question', question_full: default_question_full, 
	exam_code: exam_code});
});

router.post('/add_question', isLoggedInAsAdmin, function(req,res) {
	var exam_code = req.body.exam_code;
	var default_question_full = {
	  question: "Question",
	  optionA: "option A",
	  optionB: "option B",
	  optionC: "option C",
	  optionD: "option D",
	  key: "Key",
	  marks:"Marks"
	};
	res.render('exams/new_question', { title: 'Add New Question', question_full: default_question_full, 
	exam_code: exam_code});
});




router.post('/create_question', isLoggedInAsAdmin,async function(req, res) {
   
    var question_full = {
	  question: req.body.question,
	  optionA: req.body.optionA,
	  optionB: req.body.optionB,
	  optionC: req.body.optionC,
	  optionD: req.body.optionD,
	  key: req.body.key,
	  marks: req.body.marks,
	};
    
    var examCode = req.body.exam_code;
	const examData = await exam.findOneAndUpdate({examCode},{ $push: { questionList: { $each: [ 
		{question: question_full.question,
		optionA: question_full.optionA,
		optionB: question_full.optionB,
		optionC: question_full.optionC,
		optionD: question_full.optionD,
		key: question_full.key,
		marks: question_full.marks,
	   } ] } } },{
			new: true
	  })
        	res.render('exams/question_list', {exam:examData});

});


router.get('/submit', isLoggedInAsAdmin, function(req, res) {
   res.send("exam successfully created"); 
});

// router.get('/list', isLoggedInAsAdmin,async function(req, res) {
//     const examData = await exam.findOne({examCode:req.query.exam_code})
//     // Exam.getByExamCode(req.query.exam_code, function(err,docs){
//     //     if(err)
//     //     res.send("some error occured");
//     //     else
//         res.json(examData);
// });



module.exports = router;

function isLoggedInAsAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.session.usertype=='admin')
        {return next();}

    // if they aren't redirect them to the home page
    res.redirect('/');
}
