// pomodoro timer functionality

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
function displayAction(actionText) {
  document.getElementById("heading").innerText = actionText;
}

// takes time in seconds as input and counts down from the given time to zero
// returns false as soon as the timer reaches zero
async function pomodoroTimer(duration) {
  return new Promise((resolve) => {
    timerID = setInterval(function timeStep() {
      let secondsLeft = duration % 60;
      let minutesLeft = Math.floor(duration / 60);
      let timerGreaterFive = false;

      if (duration > 300) {
        timerGreaterFive = true;
      }

      displayTimer(minutesLeft, secondsLeft);
      duration--;

      if (timerGreaterFive) {
        if (duration === 300) {
          timerGreaterFive = false;
          console.log("Five minues left!");
          openAlertBox("Five minutes left!", "");
        }
      }

      if (duration < 0) {
        clearInterval(timerID);
        resolve(false);
      }
    }, 1000);
  });
}

// resets the timer and the repetitions to zero
function resetTimer() {
  displayAction("Pomodoro");

  if (timerID !== null) {
    clearInterval(timerID);
    displayTimer(0, 0);

    timerRunning = false;
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
      case repetitions % 8: {
        displayAction("Long Break");
        while (returnValue) {
          returnValue = await pomodoroTimer(longDurationSeconds);
        }
        openAlertBox("Time is up, start", "working!");
        break;
      }

      case repetitions % 2: {
        displayAction("Short Break");
        while (returnValue) {
          returnValue = await pomodoroTimer(shortDurationSeconds);
        }
        openAlertBox("Time is up, start", "working!");
        break;
      }

      default: {
        let numberOfWorkUnits = Math.round(repetitions / 2);
        displayAction("Work #" + numberOfWorkUnits);
        while (returnValue) {
          returnValue = await pomodoroTimer(workDurationSeconds);
        }
        openAlertBox("Time is up, stop", "working!");
      }
    }
  }
}

//opens an alert box on the top of the page to let the user know that there are 5 min left or that the time is up
async function openAlertBox(firstHalfText, actionText) {
  let response = await fetch("./alertbox.html");
  let content = await response.text();

  const alertBox = document.getElementById("alertbox");
  alertBox.innerHTML = content;
  alertBox.classList.add("alertbox", "active");

  document.getElementsByClassName("alert-first-half")[0].innerText =
    firstHalfText;
  document.getElementsByClassName("alert-action")[0].innerText = actionText;

  function removeAlertBox() {
    alertBox.innerHTML = "";
    alertBox.classList.remove("alertbox", "active");
  }

  setTimeout(removeAlertBox, 5000);
}

// waits for loading the DOM
// then assignes the start button to call the pomodoroFlow function
// and the reset button to call the resetTimer function
document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content");

  contentContainer.addEventListener("click", (event) => {
    if (event.target && event.target.id === "start") {
      pomodoroFlow(
        workingDuration,
        shortBreakDuration,
        longBreakDuration,
        repetitions
      );
    } else if (event.target && event.target.id === "reset") {
      resetTimer();
    }
  });
});
