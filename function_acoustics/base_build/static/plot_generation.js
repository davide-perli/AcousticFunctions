const dataFromBackend = window.dataFromBackend;
const totalPoints = dataFromBackend.x.length;
const delayBase = 30; // base speed in ms

// Static plot
const traceStatic = {
    x: dataFromBackend.x,
    y: dataFromBackend.y,
    type: 'scattergl',
    mode: 'lines',
    line: {color: 'blue'}
};
const layout = {
    title: dataFromBackend.title,
    xaxis: {title: 'Time t[s]'},
    yaxis: {title: 'Amplitude'}
};


const config = {
  responsive: true
};
Plotly.newPlot('staticPlot', [traceStatic], layout);


// Animated plot
const traceAnimate = {
  x: [],
  y: [],
  mode: 'lines',
  type: 'scattergl',
  line: { color: 'red' }
};


Plotly.newPlot('animatedPlot', [traceAnimate], layout);

let currentIndex = 0;
let speedMultiplier = 1;  // Animation speed multiplier
let delay = delayBase / speedMultiplier;
let animationId = null;

// Update delay and UI display based on current speed
function updateDelay() {
  delay = delayBase / speedMultiplier;
  const speedDisplay = document.getElementById('speedDisplay');
  if (speedDisplay) {
    speedDisplay.textContent = `Speed: ${speedMultiplier.toFixed(1)}x`;
  } else {
    console.warn('Speed display span not found!');
  }
}


// Core animation step function
function animateStep() {
  if (currentIndex < totalPoints) {
    Plotly.extendTraces('animatedPlot', {
      x: [[dataFromBackend.x[currentIndex]]],
      y: [[dataFromBackend.y[currentIndex]]]
    }, [0]);
    currentIndex++;
    animationId = setTimeout(animateStep, delay);
  } else {
    animationId = null; // animation finished
  }
}

// Controls:
function startAnimation() {
  if (!animationId && currentIndex < totalPoints) {
    animateStep();
  }
}

function stopAnimation() {
  if (animationId) {
    clearTimeout(animationId);
    animationId = null;
  }
}

function speedUp() {
  if (speedMultiplier < 5) {
    speedMultiplier += 0.5;
    updateDelay();  // Updates the text content immediately
  }
}
function speedDown() {
  if (speedMultiplier > 0.5) {
    speedMultiplier -= 0.5;
    updateDelay();
  }
}



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('startBtn').addEventListener('click', startAnimation);
  document.getElementById('stopBtn').addEventListener('click', stopAnimation);
  document.getElementById('speedUpBtn').addEventListener('click', speedUp);
  document.getElementById('speedDownBtn').addEventListener('click', speedDown);

  // initialize speed display
  updateDelay();
});
