// get durations for work, short and long break from the input fields
// this function is executed, when the user presses the save button
function getInputDurations() {
  const userDurations = [
    document.getElementById("work-input"),
    document.getElementById("short-input"),
    document.getElementById("long-input"),
  ];
  const inputLabels = [
    document.getElementById("work-label"),
    document.getElementById("short-label"),
    document.getElementById("long-label"),
  ];

  userDurations.forEach((input, index) => {
    console.log(input);
    if (!/^\d+$/.test(input) || Number(input) < 1 || Number(input) > 59) {
      inputLabels[index].innerText = "Invalid entry.";
    }
  });
}

// wait for DOM loading and then save values from inputs on save button press
document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content");

  contentContainer.addEventListener("click", (event) => {
    if (event.target && event.target.id === "save-button") {
      getInputDurations();
      console.log("Save button pressed!");
    }
  });
});
