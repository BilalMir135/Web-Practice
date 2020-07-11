let millisec = 0;
let sec = 0;
let min = 0;

const millisecHTML = document.getElementById('millisec');
const secHTML = document.getElementById('sec');
const minHTML = document.getElementById('min');

let interval;

const startTimer = () => {
  interval = setInterval(() => {
    document.getElementById('start').disabled = true;
    millisec++;
    millisecHTML.innerHTML =
      millisec.toString().length === 1 ? '0' + millisec : millisec;
    if (millisec >= 100) {
      millisec = 0;
      sec++;
      secHTML.innerHTML = sec.toString().length === 1 ? '0' + sec : sec;
      if (sec >= 60) {
        sec = 0;
        min++;
        minHTML.innerHTML = min.toString().length === 1 ? '0' + min : min;
      }
    }
  }, 10);
};

document.getElementById('start').addEventListener('click', () => {
  startTimer();
});

document.getElementById('stop').addEventListener('click', () => {
  clearInterval(interval);
  document.getElementById('start').disabled = false;
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(interval);
  millisec = sec = min = 0;
  millisecHTML.innerHTML = secHTML.innerHTML = minHTML.innerHTML = '00';
  document.getElementById('start').disabled = false;
});
