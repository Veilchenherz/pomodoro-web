// input handling for the settings page

let isValid = true;

// get durations for work, short and long break from the input fields
// this function is executed, when the user presses the save button
function getInputDurations() {
  const userDurations = [
    document.getElementById("work-input").value,
    document.getElementById("short-input").value,
    document.getElementById("long-input").value,
  ];

  const inputLabels = document.getElementsByTagName("label");

  const standardLabels = [
    "Duration Working",
    "Duration Short Break",
    "Duration Long Break",
  ];

  for (let index = 0; index < userDurations.length; index++) {
    const element = userDurations[index];
    //console.log(element);
    if (
      !/^\d+$/.test(element) ||
      Number(element) < 1 ||
      Number(element) > 120
    ) {
      isValid = false;
      inputLabels[index].innerText = "Invalid input";
      setInterval(
        () => (inputLabels[index].innerText = standardLabels[index]),
        5000
      );
    }
  }

  if (isValid) {
    workingDuration = userDurations[0];
    shortBreakDuration = userDurations[1];
    longBreakDuration = userDurations[2];
  }
}

// wait for DOM loading and then save values from inputs on save button press
document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content");

  contentContainer.addEventListener("click", (event) => {
    if (event.target && event.target.id === "save-button") {
      getInputDurations();
      if (isValid) {
        togglePages();
      }
    }
  });
});
