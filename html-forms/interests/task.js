class Interests {
  constructor(options) {
    this.title = options.title;
    this.descr = options.descr;
  }

  start() {
    this.getHandler();
  }

  getHandler() {
    addEventListener('change', interests);
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onChange({ target }) {

    if (target.type !== 'checkbox') {
      return;
    }

    this.updateChildren(target);
    this.updateParents(target);
  }

  updateChildren(el) {
    const { checked } = el;
    this.getChildren(el).forEach(child => {
      child.checked = checked;
      child.indeterminate = false;
    });
  }

  updateParents(parent) {

    while (parent = this.getParent(parent)) {
      let children = this.getChildren(parent);
      let checked = [...children].filter(child => child.checked).length;
      parent.checked = checked === children.length;
      parent.indeterminate = checked && !parent.checked;
    }

  }

  getChildren(el) {
    el = el.closest('li');
    el = el && el.querySelector('ul');
    return el && el.querySelectorAll('input[type="checkbox"]') || [];
  }

  getParent(el) {
    el = el.closest('ul');
    el = el && el.closest('li');
    return el && el.querySelector('input[type="checkbox"]');
  }

}

const interests = new Interests({
  title: 'Дерево интересов',
  descr: 'Выбрать интересы',
});

interests.start();