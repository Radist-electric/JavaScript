window.addEventListener('DOMContentLoaded', function() {
	let overlay = document.getElementsByClassName('overlay')[0],
					modal = overlay.getElementsByClassName('popup')[0],
					modalBtn = document.getElementById('popup-btn'),
					main = document.getElementsByClassName('main')[0],
					custom = document.getElementsByClassName('custom')[0];


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
	});



});