function light_dark_mode() {
    const element = document.body;
    const isDark = element.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    applyInputStyles(isDark);
    updatePlots(isDark);
}

function applyInputStyles(isDark) {
    document.querySelectorAll("input, input[type='number'], input[type='range']").forEach(input => {
        if (isDark) {
            input.style.backgroundColor = "#222";
            input.style.color = "white";
            input.style.borderColor = "#555";
        } else {
            input.style.backgroundColor = "";
            input.style.color = "";
            input.style.borderColor = "";
        }
        input.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
    });

    document.querySelectorAll(".dropdown .selected").forEach(div => {
        if (isDark) {
            div.style.backgroundColor = "#222";
            div.style.color = "white";
            div.style.borderColor = "#555";
        } else {
            div.style.backgroundColor = "";
            div.style.color = "";
            div.style.borderColor = "";
        }
    });

    document.querySelectorAll(".dropdown-content div").forEach(div => {
        if (isDark) {
            div.style.backgroundColor = "#333";
            div.style.color = "white";
        } else {
            div.style.backgroundColor = "";
            div.style.color = "";
        }
    });
}

function updatePlots(isDark) {
    const plotIds = ['staticPlot', 'animatedPlot'];
    const plotColors = {
        staticPlot: { light: 'blue', dark: 'white' },
        animatedPlot: { light: 'red', dark: 'green' }
    };

    plotIds.forEach(id => {
        const gd = document.getElementById(id);
        if (!gd) return;

        const layoutUpdate = {
            paper_bgcolor: isDark ? '#222' : '#fff',
            plot_bgcolor: isDark ? '#222' : '#fff',
            font: { color: isDark ? '#fff' : '#000' }
        };

        gd.data.forEach((trace, idx) => {
            const color = plotColors[id] ? (isDark ? plotColors[id].dark : plotColors[id].light) : 'blue';
            Plotly.restyle(gd, { 'line.color': color }, [idx]); 
        });

        Plotly.update(gd, {}, layoutUpdate);  // update layout separately
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.body.classList.add("dark-mode");
        document.getElementById('toggle').checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        document.getElementById('toggle').checked = false;
    }

    applyInputStyles(isDark);
    updatePlots(isDark);
});
