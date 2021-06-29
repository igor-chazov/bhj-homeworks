window.onload = () => {
  signin.classList.add('signin_active');
}


signin__btn.addEventListener('change', () => {
  console.log('ПРИВЕТ МИР!');
  event.preventDefault;

  let formData = new FormData(document.forms[0]);
  console.log(formData);
  // formData.submit();

  let xhr = new XMLHttpRequest();
  xhr.open('POST', ' https://netology-slow-rest.herokuapp.com/auth.php');
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  // xhr.withCredentials = true;
  xhr.send(formData);



  xhr.onload = function () {

  }



});