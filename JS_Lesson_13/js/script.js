//Запускаем скрипт только после завершения построения браузером модели страницы
window.addEventListener('DOMContentLoaded', () => {
	let tab = document.getElementsByClassName('info-header-tab'),
				 tabContent = document.getElementsByClassName('info-tabcontent'),
				 info = document.getElementsByClassName('info-header')[0];
/*Скрываем контент (если а=0, то весь; если а=1, то всё, кроме 1-ой статьи
(используется при первом запуске))*/
	function hideTabContent(a) {
			for(i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove('show');
				tabContent[i].classList.add('hide');
			}
	};
//При первом запуске скрываем все вкладки, кроме первой
	hideTabContent(1);
//Скрываем все табы и показываем только тот, по которому кликнули
	function showtabContent(b) {
		if(tabContent[b].classList.contains('hide')) {
				hideTabContent(0);
				tabContent[b].classList.remove('hide');
				tabContent[b].classList.add('show');
		}
	}
/*Ждём клика по вкладкам. Слушаем родителя вкладки и перебираем массив
со вкладками в поиске той, по которой кликнули*/
	info.addEventListener('click', (event) => {
			let target = event.target;
			if(target.className == 'info-header-tab') {
					for(i = 0; i < tab.length; i++) {
						if(target == tab[i]) {
								showtabContent(i);
								break;						}
					}
			};
	});

	//Countdown
	//Зададим время в формате местной зоны, указав кроме даты ещё и время полуночи
	let deadline = '2018-04-14 00:00';
	//Получаем время,оставшееся до заданного, и разбираем его на составляющие
	function getRemainingTime(endTime) {
		let difTime = Date.parse(endTime) - Date.parse(new Date()),
						seconds = Math.floor((difTime/1000) % 60),
						minutes = Math.floor((difTime/1000/60) % 60),
						hours = Math.floor(difTime/1000/60/60);
						//Полученные значения возвращаем в объект
						return {
							'total': difTime,
							'seconds': seconds,
							'minutes': minutes,
							'hours': hours
						};
	};
	//С интервалом в 1 секунду записываем оставшееся время в сответствующие поля сайта
	function setClock(id, endTime) {
		let timer = document.getElementById(id),
						hours = timer.querySelector('.hours'),
						minutes = timer.querySelector('.minutes'),
						seconds = timer.querySelector('.seconds'),
						action = document.getElementsByClassName('timer-action')[0];
/*Обязательно задаём timeInterval до вызова функции, иначе при отрицательном времени
и попытке выполнить clearInterval(timeInterval) выпадет ошибка, что эта переменная не задана*/
		let timeInterval = setInterval(updateClock, 1000);
		updateClock();
		function updateClock() {
			let t = getRemainingTime(endTime);
			if(t.hours > 9) {
				hours.innerHTML = t.hours;
			} else {
				hours.innerHTML = '0' + t.hours;
			};
			if(t.minutes > 9) {
				minutes.innerHTML = t.minutes;
			} else {
				minutes.innerHTML = '0' + t.minutes;
			};
			if(t.seconds > 9) {
				seconds.innerHTML = t.seconds;
			} else {
				seconds.innerHTML = '0' + t.seconds;
			};
			if( t.total <= 0 ) {
				clearInterval(timeInterval);
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
				action.innerHTML = 'Акция завершена';
			};
		};
	};
	setClock('timer', deadline);
/*----------------------------------------------------*/
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

//Modal

	let more = document.querySelector('.more'),
					overlay = document.querySelector('.overlay'),
					close = document.querySelector('.popup-close'),
					more_tab = document.getElementsByClassName('description-btn');

  function showModal() {
			this.classList.add('more-splash');
			overlay.style.display = "block";
			document.body.style.overflow = "hidden";
  };
  more.addEventListener("click", showModal);
  for( i = 0; i < more_tab.length; i++) {
  	more_tab[i].addEventListener('click', showModal);
  }

  function hideModal() {
			overlay.style.display = "none";
			more.classList.remove('more-splash');
			document.body.style.overflow = "";
			//Проверяем, есть ли в форме контейнер с сообщением об отправке формы.
			for ( i = 0; i < searchForm.length; i++) {
				console.log(searchForm[i]);
				let formDiv = searchForm[i].getElementsByTagName('div');
				for ( i = 0; i < formDiv.length; i++) {
					if (formDiv[i].classList.contains("status") == true) {
					//Если такой контейнер есть, то удаляем его.
					formDiv[i].remove();
					};
				};
			};
  };
		close.addEventListener('click', hideModal);

//Form

let message = new Object();
message.loadingText = "Загрузка...";
message.loadingImg = "img/ajax/ajax-loader.gif";
message.successText = "Спасибо! Скоро мы с вами свяжемся";
message.successImg = "img/ajax/smile-success.png";
message.failureText = "Что-то пошло не так...";
message.failureImg = "img/ajax/smile-sad.png";
//Ищем все формы в документе
let searchForm = document.getElementsByTagName('form');

//Перебираем формы и ждём клика
for ( i = 0; i < searchForm.length; i++) {
	searchForm[i].addEventListener('submit', function(event) {
		event.preventDefault();
		console.log(this);
		//В той форме, по которой кликнули создаём переменные
		let form = this,
						input = form.getElementsByTagName('input'),
						statusMessage = document.createElement('div');
						statusMessage.classList.add('status');
		//Добавляем контейнер для сообщения статуса отправки
		form.appendChild(statusMessage);
	
			// AJAX
			//Используем конструктор для создания объекта запроса request
			let request = new XMLHttpRequest();
			//Настройка запроса с помощью метода open (метод POST, обращаемся к файлу на сервере)
			request.open("POST", 'server.php');
			//Правильная кодировка для правильной передачи данных
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			//Получаем данные из Инпутов. Воспользуемся встроенным объектом FormData.
			//Как параметр используем нашу форму
			let formData = new FormData(form);
			//Отправляем данные на сервер
			request.send(formData);
			//Отследуем статус готовности нашего запроса в данный момент
			request.onreadystatechange = function() {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loadingText;
					let img = document.createElement("img");
					img.src = message.loadingImg;
					statusMessage.appendChild(img);
				} else if (request.readyState === 4) {
					if (request.status == 200 &&  request.status < 300) {
						statusMessage.innerHTML = message.successText;
						let img = document.createElement("img");
						img.src = message.successImg;
						statusMessage.appendChild(img);
						//Добавляем контент на страницу
					} else {
						statusMessage.innerHTML = message.failureText;
						let img = document.createElement("img");
						img.src = message.failureImg;
						statusMessage.appendChild(img);
					}
				}
			};
			//Очищаем поля ввода
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			};
	});
};

