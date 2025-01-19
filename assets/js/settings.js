// input handling for the settings page

// boolean to describe wether data input from user is valid 
// the rules are: only digits, value between 1 and 120
let isValid;

// shows error messages about invalid inputs to the user
// instead of the input labels on top of the input fields
// for 5 seconds, then switches the text back to the original label
function showErrorMessage(messages, indices) {
  const inputLabels = document.getElementsByTagName("label");

  // labels that need to be shown after error message is gone again
  const standardLabels = [
    "Duration Working",
    "Duration Short Break",
    "Duration Long Break",
  ];

  // show error message, if array of errors is not empty
  if (indices.length !== 0) {
    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      const message = messages[i];

      // show eror message from messages array and change text color to yellow
      inputLabels[index].innerText = message;
      inputLabels[index].style.color = "yellow";

      // after 5 seconds switch text back to label text and change text color to white
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

  // save true if user selected to play alert sounds
  if (alertCheckbox) {
    alertSoundOn = true;
  }

  isValid = true;

  // durations entered by the user into the input fields
  const userDurations = [
    document.getElementById("work-input").value,
    document.getElementById("short-input").value,
    document.getElementById("long-input").value,
  ];

  // array with the indices of the input fields which have to show an error
  let errorIndices = [];

  // array with the error messages that need to be shown
  let errorMessages = [];

  // check every input field for valid user input
  for (let index = 0; index < userDurations.length; index++) {
    const element = userDurations[index];

    // show error if value below 1
    if (Number(element) < 1) {
      isValid = false;
      errorIndices.push(index);
      errorMessages.push("Minimum is 1 min");
    } 

    // show error if characters apart from digits are used
    else if (!/^\d+$/.test(element)) {
      isValid = false;
      errorIndices.push(index);
      errorMessages.push("Only digits allowed");
    } 
    
    // show error message if value is greater than 120
    else if (Number(element) > 120) {
      isValid = false;
      errorIndices.push(index);
      errorMessages.push("Maximum is 120 min");
    }
  }

  // show error message for every entry in the index and message array
  showErrorMessage(errorMessages, errorIndices);

  // saving the duration from the user if every input contains a valid value
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
