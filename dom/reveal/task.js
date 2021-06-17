class Reveal {
  constructor(name) {
    this.name = name;
  }

  start() {
    this.getHandler();
  }

  getHandler() {
    window.addEventListener('scroll', reveal);
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onScroll() {

    for (let elem of document.querySelectorAll('.reveal')) {

      if (isVisible(elem)) {
        elem.classList.add('reveal_active');
      }

    }

    function isVisible(elem) {
      let cords = elem.getBoundingClientRect();
      let windowHeight = document.documentElement.clientHeight;

      let topVisible = cords.top > 0 && cords.top < windowHeight;
      let bottomVisible = cords.bottom < windowHeight && cords.bottom > 0;

      return topVisible || bottomVisible;
    }
  }
}

const reveal = new Reveal('Появление элементов при прокрутке');
reveal.start();