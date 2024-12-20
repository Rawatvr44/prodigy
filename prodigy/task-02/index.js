let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer;
let running = false;

const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const millisecondsSpan = document.getElementById("milliseconds");
const laps = document.getElementById("laps");

function updateDisplay() {
  minutesSpan.textContent = minutes.toString().padStart(2, "0");
  secondsSpan.textContent = seconds.toString().padStart(2, "0");
  millisecondsSpan.textContent = milliseconds.toString().padStart(2, "0");
}

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      milliseconds++;
      if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 10);
  }
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  pauseTimer();
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  laps.innerHTML = "";
}

function recordLap() {
  const lapTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  laps.appendChild(lapItem);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

updateDisplay();
