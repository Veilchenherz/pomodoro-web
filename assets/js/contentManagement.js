// html templating

let currrentPage;

// loads the page content (pomodoro card or settings)
async function loadPage(page) {
  const baseURL = `${window.location.origin}${window.location.pathname}`;
  const source = `${baseURL}${page}.html`;
  
  let response = await fetch(source);
  let content = await response.text();
  document.getElementById("content").innerHTML = content;

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
  }

  currrentPage = page;
}

// toggles between the main pomodoro timer page and the settings page
function togglePages() {
  if (currrentPage === "pomodoro") {
    loadPage("settings");
    currrentPage = "settings";
    document.getElementById("settings").innerHTML =
      "<img class='icon' src='assets/images/arrow_back_20dp.png' alt='settings icon'>";
  } else {
    loadPage("pomodoro");
    currrentPage = "pomodoro";
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
