window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sliderForm');
  const sliders = document.querySelectorAll('.valueSlider');

  // Restore scroll position
  const savedScroll = sessionStorage.getItem('scrollPosition');
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll));
    sessionStorage.removeItem('scrollPosition');
  }

  sliders.forEach(slider => {
    // Find the sliderBox inside the same slider-container
    const container = slider.closest('.slider-container');
    const box = container.querySelector('.sliderBox');

    // Live update number while sliding
    slider.addEventListener('input', () => {
      box.value = slider.value;
    });

    // Submit when slider released
    slider.addEventListener('change', () => {
      box.value = slider.value;
      sessionStorage.setItem('scrollPosition', window.scrollY);
      form.submit();
    });

    // Update slider while typing
    box.addEventListener('input', () => {
      const val = parseFloat(box.value);
      if (!isNaN(val)) slider.value = val;
    });

    // Submit on blur or pressing Enter
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
        box.blur(); // triggers blur event and submits
      }
    });
  });

  // Clean URL after submission
  window.history.replaceState({}, document.title, window.location.pathname);
});
