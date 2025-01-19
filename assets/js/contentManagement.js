// html templating

// currently opened page on the website (either the timer or the settings)
let currrentPage;

// loads the page content (pomodoro card or settings)
async function loadPage(page) {
  const baseURL = `${window.location.origin}${window.location.pathname}`;
  const source = `${baseURL}${page}.html`;
  
  let response = await fetch(source);
  let content = await response.text();
  document.getElementById("content").innerHTML = content;

  // load the durations for the different units and display them on the settings page
  if (page === "settings") {
    document
      .getElementById("work-input")
      .setAttribute("value", workingDuration);
    document
      .getElementById("short-input")
      .setAttribute("value", shortBreakDuration);
    document
      .getElementById("long-input")
      .setAttribute("value", longBreakDuration);

    // load the setting for the alert sound  
    if (alertSoundOn) {
      document.getElementById("alert-input").checked = true;
    }
  }

  // after a page is loaded, it becomes the currently loaded page
  currrentPage = page;
}

// toggles between the main pomodoro timer page and the settings page
function togglePages() {

  // change page to settings
  if (currrentPage === "pomodoro") {
    loadPage("settings");

    // change settings icon to back arrow icon
    document.getElementById("settings").innerHTML =
      "<img class='icon' src='assets/images/arrow_back_20dp.png' alt='settings icon'>";
  } 
  
  // change page to timer
  else {
    loadPage("pomodoro");

    // change arrow icon to settings gear icon
    document.getElementById("settings").innerHTML =
      "<img class='icon' src='assets/images/settings_20dp.png' alt='settings icon'>";
  }
}

// waits for loading of the DOM
// the loads the pomodoro card and assignes the toggle function to the settings
// button in the navbar
document.addEventListener("DOMContentLoaded", () => {
  loadPage("pomodoro");
  document
    .getElementById("settings")
    .addEventListener("click", () => togglePages());
});
