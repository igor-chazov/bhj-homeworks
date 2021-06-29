window.onload = () => {
  const response = JSON.parse(localStorage.getItem('Valute'));

  if (response !== null) {
    this.getElement();
    this.renderResponse(response);
  }

}

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');
xhr.send();

xhr.onload = function () {
  let responseObj = JSON.parse(xhr.response);
  const { Valute } = responseObj.response;

  localStorage.clear();
  localStorage.setItem('Valute', JSON.stringify(Valute));

  clearElement();
  getElement();
  renderResponse(Valute);
}

function clearElement() {
  const item = document.querySelectorAll('.item');

  for (let elem of item) {
    elem.remove();
  }

}

function getElement() {
  const loader = document.getElementById('loader');
  loader.classList.remove('loader_active');
}

function renderResponse(obj) {
  const elem = document.getElementById('items');
  Object.entries(obj).forEach(item => elem.insertAdjacentHTML('beforeend', `<div class="item"><div class="item__code">${item[1].CharCode}</div><div class="item__value">${item[1].Value}</div><div class="item__currency">руб.</div></div>`));
}