window.onload = function () {

  if (!getCookie('closeWindow')) {
    setTimeout(() => {
      const modalElement = document.getElementById('subscribe-modal');
      modalElement.classList.add('modal_active');
    }, 1000);
  }

}

const modalCloseElement = document.querySelector('.modal__close');
modalCloseElement.onclick = function (event) {
  const { target } = event;

  if (target) {
    setCookie('closeWindow', 'closed', { secure: true, 'max-age': 31536000 });
  }

  const modalElement = document.getElementById('subscribe-modal');
  modalElement.classList.remove('modal_active');
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

// deleteCookie('closeWindow');

