import './styles/resets.scss';
import './styles/base.scss';
import { handleSubmit, updateUI } from './js/app';

document.querySelector("#generate").addEventListener("click", handleSubmit);