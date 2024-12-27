let workingDuration = 25;
let shortBreakDuration = 5;
let longBreakDuration = 20;

let timerID = null;


// takes minutes and seconds as input and displays those on the screen 
// with correct formatting (0 added in front, if number of digits below 2)
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
// displays "Pomodoro", if repetitions is equal to zero (used while timer is not running)
function displayAction (repetitions) {

    switch (0) {

        case (repetitions): {
            document.getElementById("heading").innerText = "Pomodoro";
            break;
        }

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



//takes time in seconds as input and counts down from the given time to zero
function pomodoroTimer (duration) {

    timerID = setInterval(function timeStep() {
        let secondsLeft = duration % 60;
        let minutesLeft = Math.floor(duration / 60);

        displayTimer(minutesLeft, secondsLeft);
        
        console.log(minutesLeft + ":" + secondsLeft);
        duration--;

        if (duration < 0) {
            clearInterval(timerID);
        }
    }, 1000);
}

function resetTimer () {
    if (!timerID) {
        clearInterval(timerID);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start").addEventListener("click", () => pomodoroTimer(workingDuration * 60));
    document.getElementById("reset").addEventListener("click", () => resetTimer());
});

