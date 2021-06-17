class Rotator {
  constructor(name) {
    this.name = name;
  }

  start() {
    this.getRotator();
  }

  getRotator() {
    const rotators = document.querySelectorAll('.rotator__container');

    for (let rotator of rotators) {
      this.printText(rotator);
    }

  }

  printText(rotator) {
    const elemColection = Array.from(rotator.querySelectorAll('.rotator__case'));
    let i = 0;
    let delay = 1000;

    setTimeout(function tick() {
      const elem = elemColection[i];
      elem.classList.remove('rotator__case_active');
      elem.style.color = elem.dataset.color;
      delay = elem.dataset.speed;

      i++;

      if (i >= elemColection.length) {
        elem.parentElement.firstElementChild.classList.add('rotator__case_active');
        i = 0;
      } else {
        elem.nextElementSibling.classList.add('rotator__case_active');
      }

      setTimeout(tick, delay);
    }, delay);

  }

  cloneRotatorDemo() {
    const rotator = document.querySelector('.rotator__container');
    const rotatorClone = rotator.cloneNode(true);
    rotator.after(rotatorClone);
  }

}

const rotator = new Rotator('Ротатор рекламы')
rotator.cloneRotatorDemo();
rotator.cloneRotatorDemo();
rotator.start();