//Удаляем все контейнеры с ссобщением об отправке
//Если обнаружена прокрутка контейнера,
document.addEventListener('scroll', function() {
	//то перебираем формы
	for ( i = 0; i < searchForm.length; i++) {
		let formDiv = searchForm[i].getElementsByTagName('div');
		for ( i = 0; i < formDiv.length; i++) {
			//и ищем контейнер с классом Status
			if (formDiv[i].classList.contains("status") == true) {
			//Если такой контейнер есть, то удаляем его.
			formDiv[i].remove();
			};
		};
	};
});

//Slider
	let slideIndex = 1,//Нумерация слайдов с 1, а не с нуля
					slides = document.getElementsByClassName('slider-item'),//Массив с контейнерами картинок
					prev = document.querySelector('.prev'),
					next = document.querySelector('.next'),
					dotsWrap = document.querySelector('.slider-dots'),
					dots = document.getElementsByClassName('dot');//Массив с точками
//Показываем выбранный слайд
	showSlides(slideIndex);
	function showSlides(n) {
		//Если пытаемся перейти на слайд дальше последнего, то переходим на первый
		if (n > slides.length) {
			slideIndex = 1;
		};
		//Если пытаемся перейти на слайд раньше первого, то переходим на последний
		if (n < 1) {
			slideIndex = slides.length;
		};
		//Убираем все картинки
		for ( let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		};
		//Все точки делаем неактивными
		for ( let i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active');
		};
		//Выводим текущую картинку
		slides[slideIndex - 1].style.display = 'block';
		//Текущую точку делаем активной
		dots[slideIndex - 1].classList.add('dot-active');
	};
	//Перелистываем слайды по нажатию кнопок prev/next
	function plusSlides(n) {
		showSlides(slideIndex += n);
	};

	function currentSlide(n) {
		showSlides(slideIndex = n);
	};
	//Если кнопка prev, то номер слайда -1
	prev.addEventListener('click', function() {
		plusSlides(-1);
	});
	//Если кнопка next, то номер слайда +1
	next.addEventListener('click', function() {
		plusSlides(1);
	});
	//Если кликнули по обёртке точек,
	dotsWrap.addEventListener('click', function(event) {
		//то перебираем точки в соответствии с номерами слайдов, т.е. от 1 до последнего
		for (let i = 1; i < dots.length + 1; i++) {
			//Если кликнули по реальной точке, то узнаём её номер из масива точек
			if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
				//и выводим слайд, соответствующий точке.
				currentSlide(i);
			};
		};
	});

	//Calc
	let persons = document.getElementsByClassName('counter-block-input')[0],
					restDays = document.getElementsByClassName('counter-block-input')[1],
					place = document.getElementById('select'),
					totalValue = document.getElementById('total'),
					personsSum = 0,//Начальное количество людей 0
					daysSum = 0,//Начальное количество дней 0
					total = 0,//Начальная сумма денег 0
					ratio = place.options[place.selectedIndex].value;//Начальный коэффициент
	//При старте страницы записываем 0 в общую сумму
	totalValue.innerHTML = 0;
	//При изменении количества людей пересчитываем сумму
	persons.addEventListener('change', function() {
		personsSum = +this.value;
		total = daysSum*personsSum*ratio*4000;
		if (persons.value == '') {
			totalValue.innerHTML = 0;
		} else totalValue.innerHTML = total;
	});
	//При изменении количества дней пересчитываем сумму
	restDays.addEventListener('change', function() {
		daysSum = +this.value;
		total = daysSum*personsSum*ratio*4000;
		if (restDays.value == '') {
			totalValue.innerHTML = 0;
		} else totalValue.innerHTML = total;
	});
	//При изменении базы меняем коэффициент и пересчитываем сумму
	place.addEventListener('change', function() {
		ratio = this.options[this.selectedIndex].value;
		console.log(ratio);
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
				totalValue.innerHTML = total*ratio;
		};
	});






});

