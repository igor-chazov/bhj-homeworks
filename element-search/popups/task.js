'use strict'

class Modal {
  constructor(name) {
    this.name = name;
  }

  startModal() {
    this.getHandler();
  }

  getHandler() {
    document.addEventListener('DOMContentLoaded', modal);
    const modalClose = document.querySelector('.modal__close');
    modalClose.addEventListener('click', modal);
    const showSuccess = document.querySelector('.show-success');
    showSuccess.addEventListener('click', modal);
    const modalSuccessClose = document.querySelectorAll('.modal__close');
    modalSuccessClose[2].addEventListener('click', modal);
  }

  handleEvent(event) {
    let target = event.target;

    switch (event.type) {
      case 'DOMContentLoaded':
        const modalActive = document.querySelector('#modal_main');
        modalActive.classList.add('modal_active');
        break;
      case 'click':

        if (target.classList.contains('show-success')) {
          const modalSuccessActive = document.querySelector('#modal_success');
          modalSuccessActive.classList.add('modal_active');

        }

        target.parentElement.parentElement.classList.remove('modal_active');
        break;
    }

  }
}

const modal = new Modal('Модальное окно');
modal.startModal();