class TabMenu {
  count = 1;

  constructor(name) {
    this.name = name;
  }

  startTabMenu() {
    this.getHandler();
  }

  getHandler() {
    const tabsColection = document.querySelectorAll('.tabs');

    for (let elem of tabsColection) {
      elem.addEventListener('click', tabMenu);
      elem.addEventListener('mousedown', tabMenu);
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

    if (!event.target.classList.contains('tab')) return;

    select(event.target);

    function select(tab) {
      let tabSelected = event.currentTarget.querySelectorAll('.tab');

      for (let elem of tabSelected) {
        elem.classList.remove('tab_active');
      }

      tab.classList.add('tab_active');
      hideContent();
      activeContent(event.currentTarget);
    }

    function hideContent() {
      let tabContent = event.currentTarget.querySelectorAll('.tab__content');

      for (let elem of tabContent) {
        elem.classList.remove('tab__content_active');
      }
    }

    function activeContent(currentTarget) {
      const tabColection = currentTarget.querySelectorAll('.tab');
      const tabArray = Array.from(tabColection);
      let indexActive = tabArray.findIndex(el => el.classList.contains('tab_active'));
      const tabContentColection = currentTarget.querySelectorAll('.tab__content');
      const tabContentArray = Array.from(tabContentColection);
      tabContentArray[indexActive].classList.add('tab__content_active');
    }
  }

  cloneTabMenuDemo() {
    const tabMenuId = document.getElementById('tabs1');
    const tabMenuIdClone = tabMenuId.cloneNode(true);
    tabMenuId.after(tabMenuIdClone);
    this.count++;
    let newId = `tabs${this.count}`;
    tabMenuIdClone.id = newId;
  }
}

const tabMenu = new TabMenu('Управление вкладками');
tabMenu.cloneTabMenuDemo();
tabMenu.cloneTabMenuDemo();
tabMenu.startTabMenu();