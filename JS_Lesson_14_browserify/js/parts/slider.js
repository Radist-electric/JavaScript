function slider() {
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
};
module.exports = slider;