function form() {
//Forms
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
};
module.exports = form;