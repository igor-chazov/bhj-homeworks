'use strict'

editor.value = localStorage.getItem('editor');
editor.oninput = () => {
  localStorage.setItem('editor', editor.value)
};

editor.insertAdjacentHTML('afterend', `<button onclick="localStorage.removeItem('editor');editor.value=''">Очистить</button>`);