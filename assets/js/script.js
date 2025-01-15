// pomodoro timer functionality

// duration of work units, short breaks and long breaks in minutes
let workingDuration = 25;
let shortBreakDuration = 5;
let longBreakDuration = 20;

// counter for the number of units of any kind (work, short break or long break)
let repetitions = 0;

// setInterval return value that allows the control of the countdown within multiple functions
let timerID = null;

// boolean to avoid starting a countdown timer while another one is running
let timerRunning = false;

// boolean which hold the information wether the user
// wants an alert sound or not when the alert box appeares
let alertSoundOn = false;

// takes minutes and seconds as input and displays those on the screen
// with correct formatting (0 added in front, if number of digits below 2)
function displayTimer(minutes, seconds) {

  // calculate the number of digits for the durations
  let secondsDigits = Math.floor(Math.log10(seconds)) + 1;
  let minutesDigits = Math.floor(Math.log10(minutes)) + 1;

  // when the number of digits is below 2, add a "0" infront 
  // to make the timer look good
  if (secondsDigits < 2) {
    seconds = "0" + seconds;
  }

  if (minutesDigits < 2) {
    minutes = "0" + minutes;
  }

  // construct the time that is shown the user
  let time = minutes + ":" + seconds;

  // show time on the website
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

    // countdown timer
    timerID = setInterval(function timeStep() {

      // calculate minutes and seconds from the input in seconds
      let secondsLeft = duration % 60;
      let minutesLeft = Math.floor(duration / 60);
      let timerGreaterFive = false;

      // if the timer started with a time over 5 minutes, 
      // save "true" to show alert box when time is under 5 minutes
      if (duration > 300) {
        timerGreaterFive = true;
      }

      // show time on the website
      displayTimer(minutesLeft, secondsLeft);

      // reduce time by one second
      duration--;

      // if the timer started on a value greater than 5 minutes
      // show alertbox when the timer hits 5 minutes (= 300 seconds)
      if (timerGreaterFive) {
        if (duration === 300) {
          timerGreaterFive = false;
          console.log("Five minues left!");
          openAlertBox("Five minutes left!", "", alertSoundOn);
        }
      }

      // stop Interval at the end of the timer and let the Promise return false
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

  // calculate the duration of the different units in seconds
  let workDurationSeconds = workDur * 60;
  let shortDurationSeconds = shortDur * 60;
  let longDurationSeconds = longDur * 60;

  // set this to "true" to avoid the start of multiple timers at the same time
  timerRunning = true;

  while (timerRunning) {
    repetitions++;

    // later this is set to the Promise which is returned 
    // from the pomodoroTimer function 
    // by receiving "false" this function knows when the timer stops
    let returnValue = true;

    switch (0) {

      // every 8th unit must be a long break, because the long break 
      // takes place after the 4th working unit (4x working + 4x break == 8 units)
      case repetitions % 8: {
        displayAction("Long Break");

        // waiting for the end of the timer, which is noticed by the "returnValue" changing to "false"
        while (returnValue) {
          returnValue = await pomodoroTimer(longDurationSeconds);
        }

        //open the alert box after the timer finished
        openAlertBox("Time is up, start", "working!", alertSoundOn);
        break;
      }

      // every second unit is a break and since the first unit is a work unit, 
      // the repetition value for breaks is cleanly divisible by 2
      case repetitions % 2: {
        displayAction("Short Break");

        // waiting for the end of the timer, which is noticed by the "returnValue" changing to "false"
        while (returnValue) {
          returnValue = await pomodoroTimer(shortDurationSeconds);
        }

        //open the alert box after the timer finished
        openAlertBox("Time is up, start", "working!", alertSoundOn);
        break;
      }

      // work units are only type of unit left, if the conditions for long and short breaks are not met
      default: {
        let numberOfWorkUnits = Math.round(repetitions / 2);
        displayAction("Work #" + numberOfWorkUnits);

        // waiting for the end of the timer, which is noticed by the "returnValue" changing to "false"
        while (returnValue) {
          returnValue = await pomodoroTimer(workDurationSeconds);
        }

        //open the alert box after the timer finished
        openAlertBox("Time is up, stop", "working!", alertSoundOn);
      }
    }
  }
}

/* 
opens an alert box on the top of the page to let the user know
that there are 5 min left or that the time is up
input alertSoundStatus is a boolean to control wether an alert sound is played or not
when opening the alert box 
*/
async function openAlertBox(firstHalfText, actionText, alertSoundStatus) {

  // store alert box html and alert audio
  let response = await fetch("./alertbox.html");
  let content = await response.text();
  const alertAudio = new Audio("./assets/sounds/PomoAlert.mp3");

  // insert alert box html into container "alertBox"
  const alertBox = document.getElementById("alertbox");
  alertBox.innerHTML = content;

  // add alert box styling to the container
  alertBox.classList.add("alertbox", "active");

  // insert text into alert box html content
  // the text is from the input of this function
  document.getElementsByClassName("alert-first-half")[0].innerText =
    firstHalfText;
  document.getElementsByClassName("alert-action")[0].innerText = actionText;

  // play alert sound when "alertSoundStatus" is "true"
  if (alertSoundStatus) {
    alertAudio.play();
  }

  // function to remove the alert box after 5 seconds
  function removeAlertBox() {
    alertBox.innerHTML = "";
    alertBox.classList.remove("alertbox", "active");
  }

  // remove the alert box after 5 seconds
  setTimeout(removeAlertBox, 5000);
}

// waits for loading the DOM
// then assignes the start button to call the pomodoroFlow function
// and the reset button to call the resetTimer function
document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content");

  contentContainer.addEventListener("click", (event) => {
    if (event.target && event.target.id === "start" && !timerRunning) {
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
