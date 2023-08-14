import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/handler';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  handleSubmit(event);
});

console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");