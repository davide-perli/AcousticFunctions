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

// Sound
let audioCtx = null;
let sourceNode = null;

function playSound(signalArray, sampleRate) {
  if (audioCtx === null) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Stop previous sound if playing
  if (sourceNode) {
    sourceNode.stop();
    sourceNode.disconnect();
    sourceNode = null;
  }

  const buffer = audioCtx.createBuffer(1, signalArray.length, sampleRate);
  const channelData = buffer.getChannelData(0);

  const maxVal = Math.max(...signalArray.map(Math.abs));
  for (let i = 0; i < signalArray.length; i++) {
    channelData[i] = signalArray[i] / maxVal;
  }

  sourceNode = audioCtx.createBufferSource();
  sourceNode.buffer = buffer;
  sourceNode.connect(audioCtx.destination);
  sourceNode.start();

  // When sound ends, clear reference
  sourceNode.onended = () => {
    sourceNode = null;
  };
}

function stopSound() {
  if (sourceNode) {
    sourceNode.stop();
    sourceNode.disconnect();
    sourceNode = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('playSoundBtn').addEventListener('click', () => {
    playSound(window.dataFromBackend.y, window.dataFromBackend.samplingFrequency || 44100);
  });
  
  document.getElementById('stopSoundBtn').addEventListener('click', () => {
    stopSound();
  });
});





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


function animateStep() {
  let pointsPerFrame = Math.round(speedMultiplier);
  let endIndex = Math.min(currentIndex + pointsPerFrame, totalPoints);
  if (currentIndex < endIndex) {
    Plotly.extendTraces('animatedPlot', {
      x: [dataFromBackend.x.slice(currentIndex, endIndex)],
      y: [dataFromBackend.y.slice(currentIndex, endIndex)]
    }, [0]);
    currentIndex = endIndex;
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
  if (speedMultiplier < 100) {
    speedMultiplier += 1;
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
