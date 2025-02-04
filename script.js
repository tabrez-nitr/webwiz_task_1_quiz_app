//quiz data 

const quizData = [
    {//Q1 
        question : "Who holds the record for the most Formula 1 World Championships?",
        options : ["Max Verstappen","Lewis Hamilton","Arton Senna","Sebastian Vettel"],
        correctOptionIndex : 1,
        time : 30,
        attempted :false,
        visited : false,
        selectedOption : null
    },
    {//Q2

        question : "Which team has won the most Constructors' Championships in Formula 1 history?",
        options :["Ferrari", "Mercedes", "McLaren", "Red Bull"],
        correctOptionIndex : 0,
        time : 30,
        attempted :false,
        visited : false,
        selectedOption : 5
    },
    { //Q3
        question : "Which circuit is known as the Temple of Speed in Formula 1?",
        options : ["Monaco", "Monza", "Silverstone", "Suzuka"],
        correctOptionIndex : 1 ,
        time : 30,
        attempted :false,
        visited : false,
        selectedOption : null
    },
    { //Q4
        question : "Who is the youngest driver to win a Formula 1 World Championship?",
        options :  ["Lewis Hamilton", "Fernando Alonso", "Max Verstappen", "Sebastian Vettel"],
        correctOptionIndex : 3,
        time : 30,
        attempted :false,
        visited : false,
        selectedOption : null

    },
    {
        //Q5
        question : "Which country hosted the first-ever Formula 1 World Championship race in 1950?",
        options :  ["France", "Italy", "United Kingdom", "Monaco"],
        correctOptionIndex : 2,
        time : 30,
        attempted :false,
        visited : false,
        selectedOption : null
    }

] 

//timeOut - in one place +timer
//dispalying things in one part
//navigation part in one 
//one function does one task only 
//<------cretaing Variables----->
let count = 0;
let totalScore = 0;
//<----Target Elements---------->
let question = $(".question");
let option1 = $('.btn-a');
let option2 = $('.btn-b');
let option3 = $('.btn-c');
let option4 = $('.btn-d');


//<-----Dispalying Functions------>
function displayQuestionAnsOption(){
    
    question.html(quizData[count].question);
    option1.html (quizData[count].options[0]);
    option2.html (quizData[count].options[1]);
    option3.html (quizData[count].options[2]);
    option4.html (quizData[count].options[3]);
}
function resetButtons() {
    $(".button").css({
        "border-color": "",
        "border-width": "",
        "background-color": ""
    });
}

function markCorrectAnswer(temp){
    
    temp.style.cssText = "border-color: green; border-width: 2px; background-color: #B0FABC;";
    }

function markWrongAnswer(temp){
    temp.style.cssText = "border-color: red; border-width: 2px; background-color: #ffcfcf;";
}


// points uodate function 
function pointsUpdate()
{

}
//......Play Sounds ......
function playCorrectSound(){
    let audio = new Audio("./media/correctAudio2.wav");
    audio.play();
}
function playWrongSound(){
    let audio = new Audio("./media/wrongSound.wav");
    audio.play();
   
}

//<---logical fuctions----->
let shortTime;
function enableButtons(){
    $(".button").click(function(event){
        

        checkForCorrectAnswer(event.target);
        //after selecting disable other options 
        disableButtons();
        //after selecting question stop the timer ;
        storePreviousTime();

        //make attempted true 
        quizData[count].attempted = true;
        // Move to the next question after a short delay
        // let shortTime= setTimeout(moveToNext, 1000); 

    })
 }
 function disableButtons(){
    console.log("buttons Disabled");
    $(".button").off('click');
 }
 //.......Checking For Correct Solution........
 function checkForCorrectAnswer(temp){ //temp is targeted element
    let selectedOption = Number(temp.dataset.value);
    //marking which option did user slected  
    quizData[count].selectedOption = selectedOption;

    if(selectedOption === quizData[count].correctOptionIndex){
        playCorrectSound();
        totalScore+=4;
        
        markCorrectAnswer(temp);
    }
    else{
        playWrongSound();
        totalScore-=1;
        
        markWrongAnswer(temp);
        markCorrectAnswer($(".button").eq(quizData[count].correctOptionIndex)[0]);
    }
    pointsUpdate();
    automate();

 }



//<-----Time Related Fuctions------>
let tempTime;
let timeInterval;
let timeLeft = document.getElementById("time-left");


function timer() {
    if (timeInterval) clearInterval(timeInterval);
     tempTime = quizData[count].time;
     console.log("Intialized New time: "+ tempTime);
    timeInterval = setInterval(() => {
        if (tempTime > 0) {
            tempTime--;
            //  updateTimer();
            timeLeft.textContent = tempTime;
        } else {
            storePreviousTime();
            console.log("Q1 time :"+quizData[0].time);
            console.log("Q2 time :"+quizData[1].time);
            console.log("Q3 time :"+quizData[2].time);
            console.log("Q4 time :"+quizData[3].time);
            console.log("Q5 time :"+quizData[4].time);
            
            console.log("1. Time Run Out");
            clearInterval(timeInterval);
            console.log("Clear Interval");
            disableButtons();
            console.log("marking correct ans for this question");
            markCorrectAnswer($(".button").eq(quizData[count].correctOptionIndex)[0]);
            // moveToNext();
            // count++;
            if(!quizData[count].attempted)
            {
            automate();
            }
            quizData[count].attempted = true;
        }
    }, 1000);
}
function updateTimer()
{
    timeLeft.textContent = tempTime;
    tempTime = quizData[count].time;
    timeLeft.textContent = tempTime;
}

//<-----Navigation Functions------->
function storePreviousTime(){
    clearInterval(timeInterval);
    quizData[count].time = tempTime;
    console.log("store PreviousTime : " +quizData[count].time);
}

let navigationButton = $(".nav-btn");
navigationButton.click(function(){
    storePreviousTime();
    count++;
    let temp = $(this).text() - 1;
    count = temp;
    updateTimer();
    // clearing all the previous timers
    clearInterval(timeInterval);
    // clearTimeout(timeout);
    
    // clearTimeout(timeout);
    displayQuestionAnsOption();
    resetButtons();
    if(quizData[count].attempted === true)
    {
        
        disableButtons();
        if(quizData[count].selectedOption === quizData[count].correctOptionIndex)
        {
            // if correct option is marked
            markCorrectAnswer($(".button").eq(quizData[count].correctOptionIndex)[0]);
        }
        else{
            markCorrectAnswer($(".button").eq(quizData[count].correctOptionIndex)[0]);
            markWrongAnswer($(".button").eq(quizData[count].selectedOption)[0]);
        }
    }
    else{
        
        timer();
        enableButtons();
    }
    
});
// continue from here
function copyOfNavigation(){
    console.log("copy of navigation called");
    storePreviousTime();
    resetButtons();
    count++;
    updateTimer();
    clearInterval(timeInterval);
    clearInterval(automateControl);
    displayQuestionAnsOption();
    timer();
    enableButtons();
    clearInterval(automateControl);

}

let automateControl;
let automateTime;
function automate()
{   
    console.log("called automate time ");
    automateTime = 2;
    if(automateControl)
        clearInterval(automateControl);

    automateControl = setInterval(()=>
    {
        console.log("Automate Runing");
        if(automateTime > 0)
            {
                automateTime--;
            }
            else{
              
                if (count < quizData.length - 1) {
                    console.log(count);
                    copyOfNavigation();
                } else {
                    console.log(count);
                    clearInterval(automateControl);
                }
    
            }
    },1000);
    
}

// Initialize Quiz
displayQuestionAnsOption();
timer();
enableButtons();

