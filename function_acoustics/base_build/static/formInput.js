window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sliderForm');
  const sliders = document.querySelectorAll('.valueSlider');

  const savedScroll = sessionStorage.getItem('scrollPosition');
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll));
    sessionStorage.removeItem('scrollPosition');
  }

  sliders.forEach(slider => {
    const container = slider.closest('.slider-container');
    const box = container.querySelector('.sliderBox');

    slider.addEventListener('input', () => {
      box.value = slider.value;
    });

    slider.addEventListener('change', () => {
      box.value = slider.value;
      sessionStorage.setItem('scrollPosition', window.scrollY);
      form.submit();
    });

    box.addEventListener('input', () => {
      const val = parseFloat(box.value);
      if (!isNaN(val)) slider.value = val;
    });

    box.addEventListener('blur', () => {
      if (box.value === '' || isNaN(parseFloat(box.value))) {
        box.value = slider.min;
      }
      slider.value = box.value;
      sessionStorage.setItem('scrollPosition', window.scrollY);
      form.submit();
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        box.blur(); 
      }
    });
  });

  window.history.replaceState({}, document.title, window.location.pathname);
});
