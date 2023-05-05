import {timer} from './modules/timer.js'

const timerElem = document.querySelector('.main-promotion__timer');
const deadline = timerElem.getAttribute('data-deadline');
console.log('deadline', deadline);

timer(timerElem, deadline);
