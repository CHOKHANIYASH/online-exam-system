// const axios = require('axios/dist/browser/axios.cjs'); // browser

var questionData = [];

// DOM Ready =============================================================
    var time = { hours: "10", minutes: "11"};
    var seconds = 0;

    // Populate the question table on intial load
    fillQuestions(time);    
    
    //Timer
    var timer = setInterval(function() { 
       
        document.getElementById("time").innerHTML = time.hours + " hrs " + time.minutes + " mins " + (seconds) + " secs" ;

        //Trigger submit on completion of time
        if(time.hours == 0 && time.minutes == 0 && seconds == 0 )
        {
            clearInterval(timer);
            document.getElementById("formResponse").submit();
        }

        seconds--;

        if(seconds == -1)
        {
            seconds = 59;
            time.minutes-=1;

            if(time.minutes == -1)
            {
                time.minutes = 59;
                time.hours-=1;
            }
        }
     }, 1000);

// Functions =============================================================

// Fill Question List
async function fillQuestions(time) {
    const code = exam_code;
    // Empty content string
    var tableContent = '';
    const data1= await fetch(`/take_exam/list/${code}`, {
        method:'get'
        })
    const data = await data1.json()
        //Exam time data
        time.hours = data.durationHours;
        time.minutes = data.durationMinutes;

};

