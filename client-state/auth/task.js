window.onload = () => {
  if (localStorage.userId) {
    welcome.classList.add('welcome_active');
    user_id.textContent = localStorage.userId;
    showSignout();
  } else {
    signin.classList.add('signin_active');
  }

}

signin__form.setAttribute('action', '');

signin__form.onsubmit = function (event) {
  event.preventDefault();
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    let responseObj = JSON.parse(xhr.response);

    if (responseObj.success) {
      localStorage.setItem('userId', responseObj.user_id);
      signin.classList.remove('signin_active');
      welcome.classList.add('welcome_active');
      user_id.textContent = localStorage.userId;
      showSignout();
    } else {
      clearInput();
      showModal();
    }

  }

  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
  let formData = new FormData(signin__form);
  xhr.send(formData);
};


function showModal() {
  const signinElement = document.getElementById('signin');

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
    <div class="modal__title">Неверный логин/пароль</div>
  </div>
  <div class="modal__footer">
    <button class="modal__close" onclick="clearModal()">Закрыть</button>
  </div>        
  </div>`;

  signinElement.prepend(div);
}

function clearModal() {
  const modalElement = document.querySelector('.modal');
  modalElement.remove();
}

function showSignout() {
  let btn = document.createElement('button');
  btn.className = 'signout';
  btn.classList.add('modal__close');
  btn.setAttribute('onclick', 'exitSingin()');
  btn.textContent = 'Выйти';
  document.body.prepend(btn);
}

function exitSingin() {
  localStorage.clear();
  welcome.classList.remove('welcome_active');
  signin.classList.add('signin_active');
  clearInput();
  const signoutElement = document.querySelector('.signout');
  signoutElement.remove();
}

function clearInput() {
  const inputElements = document.querySelectorAll('input');

  for (let elem of inputElements) {
    elem.value = '';
  }

}