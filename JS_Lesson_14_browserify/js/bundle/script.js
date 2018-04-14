//Запускаем скрипт только после завершения построения браузером модели страницы
window.addEventListener('DOMContentLoaded', () => {

let tab = require('../parts/tab.js');
let scrolling = require('../parts/scrolling.js');
let timer = require('../parts/timer.js');
let modal = require('../parts/modal.js');
let form = require('../parts/form.js');
let slider = require('../parts/slider.js');
let calc = require('../parts/calc.js');
	
tab();
scrolling();
timer();
modal();
form();
slider();
calc();

});

