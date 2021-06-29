'use strict'

sessionStorage.clear();

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
xhr.send();

xhr.onload = function () {
  let responseObj = JSON.parse(xhr.response);
  const { answers } = responseObj.data;
  sessionStorage.setItem('pollId', responseObj.id);

  let titletNode = document.createTextNode(responseObj.data.title);
  poll__title.append(titletNode);
  Array.from(answers).forEach((item, i) => poll__answers.insertAdjacentHTML('beforeend', `<button class="poll__answer" data-index="${i}">${item}</button>`));
}

const btnPoll = document.getElementById('poll__answers');

btnPoll.addEventListener('click', (e) => {
  const { target } = e;

  if (!target.matches('button')) return;

  sessionStorage.setItem('index', target.dataset.index);
  showModal();
});

function showModal() {
  const pollElement = document.querySelector('.poll');

  let div = document.createElement('div');
  div.className = 'modal'
  div.style.cssText = `display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5)
  ;`

  div.innerHTML = `<div class="modal__content">
  <div class="modal__header">
    <div class="modal__title">Спасибо, ваш голос засчитан!</div>
  </div>
  <div class="modal__footer">
    <button class="modal__close" onclick="clearModal()">Закрыть</button>
  </div>        
  </div>`;

  pollElement.prepend(div);
}

function clearModal() {
  const modalElement = document.querySelector('.modal');
  modalElement.remove();

  const pollAnswerElements = document.querySelectorAll('.poll__answer');

  for (let elem of pollAnswerElements) {
    elem.remove();
  }

  const xhr = new XMLHttpRequest;
  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(`vote=${sessionStorage.pollId}&answer=${sessionStorage.index}`);

  xhr.onload = function () {
    let responseStatic = JSON.parse(xhr.response);
    Array.from(responseStatic.stat).forEach((item) => poll__answers.insertAdjacentHTML('beforeend', `<div class="poll__answer">${item.answer}: ${(item.votes / 10).toFixed(2)}%</div>`));

    sessionStorage.clear();
  }
}
