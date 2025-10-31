const dropdown = document.getElementById('dropdown');
const selected = dropdown.querySelector('.selected');
const hiddenInput = dropdown.querySelector('input[type="hidden"]');
const options = dropdown.querySelectorAll('.dropdown-content div');

window.addEventListener('DOMContentLoaded', () => {
  // If the server sent a value, show it; else show hint
  if (hiddenInput.value && hiddenInput.value.trim() !== '') {
    selected.textContent = hiddenInput.value;
  } else {
    selected.textContent = '1. Sin (click to see more)';
    hiddenInput.value = '';
  }
});

// Toggle dropdown visibility
dropdown.addEventListener('click', (e) => {
  dropdown.classList.toggle('active');
  e.stopPropagation();
});

// Update selection on click
options.forEach(option => {
  option.addEventListener('click', (e) => {
    const value = e.target.textContent;
    hiddenInput.value = value;
    selected.textContent = value;  // exact selection, no hint
    dropdown.classList.remove('active');

    const form = document.getElementById('sliderForm');
    sessionStorage.setItem('scrollPosition', window.scrollY);
    form.submit();

    e.stopPropagation();
  });
});

// Close dropdown if clicking outside
document.addEventListener('click', () => {
  dropdown.classList.remove('active');
});
