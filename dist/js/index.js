import {timer} from './modules/timer.js';
import {acc} from './modules/acc.js';

const timerElem = document.querySelector('.main-promotion__timer');
const deadline = timerElem.getAttribute('data-deadline');
console.log('deadline', deadline);

timer(timerElem, deadline);


// console.log(items);
// console.log(list);

const accRun = acc(document.querySelectorAll('.footer__title--type_close'),
document.querySelectorAll('.footer__list--type_hidden'));
