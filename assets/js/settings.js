// input handling for the settings page

let isValid;

// shows error messages about invalid inputs to the user
// instead of the input labels on top of the input fields
// for 5 seconds, then switches the text back to the original label
function showErrorMessage(messages, indices) {
  const inputLabels = document.getElementsByTagName("label");

  const standardLabels = [
    "Duration Working",
    "Duration Short Break",
    "Duration Long Break",
  ];

  if (indices.length !== 0) {
    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      const message = messages[i];

      inputLabels[index].innerText = message;
      inputLabels[index].style.color = "yellow";
      setInterval(() => {
        inputLabels[index].innerText = standardLabels[index];
        inputLabels[index].style.color = "white";
      }, 5000);
    }
  }
}

// get durations for work, short and long break from the input fields
// this function is executed, when the user presses the save button
function getInputDurations() {
  const alertCheckbox = document.getElementById("alert-input").checked;

  if (alertCheckbox) {
    alertSoundOn = true;
    console.log("Sound activated");
  }

  isValid = true;

  const userDurations = [
    document.getElementById("work-input").value,
    document.getElementById("short-input").value,
    document.getElementById("long-input").value,
  ];

  let errorIndices = [];
  let errorMessages = [];

  for (let index = 0; index < userDurations.length; index++) {
    const element = userDurations[index];

    if (Number(element) < 1) {
      isValid = false;
      errorIndices.push(index);
      errorMessages.push("Minimum is 1 min");
    } else if (!/^\d+$/.test(element)) {
      isValid = false;
      errorIndices.push(index);
      errorMessages.push("Only digits allowed");
    } else if (Number(element) > 120) {
      isValid = false;
      errorIndices.push(index);
      errorMessages.push("Maximum is 120 min");
    }
  }

  showErrorMessage(errorMessages, errorIndices);

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
        openAlertBox("Settings saved!", "", false);
      }
    }
  });
});
