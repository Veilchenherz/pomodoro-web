let workingDuration = 25;
let shortBreakDuration = 5;
let longBreakDuration = 20;

var timer = 0;


// takes minutes and seconds as input and displays those on the screen 
// with correct formatting (0 added infront, if number of digits below 2)
function displayTimer(minutes, seconds) {

    let secondsDigits = Math.floor(Math.log10(seconds)) + 1;
    let minutesDigits = Math.floor(Math.log10(minutes)) + 1;

    if (secondsDigits < 2) {
        seconds = "0" + seconds;
    }

    if (minutesDigits < 2) {
        minutes = "0" + minutes;
    }

    let time = minutes + ":" + seconds;

    document.getElementById("timer").innerText = time;
}


// takes the number of repetitions as an input
// displays the current action the user is supposed to do 
// (work, short break, long break)
function displayAction (repetitions) {

    if (repetitions === 0) {
        document.getElementById("heading").innerText = "Pomodoro";
    }
    else {
        switch (0) {

            case (repetitions % 8): {
                document.getElementById("heading").innerText = "Long Break";
                break;
            }
    
            case (repetitions % 2): {
                document.getElementById("heading").innerText = "Short Break";
                break;
            }
    
            default: {
                document.getElementById("heading").innerText = "Work";
            }
    
        }
    }
}


//takes time in seconds as input and counts down from the given time till zero
function pomodoroTimer (duration) {

    timer = setInterval(function timeStep() {
        let secondsLeft = duration % 60;
        let minutesLeft = Math.floor(duration / 60);

        displayTimer(minutesLeft, secondsLeft);
        
        console.log(minutesLeft + ":" + secondsLeft);
        duration--;

        if (duration < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function resetTimer (timerToReset) {
    if (timerToReset !== 0) {
        clearInterval(timer);
    }
}


//document.getElementById("start").addEventListener("click", pomodoroTimer.bind(null, 180))
//document.getElementById("reset").addEventListener("click", clearInterval.bind(timer))


