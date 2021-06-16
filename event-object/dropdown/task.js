'use strict'

class DropDown {
  constructor(name) {
    this.name = name;
  }

  startDropdown() {
    this.getHandler();
  }

  getHandler() {
    const dropdownColection = document.querySelectorAll('.dropdown');

    for (let elem of dropdownColection) {
      elem.addEventListener('click', dropDown);
      elem.addEventListener('mousedown', dropDown);
    }

  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onMousedown() {
    event.preventDefault();
  }

  onClick() {
    event.preventDefault();
    let dropdownListActive = document.querySelectorAll('.dropdown__list_active');

    if (event.target.classList.contains('dropdown__link')) {
      const textValue = event.target.textContent;
      const dropdownValue = event.currentTarget.querySelector('.dropdown__value');
      dropdownValue.textContent = textValue;
    }

    const dropdownList = event.currentTarget.querySelector('.dropdown__list');
    dropdownList.classList.toggle('dropdown__list_active');

    if (dropdownListActive.length > 0 && !event.target.classList.contains('dropdown__list_active')) {

      for (let elem of dropdownListActive) {

        if (elem.classList.contains('dropdown__list_active')) {
          elem.classList.remove('dropdown__list_active');
        }

      }

    }

  }

  cloneBtnDemo() {
    const dropdownBtn = document.querySelector('.dropdown');
    const dropdownClone = dropdownBtn.cloneNode(true);
    dropdownBtn.after(dropdownClone);
    dropdownClone.style.marginLeft = '50px';
    document.body.style.display = 'flex';
  }
}

const dropDown = new DropDown('Выпадающее меню');
dropDown.cloneBtnDemo();
dropDown.cloneBtnDemo();
dropDown.startDropdown();