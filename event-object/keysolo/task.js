class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.countdownElement = container.querySelector('.status__timer');
    this.timerId;

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  startCounter() {
    const display = this.countdownElement;
    display.textContent = this.currentSymbol.getAttribute('data-time')
    let timer = display.textContent, seconds;

    this.timerId = setInterval(() => {
      seconds = parseInt(timer % 60, 10);
      display.textContent = seconds;;

      if (--timer < 0) {
        this.fail()
      }

    }, 1000);
  }

  stopCounter() {
    clearInterval(this.timerId);
  }


  registerEvents() {
    document.addEventListener('keydown', (event) => {
      const currentText = this.currentSymbol.textContent

      if (currentText === event.key) {
        this.success();
      } else {
        this.fail();
      }

    });
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      this.stopCounter();
      alert('Победа!');
      this.reset();
    }

    this.stopCounter();
    this.setNewWord();
  }

  fail() {

    if (++this.lossElement.textContent === 5) {
      this.stopCounter();
      alert('Вы проиграли!');
      this.reset();
    }

    this.stopCounter();
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.startCounter();
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    let n = word.length;
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}" data-time="${n}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))