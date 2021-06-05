'use strict'

class PlayMole {
  constructor(name) {
    this.name = name;
  }

  runMole() {
    const holeCollection = document.querySelectorAll('div.hole');
    let hole;

    for (let i = 0; i <= holeCollection.length; i++) {
      hole = document.getElementById(`hole${i}`);

      if (hole) {
        hole.addEventListener('click', function () {

          if (holeCollection[i - 1].classList == 'hole hole_has-mole') {
            const display = document.getElementById('dead');
            let count = display.textContent;
            ++count;
            display.textContent = count;

            if (count === 10) {
              alert('Победа');
              display.textContent = 0;
              const displayLost = document.getElementById('lost');
              displayLost.textContent = 0;
            }

          } else {
            const display = document.getElementById('lost');
            let count = display.textContent;
            ++count;
            display.textContent = count;

            if (count === 5) {
              alert('Вы проиграли');
              display.textContent = 0;
              const displayDead = document.getElementById('dead');
              displayDead.textContent = 0;
            }

          }
        }, false);
      }
    }
  }
}

const playMole = new PlayMole('Шустрый Крот');
playMole.runMole();