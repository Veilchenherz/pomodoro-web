let workingDuration = 25;
let shortBreakDuration = 5;
let longBreakDuration = 20;
let timerText = workingDuration + ":00"

document.getElementById("work-input").setAttribute("value", workingDuration);
document.getElementById("short-input").setAttribute("value", shortBreakDuration);
document.getElementById("long-input").setAttribute("value", longBreakDuration);
document.getElementById("timer").innerText = timerText;