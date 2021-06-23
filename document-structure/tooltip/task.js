class Tooltip {
  constructor(options) {
    this.title = options.title;
    this.descr = options.descr;
    this.tooltip = options.tooltip;
    this.hasTooltip = options.hasTooltip;
    this.tooltipActive = options.tooltipActive;
    this.hasTooltipColection = document.querySelectorAll('.' + this.hasTooltip);
    this.tooltipElement = null;
    this.tooltipHtml = null;
  }

  start() {
    this.getHandler();
  }

  getHandler() {

    for (let elem of this.hasTooltipColection) {
      this.tooltipHtml = elem.title;
      elem.dataset.title = this.tooltipHtml;
      elem.title = '';
      elem.addEventListener('click', tooltip);
      elem.addEventListener('mouseout', tooltip);
    }

  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onMouseout() {
    this.tooltipElement = document.querySelector('.' + this.tooltip);

    if (!this.tooltipElement) return;

    this.tooltipElement.classList.remove(this.tooltipActive);
    this.tooltipElement.remove();
    this.tooltipElement = null;
  }

  onClick({ target }) {
    event.preventDefault();
    this.tooltipHtml = target.dataset.title;

    if (!this.tooltipHtml) return;

    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = this.tooltip;
    this.tooltipElement.innerText = this.tooltipHtml;
    document.body.append(this.tooltipElement);
    this.tooltipElement = document.querySelector('.' + this.tooltip);
    this.tooltipElement.classList.add(this.tooltipActive);

    let coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - this.tooltipElement.offsetWidth) / 2;

    if (left < 0) left = 0;

    let top = coords.top - this.tooltipElement.offsetHeight - 5;

    if (top < 0) {
      top = coords.top + target.offsetHeight + 5;
    }

    this.tooltipElement.style.left = left + 'px';
    this.tooltipElement.style.top = top + 'px';
  }

}

const tooltip = new Tooltip({
  title: 'Всплывающая подсказка',
  descr: 'Показать всплывающию подсказку',
  tooltip: 'tooltip',
  hasTooltip: 'has-tooltip',
  tooltipActive: 'tooltip_active'
});

tooltip.start();