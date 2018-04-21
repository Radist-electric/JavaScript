window.addEventListener('DOMContentLoaded', function () {
	let overlay = document.getElementsByClassName('overlay')[0],
					modal = overlay.getElementsByClassName('popup')[0],
					modalBtn = document.getElementById('popup-btn'),
					main = document.getElementsByClassName('main')[0],
					mainCards = main.getElementsByClassName('main-cards-item'),
					custom = document.getElementsByClassName('custom')[0],
					customName = document.getElementById('name'),
					customAge = document.getElementById('age'),
					customRadio = custom.getElementsByClassName('radio')[0],
					customSex = document.getElementsByName('sex'),
					customSelect = document.getElementById('select'),
					customViews = customSelect.options[customSelect.selectedIndex].value,
					customBio = document.getElementById('bio'),
     customReady = document.getElementById('ready'),
					president = {
					fullName: 'без имени',
					age: 'сколько-то',
					sex: 'Мужской',
					views: 'Неопределённые',
					biography: 'Умалчивается',
					skin: '',
					clothes: '',
					hair: '',
					shoes: ''
					};


	//Действия с модальным окном
	modal.classList.add('animated', 'bounceInUp');
	//Нажимаем кнопку на модальном окне и переходим в окно кастомизации
	modalBtn.addEventListener('click', function() {
		setTimeout(function() {
   overlay.classList.add('animated', 'fadeOut');
   }, 500);
		modal.classList.remove('bounceInUp');
		modal.classList.add('bounceOutUp');
		main.classList.add('hide');
  setTimeout(showCustom, 1300);
		setTimeout(function() {overlay.style.display = "none"}, 2000);
	});




/*Манипуляции в окне кастомизации*/
	//Получаем имя кандидата
	customName.addEventListener('change', function() {
		president.fullName = this.value;
		console.log(president);
	});

		//Получаем возраст кандидата
		customAge.addEventListener('change', function() {
		let age = this.value;
		//Если кроме чисел присутствуют другие знаки, то очищаем поле
		if (isNaN(age) == true) {
			age = '';
			this.value = age;
			president.age = age;
		} else president.age = age;
		console.log(president);
	});

	//При запуске страницы задаём пол, взгляды по умолчанию, а также надеваем обувь
 for (let i = 0; i < customSex.length; i++) {
     if (customSex[i].type == "radio" && customSex[i].checked) {
         president.sex = customSex[i].value;
     };
 };
 president.views = customViews;
 president.shoes = 'url(img/clothes/construct/shoes.png)';

 //Меняем пол
	customRadio.addEventListener('click', function(event) {
		if (event.target && event.target.type == 'radio' && event.target.checked) {
			president.sex = event.target.value;
			showSkins(skinIndex);
			showClothes(clothesIndex);
			showHair(hairIndex);
			console.log(president);
		};
	});
 
 //Меняем взгляды
 customSelect.addEventListener('change', function() {
 	customViews = this.options[this.selectedIndex].value;
 	president.views = customViews;
 	console.log(president);
 });

	//Получаем биографию кандидата
	customBio.addEventListener('change', function() {
		president.biography = this.value;
		console.log(president);
	});
    
	//Показать окно для голосования
	customReady.addEventListener('click', function() {
		hideCustom();
  //Добавляем копию карточки кандидата
  let newCard = mainCards[1].cloneNode(true);
  mainCards[1].parentNode.insertBefore(newCard, mainCards[1].nextSibling);
  //Записываем в эту карточку данные нового кандидата
  let newCardName = newCard.querySelector('.name'),
  				newCardAge = newCard.querySelector('.age'),
  				newCardSex = newCard.querySelector('.sex'),
  				newCardViews = newCard.querySelector('.views'),
  				newCardBio = newCard.querySelector('.bio'),
  				newCardPhoto = newCard.querySelector('.photo');
  newCardName.innerHTML = president.fullName;
  newCardAge.innerHTML = `${president.age} лет`;
  newCardSex.innerHTML = president.sex;
  newCardViews.innerHTML = president.views;
  newCardBio.innerHTML = president.biography;
  newCardPhoto.style.cssText = `background-image: ${president.shoes},
  																																																${president.clothes},
  																																																${president.hair},
  																																																${president.skin};
  																														background-size: cover;`;
		setTimeout(showVoting, 1500);
	});


	//Экран голосования
	let reset = document.getElementById('reset'),
					voting = document.getElementById('voting'),
					crime = document.getElementById('crime');
	
	reset.addEventListener('click', function() {
		hideVoting();
		setTimeout(function() {
			showCustom();
			mainCards[2].remove();
		}, 1500);
	});


 //Персонаж
 let personSkin = document.getElementById('person-skin'),
 				personClothes = document.getElementById('person-clothes'),
 				personHair = document.getElementById('person-hair');



	//Слайдер
	let skin = document.querySelector('.skin'),
					skinColor = skin.getElementsByClassName('skin-color'),
					hair = document.querySelector('.hair'),
					hairStyle = hair.getElementsByClassName('hair-style'),
					clothes = document.querySelector('.clothes'),
					clothesStyle = clothes.getElementsByClassName('clothes-style'),
					prev = document.getElementsByClassName('prev'),
					next = document.getElementsByClassName('next'),
					skinIndex = 1,
					clothesIndex = 1,
					hairIndex = 1;

	//Показываем кожу
	showSkins(skinIndex);
	function showSkins(n) {
		if (n > 3) {
			skinIndex = 1;
		};
		if (n < 1) {
			skinIndex = 3;
		};
		for ( let i = 0; i < 3; i++) {
			skinColor[i].style.display = 'none';
		};
		skinColor[skinIndex - 1].style.display = 'block';
		if (president.sex == 'Мужской') {
			personSkin.style.backgroundImage = `url(img/skin/skin-${skinIndex}.png)`;
			president.skin = `url(img/skin/skin-${skinIndex}.png)`;
		} else if (president.sex == 'Женский') {
			personSkin.style.backgroundImage = `url(img/skin/skin-${skinIndex+3}.png)`;
			president.skin = `url(img/skin/skin-${skinIndex+3}.png)`;
		};
	};

	//Показываем одежду
	showClothes(clothesIndex);
	function showClothes(n) {
		if (n > 3) {
			clothesIndex = 1;
		};
		if (n < 1) {
			clothesIndex = 3;
		};
		for ( let i = 0; i < 3; i++) {
			clothesStyle[i].style.display = 'none';
			clothesStyle[i+3].style.display = 'none';
		};
		if (president.sex == 'Мужской') {
			clothesStyle[clothesIndex - 1].style.display = 'block';
			personClothes.style.backgroundImage = `url(img/clothes/construct/clothes-${clothesIndex}.png)`;
			president.clothes = `url(img/clothes/construct/clothes-${clothesIndex}.png)`;
		} else if (president.sex == 'Женский') {
			clothesStyle[clothesIndex + 2].style.display = 'block';
			personClothes.style.backgroundImage = `url(img/clothes/construct/clothes-${clothesIndex+3}.png)`;
			president.clothes = `url(img/clothes/construct/clothes-${clothesIndex+3}.png)`;
		};
	};

	//Показываем волосы
	showHair(hairIndex);
	function showHair(n) {
		if (n > 3) {
			hairIndex = 1;
		};
		if (n < 1) {
			hairIndex = 3;
		};
		for ( let i = 0; i < 3; i++) {
			hairStyle[i].style.display = 'none';
			hairStyle[i+3].style.display = 'none';
		};
		if (president.sex == 'Мужской') {
			hairStyle[hairIndex - 1].style.display = 'block';
			personHair.style.backgroundImage = `url(img/hair/construct/hair-${hairIndex}.png)`;
			president.hair = `url(img/hair/construct/hair-${hairIndex}.png)`;
		} else if (president.sex == 'Женский') {
			hairStyle[hairIndex + 2].style.display = 'block';
			personHair.style.backgroundImage = `url(img/hair/construct/hair-${hairIndex+3}.png)`;
			president.hair = `url(img/hair/construct/hair-${hairIndex+3}.png)`;
		};
	};

	//Слушаем все кнопки "Слайдер влево"
	for ( let i = 0; i < prev.length; i++) {
		prev[i].addEventListener('click', function() {
			if (this.parentNode == skin) {
				plusSkins(-1);
				} else if (this.parentNode == clothes) {
						plusClothes(-1);
						} else if (this.parentNode == hair) {
								plusHair(-1);
						};
		});
	//Слушаем все кнопки "Слайдер вправо"
		next[i].addEventListener('click', function() {
			if (this.parentNode == skin) {
				plusSkins(1);
				} else if (this.parentNode == clothes) {
						plusClothes(1);
						} else if (this.parentNode == hair) {
								plusHair(1);
						};
		});
	};

	function plusSkins(n) {
		showSkins(skinIndex += n);
	};
	function plusClothes(n) {
		showClothes(clothesIndex += n);
	};
	function plusHair(n) {
		showHair(hairIndex += n);
	};





	//Показать окно кастомизации
	function showCustom() {
		custom.classList.remove('hide');
		custom.classList.add('show-flex');
		for (let i = 0; i < custom.children.length; i++) {
			custom.children[i].classList.add('show-block');
		 if (custom.children[i].classList.contains('custom-char')) {
		     custom.children[i].classList.remove('animated', 'slideOutUp');
		     custom.children[i].classList.add('animated', 'slideInDown');
		   		} else {
		       custom.children[i].classList.remove('animated', 'slideOutDown');
		       custom.children[i].classList.add('animated', 'slideInUp');
		      	};
		};
	};
//Скрыть окно кастомизации
	function hideCustom() {
		for (let i = 0; i < custom.children.length; i++) {
  if (custom.children[i].classList.contains('custom-char')) {
  				custom.children[i].classList.remove('animated', 'slideInDown');
      custom.children[i].classList.add('animated', 'slideOutUp');
  } else {
  				custom.children[i].classList.remove('animated', 'slideInUp');
      custom.children[i].classList.add('animated', 'slideOutDown');
     };
  setTimeout(function() {
   custom.classList.remove('show-flex');
	  custom.classList.add('hide');
  	}, 1500);
  };
	};
	//Показать окно голосования
	function showVoting() {
  main.classList.remove('hide');
  main.classList.add('show-block');
  main.classList.remove('animated', 'fadeOutUpBig');
  main.classList.add('animated', 'fadeInUpBig');
	};
	//Скрыть окно голосования
	function hideVoting() {
		main.classList.remove('animated', 'fadeInUpBig');
		main.classList.add('animated', 'fadeOutUpBig');
		setTimeout(function() {
			main.classList.remove('show-block');
			main.classList.add('hide');
		}, 1500);
	};

	console.log(president);
	console.log(customViews);
	console.log(mainCards);

});