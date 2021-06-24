class Product {
  constructor(container) {
    this.container = container;
    this.containerCart = container.children[0];
    this.containerProducts = container.children[1];
    this.product = this.containerProducts.querySelectorAll('.product'); /* Товары */
    this.cartProducts = this.containerCart.querySelector('.cart__products'); /* Корзина */

    this.registerEvents();
  }

  registerEvents() {

    window.onload = () => {
      const cartData = this.getCartData();

      if (cartData !== null) {

        if (this.containerCart.classList.contains('hidden')) {
          this.containerCart.classList.remove('hidden');
        }

        for (let item in cartData) {
          document.querySelector('.cart__products').insertAdjacentHTML('beforeend', `<div class="cart__product" data-id="${item}"><img class="cart__product-image" src="${cartData[item][0]} "><div class="cart__product-count">${cartData[item][1]}</div></div>`);
        }

      }

    };

    this.containerCart.addEventListener('click', e => {
      const { target } = e;
      this.containerCart.style.userSelect = 'none';

      if (!target.classList.contains('cart__remove')) return;

      localStorage.clear();
      const cartColection = document.querySelectorAll('.cart__product');

      for (let elem of cartColection) {
        this.cartProducts.removeChild(elem);
      }

      this.containerCart.classList.add('hidden');

    }, false);

    for (let elem of this.product) {
      elem.addEventListener('click', e => {
        const { target } = e;
        elem.style.userSelect = 'none';

        this.getCounter(target);
        this.addCartData(target);
      }, false);
    }

  }

  getCounter(target) {

    if (target.matches('.product__quantity-control_dec')) {
      const display = target.nextElementSibling;
      let count = +display.textContent;
      --count;
      if (count < 0) count = 0;
      display.textContent = count;
    } else if (target.matches('.product__quantity-control_inc')) {
      const display = target.previousElementSibling;
      let count = +display.textContent;
      ++count;
      display.textContent = count;
    }

  }

  addCartData(target) {

    if (target.matches('.product__add')) {

      const cartData = this.getCartData() || {},
        dataId = target.closest('.product').dataset.id,
        image = target.closest('.product').children[1].src,
        counter = +target.closest('.product__quantity').children[1].children[1].textContent;

      if (counter === 0) return;

      if (cartData.hasOwnProperty(dataId)) {
        cartData[dataId][1] += counter;
      } else {
        cartData[dataId] = [image, counter];
      }

      this.setCartData(cartData);

      if (this.containerCart.classList.contains('hidden')) {
        this.containerCart.classList.remove('hidden');
      }

      const cartColection = this.cartProducts.children;

      for (let elem of cartColection) {

        if (elem.dataset.id === dataId) {
          let display = +elem.lastElementChild.textContent;
          display += counter;
          elem.lastElementChild.textContent = display;
          return;
        }

      }

      this.cartProducts.insertAdjacentHTML('beforeend', `<div class="cart__product" data-id="${dataId}"><img class="cart__product-image" src="${image} "><div class="cart__product-count">${counter}</div></div>`);
    }

  }

  getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  setCartData(o) {
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
  }

}

new Product(document.body);