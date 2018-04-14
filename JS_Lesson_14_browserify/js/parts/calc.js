function calc() {
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
			total = 0;
			totalValue.innerHTML = total;
			/*totalValue.classList.remove('font');*/
		} else {
				totalValue.innerHTML = total;
				/*totalValue.classList.remove('font');*/
			};
	});

	//При изменении количества дней пересчитываем сумму
	restDays.addEventListener('change', function() {
		daysSum = +this.value;
		total = daysSum*personsSum*ratio*4000;
		if (restDays.value == '') {
			total = 0;
			totalValue.innerHTML = total;
		} else totalValue.innerHTML = total;
	});
	//При наведении на Инпуты общая сумма темнеет
	persons.addEventListener('focus', function() {
		totalValue.classList.add('color-dark');
		totalValue.classList.remove('color-native');
		// totalValue.classList.remove('font-rotate');
	});
		persons.addEventListener('blur', function() {
		totalValue.classList.remove('color-dark');
		totalValue.classList.add('color-native');
		totalValue.classList.add('font-rotate');
		setTimeout(resetRotate, 1000);
	});
	restDays.addEventListener('focus', function() {
		totalValue.classList.add('color-dark');
		totalValue.classList.remove('color-native');
		// totalValue.classList.remove('font-rotate');
	});
		restDays.addEventListener('blur', function() {
		totalValue.classList.remove('color-dark');
		totalValue.classList.add('color-native');
		totalValue.classList.add('font-rotate');
		setTimeout(resetRotate, 1000);
	});

	//При изменении базы меняем коэффициент и пересчитываем сумму
	place.addEventListener('change', function() {
		totalValue.classList.add('font-rotate');
		setTimeout(resetRotate, 1000);
		ratio = this.options[this.selectedIndex].value;
		total = daysSum*personsSum*ratio*4000;
		if (restDays.value == '' || persons.value == '') {
			total = 0;
			totalValue.innerHTML = total;
		} else {
				totalValue.innerHTML = total;
		};
	});
	function resetRotate() {
		totalValue.classList.remove('font-rotate');
	};
};
module.exports = calc;