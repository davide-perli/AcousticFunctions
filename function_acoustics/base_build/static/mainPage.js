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

function updateSliderValue(slider) {
  slider.nextElementSibling.textContent = slider.value;
}

window.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.valueSlider');

  if (window.location.search) {
    sliders.forEach(slider => {
      slider.nextElementSibling.textContent = slider.value;

      slider.addEventListener('input', () => updateSliderValue(slider));
      slider.addEventListener('change', () => {
        document.getElementById('sliderForm').submit();
      });
    });

    window.history.replaceState({}, document.title, window.location.pathname);

  } else {
    sliders.forEach(slider => {
      slider.value = 0;
      slider.nextElementSibling.textContent = slider.value;

      slider.addEventListener('input', () => updateSliderValue(slider));
      slider.addEventListener('change', () => {
        document.getElementById('sliderForm').submit();
      });
    });
  }
});



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

