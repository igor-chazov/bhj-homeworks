'use strict'

class Slider {
  constructor(name) {
    this.name = name;
  }

  startSlider() {
    this.showSliderDot('.slider__item', 'slider__item_active', '.slider__dot', 'slider__dot_active');
    this.getHandler();
  }

  showSliderDot(elemSliderColection, elemSliderActiv, elemSliderDotColection, elemSliderActive) {
    const sliderColection = document.querySelectorAll(elemSliderColection);
    const sliderArray = Array.from(sliderColection);
    let nextIndex = sliderArray.findIndex(el => el.classList.contains(elemSliderActiv));

    let index = nextIndex;

    const sliderDotColection = document.querySelectorAll(elemSliderDotColection);
    const sliderDotArray = Array.from(sliderDotColection);
    let sliderDotActive = sliderDotArray[index];
    sliderDotActive.classList.add(elemSliderActive);
  }

  getHandler() {
    const arrowNext = document.querySelector('.slider__arrow_next');
    arrowNext.addEventListener('click', slider);
    const arrowPrev = document.querySelector('.slider__arrow_prev');
    arrowPrev.addEventListener('click', slider);
    const sliderDot = document.querySelector('.slider__dots');
    sliderDot.addEventListener('click', slider);
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onClick(event) {
    const target = event.target;

    if (target.classList.contains('slider__dot')) {
      this.sliderImageDot('.slider__item', 'slider__item_active', '.slider__dot', 'slider__dot_active', target);
    }

    if (target.classList.contains('slider__arrow_next')) {
      this.sliderImageNext('.slider__item', 'slider__item_active', '.slider__dot', 'slider__dot_active');
    } else if (target.classList.contains('slider__arrow_prev')) {
      this.sliderImagePrev('.slider__item', 'slider__item_active', '.slider__dot', 'slider__dot_active');
    }

  }

  sliderImageDot(elemSliderColection, elemSliderActiv, elemSliderDotColection, elemSliderDotActive, target) {
    const sliderColection = document.querySelectorAll(elemSliderColection);
    const sliderArray = Array.from(sliderColection);
    let index = sliderArray.findIndex(el => el.classList.contains(elemSliderActiv));

    const sliderDotColection = document.querySelectorAll(elemSliderDotColection);
    const sliderDotArray = Array.from(sliderDotColection);

    sliderArray[index].classList.remove(elemSliderActiv);
    sliderDotArray[index].classList.remove(elemSliderDotActive);

    target.classList.add(elemSliderDotActive);
    let activeIndex = sliderDotArray.findIndex(el => el.classList.contains(elemSliderDotActive));
    sliderArray[activeIndex].classList.add(elemSliderActiv);
  }

  sliderImageNext(elemSliderColection, elemSliderActiv, elemSliderDotColection, elemSliderDotActive) {
    const sliderColection = document.querySelectorAll(elemSliderColection);
    const sliderArray = Array.from(sliderColection);
    let nextIndex = sliderArray.findIndex(el => el.classList.contains(elemSliderActiv));

    const sliderDotColection = document.querySelectorAll(elemSliderDotColection);
    const sliderDotArray = Array.from(sliderDotColection);

    if (nextIndex > sliderArray.length - 2) {
      sliderArray[nextIndex].classList.remove(elemSliderActiv);
      sliderDotArray[nextIndex].classList.remove(elemSliderDotActive);
      nextIndex = 0;
      sliderArray[nextIndex].classList.add(elemSliderActiv);
      sliderDotArray[nextIndex].classList.add(elemSliderDotActive);
    } else if (nextIndex < sliderArray.length - 1) {
      sliderArray[nextIndex].classList.remove(elemSliderActiv);
      sliderDotArray[nextIndex].classList.remove(elemSliderDotActive);
      nextIndex++;
      sliderArray[nextIndex].classList.add(elemSliderActiv);
      sliderDotArray[nextIndex].classList.add(elemSliderDotActive);
    }

  }

  sliderImagePrev(elemSliderColection, elemSliderActiv, elemSliderDotColection, elemSliderDotActive) {
    const sliderColection = document.querySelectorAll(elemSliderColection);
    const sliderArray = Array.from(sliderColection);
    let nextIndex = sliderArray.findIndex(el => el.classList.contains(elemSliderActiv));

    const sliderDotColection = document.querySelectorAll(elemSliderDotColection);
    const sliderDotArray = Array.from(sliderDotColection);

    if (nextIndex === 0) {
      sliderArray[nextIndex].classList.remove(elemSliderActiv);
      sliderDotArray[nextIndex].classList.remove(elemSliderDotActive);
      nextIndex = 4;
      sliderArray[nextIndex].classList.add(elemSliderActiv);
      sliderDotArray[nextIndex].classList.add(elemSliderDotActive);
    } else if (nextIndex) {
      sliderArray[nextIndex].classList.remove(elemSliderActiv);
      sliderDotArray[nextIndex].classList.remove(elemSliderDotActive);
      --nextIndex;
      sliderArray[nextIndex].classList.add(elemSliderActiv);
      sliderDotArray[nextIndex].classList.add(elemSliderDotActive);
    }

  }
}

const slider = new Slider('sliderNavigation');
slider.startSlider();