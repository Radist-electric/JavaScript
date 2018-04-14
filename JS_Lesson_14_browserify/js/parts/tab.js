function tab() {
		//Tabs
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
};

module.exports = tab;