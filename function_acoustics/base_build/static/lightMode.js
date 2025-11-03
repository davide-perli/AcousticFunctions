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


document.documentElement.classList.add("dark-mode"); 

window.addEventListener('DOMContentLoaded', () => {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        // Force all inputs to dark immediately
        document.querySelectorAll("input, input[type='number'], input[type='range']").forEach(input => {
            input.style.backgroundColor = "#222";
            input.style.color = "white";
            input.style.borderColor = "#555";
            input.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        });

        document.getElementById('toggle').checked = true;
    }
});
