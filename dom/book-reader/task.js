class Book {
  constructor(name) {
    this.name = name;
  }

  start() {
    this.getHandler();
  }

  getHandler() {
    const bookColection = document.querySelectorAll('.book__control');

    for (let elem of bookColection) {
      elem.addEventListener('click', book);
    }

  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onClick() {
    event.preventDefault();
    const text = document.querySelector('.book__content');

    if (event.currentTarget.classList.contains('book__control_font-size')) {

      if (!event.target.classList.contains('font-size')) return;

      select(event.target, '.font-size', 'font-size_active', 'data-size', 'book_fs-small', 'book_fs-big');
    }

    if (event.currentTarget.classList.contains('book__control_color')) {

      if (!event.target.classList.contains('color')) return;

      select(event.target, '.color', 'font-size_active', 'data-text-color', 'book_color-black', 'book_color-gray', 'book_color-whitesmoke');
    }


    if (event.currentTarget.classList.contains('book__control_background')) {

      if (!event.target.classList.contains('color')) return;

      select(event.target, '.color', 'font-size_active', 'data-bg-color', 'book_bg-black', 'book_bg-gray', 'book_bg-white');
    }


    function select(target, links, active, dataAttr, value1Text, value2Text, value3Text) {

      for (let elem of event.currentTarget.querySelectorAll(links)) {
        elem.classList.remove(active);
        text.classList.remove(value1Text);
        text.classList.remove(value2Text);
        text.classList.remove(value3Text);
      }

      if (target.hasAttribute(dataAttr)) {
        showText(target, text, dataAttr, 'black', value1Text, 'gray', value2Text, 'whitesmoke', value3Text);
      }

      target.classList.add(active);
    }

    function showText(target, text, dataAttr, value1, value1Text, value2, value2Text, value3, value3Text) {
      const dataAtr = target.getAttribute(dataAttr);

      switch (dataAtr) {
        case value1:
          text.classList.add(value1Text);
          break;
        case value2:
          text.classList.add(value2Text);
          break;
        case value3:
          if (value3 === 'white' || value3 === 'whitesmoke')
            text.classList.add(value3Text);
          break;
        case 'small':
          text.classList.add(value1Text);
          break;
        case 'big':
          text.classList.add(value2Text);
          break;
      }

    }

  }

}

const book = new Book('Онлайн-читалка');
book.start();