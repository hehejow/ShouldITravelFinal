import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { addResultsEventHandler } from './js/errorHandler'
import { handleSubmit } from './js/formHandler';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  handleSubmit(event);
});

// Call the function to add the event handler
addResultsEventHandler();