import API from './services/api.js';
 
const form = document.querySelector('form');
 
window.handleSubmit = handleSubmit;
 
async function handleSubmit(event) {
  event.preventDefault();
 
  const user = Object.fromEntries(new FormData(form));
 
  const { email } = await API.create('/users', user);
 
  if (email) {
    location.href = '/criar_conta_como_empresa.html';
  } else {
    console.log('Error no cadastro');
  }
}