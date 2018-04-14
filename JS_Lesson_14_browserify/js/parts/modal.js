function modal() {
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
};
module.exports = modal;