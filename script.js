const toggleMode = () => {
  const body = document.body;
  const modeToggle = document.querySelector('.mode-toggle');
  body.classList.toggle('mode-night');
  modeToggle.classList.toggle('mode-night');
}

// Initialize the body with the day mode
const body = document.body;
body.classList.add('mode-day');

// Initialize the mode-changing button with the day mode
const modeToggle = document.querySelector('.mode-toggle');
modeToggle.classList.add('mode-day');
