'use strict'

function startTimer(display) {
  let timer = startTimer = display.textContent, hours, minutes, seconds;

  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ':' + minutes + ":" + seconds;;

    if (--timer < 0) {
      alert('Вы победили в конкурсе');
      display.textContent = timer = startTimer;
      window.location.assign('_blank');
    }

  }, 1000);
}

const display = document.getElementById('timer');
display.addEventListener('click', startTimer);
startTimer(display);