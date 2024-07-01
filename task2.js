let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 100);
    startPauseBtn.textContent = 'Pause';
  }
  running = !running;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    laps.appendChild(lapElement);
  }
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').substring(0, 2);
  return `${minutes}:${seconds}:${milliseconds}`;
}
