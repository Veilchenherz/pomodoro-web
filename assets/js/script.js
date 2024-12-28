let workingDuration = 25;
let shortBreakDuration = 5;
let longBreakDuration = 20;
let repetitions = 0;

let timerID = null;
let timerRunning = false;


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


// displays a string on the heading field of the pomodoro-card
// takes the string to display as an input
function displayAction (actionText) {

    document.getElementById("heading").innerText = actionText;

}


// takes time in seconds as input and counts down from the given time to zero
// returns false as soon as the timer reaches zero
async function pomodoroTimer (duration) {

    return new Promise((resolve) => {
        timerID = setInterval(function timeStep() {
            let secondsLeft = duration % 60;
            let minutesLeft = Math.floor(duration / 60);

            displayTimer(minutesLeft, secondsLeft);
            
            console.log(minutesLeft + ":" + secondsLeft);
            duration--;

            if (duration < 0) {
                clearInterval(timerID);
                resolve(false);
            }
        }, 1000);
    });
}


// resets the timer and the repetitions to zero
function resetTimer () {
    displayAction("Pomodoro");
    if (timerID !== null) {
        clearInterval(timerID);
        timerRunning = false;
        displayTimer(0, 0);
        repetitions = 0;
    }
}


// controls the flow of the different stages while running the pomodoro app
// starts the correct timers according to the number of repetitions
async function pomodoroFlow(workDur, shortDur, longDur, repetitions) {

    let workDurationSeconds = workDur * 60;
    let shortDurationSeconds = shortDur * 60;
    let longDurationSeconds = longDur * 60;

    timerRunning = true;

    while (timerRunning) {

        repetitions++;

        let returnValue = true;

        switch (0) {

            case (repetitions % 8): {
                displayAction("Long Break");
                while (returnValue) {
                    returnValue = await pomodoroTimer(longDurationSeconds);
                }
                break;
            }

            case (repetitions % 2): {
                displayAction("Short Break");
                while (returnValue) {
                    returnValue = await pomodoroTimer(shortDurationSeconds);
                }
                break;
            }

            default: {
                displayAction("Work");
                while (returnValue) {
                    returnValue = await pomodoroTimer(workDurationSeconds);
                }
                
            }
        } 
    }
}


// waits for loading of the DOM
// then assignes the start button to call the pomodoroFlow function
// and the reset button to call the resetTimer function
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start").addEventListener("click", 
        () => pomodoroFlow(
            workingDuration, 
            shortBreakDuration, 
            longBreakDuration, 
            repetitions
        ));
    document.getElementById("reset").addEventListener("click", () => resetTimer());
});

