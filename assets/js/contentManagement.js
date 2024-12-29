
// html templating

//let currrentPage = "pomodoro";

// loads the page content (pomodoro card or settings)
async function loadPage(page) {

    let source = page + ".html";
    let response = await fetch("../../" + source);
    let content = await response.text();
    document.getElementById("content").innerHTML = content;
    currrentPage = page;

}


// toggles between the main pomodoro timer page and the settings page
function togglePages() {
    
    if (currrentPage === "pomodoro") {
        loadPage("settings");
        currrentPage = "settings";
    }
    else {
        loadPage("pomodoro");
        currrentPage = "pomodoro";
    }

}

// waits for loading of the DOM
// the loads the pomodoro card and assignes the toggle function to the settings
// button in the navbar
document.addEventListener("DOMContentLoaded", () => {
    loadPage("pomodoro");
    document.getElementById("settings").addEventListener("click", () => togglePages());
});