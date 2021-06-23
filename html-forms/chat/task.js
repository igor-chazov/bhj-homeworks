class Chat {
  constructor(options) {
    this.title = options.title;
    this.descr = options.descr;
    this.chatWidget = options.chatWidget;
    this.chatWidgetActive = options.chatWidgetActive;
    this.chatWidgetInput = options.chatWidgetInput;
    this.chatWidgetMessages = options.chatWidgetMessages;
    this.chatContainer = options.chatContainer;
    this.activeWidget = document.querySelector('.' + this.chatWidget);
    this.inputMessages = document.getElementById(this.chatWidgetMessages);
    this.inputText = document.getElementById(this.chatWidgetInput);
    this.windowChat = document.querySelector('.' + this.chatContainer);
  }

  start() {
    this.getHandler();
  }

  getHandler() {
    this.activeWidget.addEventListener('click', chat);
    this.inputText.addEventListener('keydown', chat);
    this.windowChat.addEventListener('scroll', this.scrollDownt);
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onClick() {
    this.activeWidget.classList.add(this.chatWidgetActive);
  }

  onKeydown(event) {
    if (!this.inputText.classList.contains(this.chatWidgetInput)) return;

    if (event.key == 'Enter') {
      const messages = this.inputText.value;

      if (messages.length === 0) return;

      this.showMessegeClient(messages);
      this.clearMessages();
      this.showMessegeBot();
    }
  }

  showMessegeClient(text) {
    const now = new Date();
    this.inputMessages.innerHTML += `
    <div class="message">
      <div class="message__time">${now.getHours()}:${now.getMinutes()}</div>
      <div class="message__text">${text}</div>
    </div>`;
    this.scrollDown();
  }

  showMessegeBot() {
    const botText = this.getBotText();
    this.renderBotText(botText);
  }

  getBotText() {
    const botText = [
      'Добрый день.',
      'Что!?',
      'Дома',
      '?! У вас все в порядке?',
      'Дайте телефон вашего Администратора!',
      'Я уже отвечал на этот вопро.',
      'youtube',
      'Ну ладно:)',
      'Очень, очень хорошо!',
      'Я не звонил вам!',
      'Спасибо!!!!'
    ],
      index = Math.floor(Math.random() * botText.length);

    return botText[index];
  }

  renderBotText(botText) {
    let delay = Math.floor(Math.random() * (botText.length * 200));
    setTimeout(() => {
      const now = new Date();
      this.inputMessages.innerHTML += `
      <div class="message message_client">
        <div class="message__time">${now.getHours()}:${now.getMinutes()}</div>
        <div class="message__text">${botText}</div>
      </div>`;
      this.scrollDown();
    }, delay);
  }

  clearMessages() {
    this.inputText.value = '';
  }

  scrollDown() {
    this.inputMessages.lastElementChild.scrollIntoView(false);
  }

}

const chat = new Chat({
  title: 'Текстовый чат',
  descr: 'Написать сообщение:',
  chatWidget: 'chat-widget',
  chatWidgetActive: 'chat-widget_active',
  chatWidgetInput: 'chat-widget__input',
  chatWidgetMessages: 'chat-widget__messages',
  chatContainer: 'chat-widget__messages-container',
});

chat.start();