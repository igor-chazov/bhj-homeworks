'use strict'

class Click {
  lastClick = 0;

  handleEvent(event) {
    switch (event.type) {
      case 'mousedown':
        cookie.width = "250";
        break;
      case 'mouseup':
        cookie.width = "200";

        const display = document.getElementById('clicker__counter');
        let count = display.textContent;
        ++count;
        display.textContent = count;

        const displaySpeed = document.getElementById('click__speed');
        let now = new Date();
        let time = now.getTime();
        let diff = time - this.lastClick;
        let speed = 1 / (diff / 1000);
        displaySpeed.textContent = speed.toFixed(2);
        this.lastClick = time;
        break;
    }
  }
}

const click = new Click();
cookie.addEventListener('mousedown', click);
cookie.addEventListener('mouseup', click);

const clickerStatus = document.querySelector('.clicker__status');
clickerStatus.insertAdjacentHTML('afterend', '<div class="click__speed">Скорость клика: <span id="click__speed">0.00</span></div>');