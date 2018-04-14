function scrolling() {
//Плавная прокрутка по якроным ссылкам
	let nav = document.getElementsByTagName('nav')[0],
					link = nav.querySelectorAll('[href^="#"]'),
					header = nav.offsetHeight;
					console.log(nav);
					console.log(link);
					console.log(header);
	for( i = 0; i < link.length; i++) {
		link[i].addEventListener('click', function(event) {
	//Перебираем кнопки с якорными ссылками и отключаем их стандартное поведение
			event.preventDefault();
			let id = this.href.replace(/[^#]*(.*)/, '$1'), //Получаем содержимое ссылки href, то есть id элемента
							top = document.querySelector(id).getBoundingClientRect().top, //Координата блока по ссылке
							current = document.documentElement.scrollTop;
							console.log(top, current, header);
			//Вызываем функцию анимации и передаём ей данные для расчёта пункта назначения
			animate(top, current, header);
		});

	};

	function animate(top, current, header) {
		//Запоминаем момент времени, когда вызвали функцию по клику
		let start = performance.now();
		requestAnimationFrame(function animate(time) {
			//time содержит текущее время
		 let timePassed = time - start, //Определяем, сколько прошло времени с начала анимации
		 				timeScroll = 1000; //Для анимации отводим 1 секунду

			 if(timePassed > timeScroll) {
/*Т.к. шаг времени зависит от функции requestAnimationFrame, то в конце анимации получаем последнее
число, которое по величине превышает timeScroll. Из-за этого скролл экрана получится немного
дальше, чем задано. Поэтому в последней точке анимации жёстко прописываем фиксированное время
timeScroll и останавливаемся точно, где надо*/
			 	timePassed = timeScroll;
			 }
				document.documentElement.scrollTop = current + (top-header)*(timePassed/timeScroll);
			 //Если время анимации не закончилось, то выполним ещё один кадр
				if (timePassed < timeScroll) {
				  requestAnimationFrame(animate);
				}
			});
	};
};

module.exports = scrolling;