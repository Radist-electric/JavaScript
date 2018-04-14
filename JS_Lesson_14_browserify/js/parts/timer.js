function timer() {
	//Countdown
	//Зададим время в формате местной зоны, указав кроме даты ещё и время полуночи
	let deadline = '2018-04-21 00:00';
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
};
module.exports = timer;