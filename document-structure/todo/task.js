class Tasks {
  constructor(options) {
    this.title = options.title;
    this.descr = options.descr;
    this.tasksInput = options.tasksInput;
    this.tasksAdd = options.tasksAdd;
    this.tasksList = options.tasksList;
    this.task = options.task;
    this.taskTitle = options.taskTitle;
    this.taskRemove = options.taskRemove;
    this.inputElement = document.querySelector('.' + this.tasksInput);
    this.tasksAddElement = document.querySelector('.' + this.tasksAdd);
    this.tasksListElement = document.querySelector('.' + this.tasksList);
  }

  start() {
    this.getHandler();
  }

  getHandler() {
    this.inputElement.addEventListener('change', tasks);
    this.tasksAddElement.addEventListener('click', tasks);
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onChange() {

    if (!this.inputElement) return;

    const taskText = this.inputElement.value;

    if (taskText.length === 0) return;

    this.createTask(taskText);
    this.clearTask();
  }

  onClick(event) {
    event.preventDefault();
  }

  createTask(text) {
    const taskElement = document.createElement('div');
    taskElement.className = this.task;
    const html = `
    <div class="${this.taskTitle}">${text}
    </div>
    <a href="#" class="${this.taskRemove}">&times;</a>
    `;
    taskElement.innerHTML = html;
    taskElement.lastElementChild.addEventListener('click', () => taskElement.remove());
    this.tasksListElement.append(taskElement);
  }

  clearTask() {
    this.inputElement.value = '';
  }

}

const tasks = new Tasks({
  title: 'Простой список дел',
  descr: 'Составить список дел',
  tasksAdd: 'tasks__add',
  tasksInput: 'tasks__input',
  tasksList: 'tasks__list',
  task: 'task',
  taskTitle: 'task__title',
  taskRemove: 'task__remove'
});

tasks.start();