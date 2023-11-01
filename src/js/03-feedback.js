import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

let formData = {};

form.addEventListener('input', throttle(handlerForm, 500));

function handlerForm(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

form.addEventListener('submit', handlerBut);

function handlerBut(evt) {
  evt.preventDefault();
  const formElement = evt.target.elements;
  const email = formElement.email.value;
  const message = formElement.message.value;
  const data = {
    email,
    message,
  };
  if (email === '' || message === '') {
    return alert('Please fill in all the fields!');
  }
  formData = {};
  evt.currentTarget.reset();
  console.log(data);
  localStorage.removeItem(localStorageKey);
}

function loadFormData() {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    formData = JSON.parse(savedData);
    for (let key in formData) {
      form[key].value = formData[key];
    }
  }
}
loadFormData();
