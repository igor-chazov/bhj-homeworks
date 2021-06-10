'use strict'

class Menu {
  constructor(name) {
    this.name = name;
  }

  startMenu() {
    this.getHandler();
  }

  getHandler() {
    const linkColection = document.querySelectorAll('.menu__link');
    let linkListener;

    for (let i = 0; i < linkColection.length; i++) {
      linkListener = linkColection[i];

      if (linkListener.nextElementSibling) {
        linkListener.addEventListener('click', menu);
      }

    }

  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onClick(event) {
    event.preventDefault();
    let activTarget = document.querySelectorAll('.menu_active');

    if (activTarget.length > 0 && !event.target.nextElementSibling.classList.contains('menu_active')) {

      for (let i = 0; i < activTarget.length; i++) {

        if (activTarget[i].classList.contains('menu_active')) {
          activTarget[i].classList.remove('menu_active');
        }

      }

    }

    event.target.nextElementSibling.classList.toggle('menu_active');
  }
}

const menu = new Menu('navigation');
menu.startMenu();