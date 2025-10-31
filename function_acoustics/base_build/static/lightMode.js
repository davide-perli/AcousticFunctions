function light_dark_mode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
    // Save current mode to localStorage
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}


window.addEventListener('DOMContentLoaded', () => {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById('toggle').checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        document.getElementById('toggle').checked = false;
    }
});

