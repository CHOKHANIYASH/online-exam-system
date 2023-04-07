// var questionData = [];

// // DOM Ready =============================================================
// $(document).ready(function() {

//     // Display Questions
//     fillQuestions();    

// });

// // Functions =============================================================

// // Fill Question List
// async function fillQuestions() {
//     // const axios = require('axios/dist/browser/axios.cjs'); // browser
//     // Empty content string
//     var questionContent = '';
//     // const data= await axios.get('/make_exam/list', {exam_code:examCode})
//     // const questions = data.data
//     // console.log(questions)
//     // questions.map((question,i)=>{
//     //     questionContent += 'Question '+i+' :';
//     //     questionContent += question.question + '<br>';
//     //     questionContent += ' A.' + question.optionA + ' B.' + question.optionB + ' C.' + question.optionC + ' D.' + question.optionD + ' Key' + question.key + '<br>';
    
//     // })

//     // // jQuery AJAX call for JSON
//     // $.getJSON( '/make_exam/list', {exam_code: exam_code}, function( data ) {

//     //     // Question Content
//     //     questionData = data.question_list;

//     //     $i=1;
//     //     // For each item in our JSON, add a question line
//     //     $.each(data.question_list, function(){
//     //         //questionContent += this.question;
//     //         questionContent += 'Question'+$i+' :';
//     //         questionContent += this.question + '<br>';
//     //         questionContent += ' A.' + this.optionA + ' B.' + this.optionB + ' C.' + this.optionC + ' D.' + this.optionD + ' Key' + this.key + '<br>';

//     //         $i++;
//     //     });

//     //     // Inject the whole content string into our existing HTML table
//         document.getElementById("temp").innerHTML = questionContent ;
//     // });
// };
