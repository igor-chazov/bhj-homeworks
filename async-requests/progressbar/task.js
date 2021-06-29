'use strict'

form.setAttribute('action', '');

form.onsubmit = function (event) {
  event.preventDefault();
  let xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (event) {
    const { loaded, total } = event;
    progress.setAttribute('max', total);
    progress.value = loaded;
  };

  xhr.onload = function () {
    if (xhr.status == 200) {
      alert(`Данные успешно отправлены.`);
    } else {
      alert(`Произошла ошибка во время отправки: ${xhr.status}`);
    }
  };

  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
  var formData = new FormData(form);
  xhr.send(formData);
}


