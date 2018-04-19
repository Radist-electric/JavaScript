window.addEventListener('DOMContentLoaded', function() {
	let overlay = document.getElementsByClassName('overlay')[0],
					modal = overlay.getElementsByClassName('popup')[0],
					modalBtn = document.getElementById('popup-btn'),
					main = document.getElementsByClassName('main')[0],
					custom = document.getElementsByClassName('custom')[0],
					customName = document.getElementById('name'),
					customAge = document.getElementById('age'),
					customRadio = custom.getElementsByClassName('radio')[0],
					customSex = document.getElementsByName('sex'),
					customSelect = document.getElementById('select'),
					customViews = customSelect.options[customSelect.selectedIndex].value,
					customBio = document.getElementById('bio'),
					president = {
					fullName: '',
					age: '',
					sex: '',
					views: '',
					biography: ''
					};


	//Действия с модальным окном
	modal.classList.add('animated', 'bounceInUp');

	modalBtn.addEventListener('click', function() {
		overlay.classList.add('animated', 'fadeOut');
		modal.classList.remove('bounceInUp');
		modal.classList.add('bounceOutUp');
		main.style.display = "none";
		custom.classList.add('show-flex');
		for (let i = 0; i < custom.children.length; i++) {
				custom.children[i].classList.add('show-block');
		};
		setTimeout(function() {overlay.style.display = "none"}, 1000);
	});

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

	//При запуск страницы задаём пол по умолчанию
 for (let i = 0; i < customSex.length; i++) {
     if (customSex[i].type == "radio" && customSex[i].checked) {
         president.sex = customSex[i].value;
     }
 }
 //Меняем пол
	customRadio.addEventListener('click', function(event) {
		if (event.target && event.target.type == 'radio' && event.target.checked) {
			president.sex = event.target.value;
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



	console.log(president);
	console.log(customViews);
});