const closeUserCards = () =>{
	const closeCardBtn 	= document.querySelectorAll('.user-menu__card--close-btn'),
		  userNav     	= document.querySelectorAll('.card-nav'),
		  userCard 	  	= document.querySelectorAll('.user-menu__card');

	const hideAllCards = () => {
		for(let i = 0; i < userCard.length; i++){
			userCard[i].classList.remove('user-menu__card--active');
		}

		for(let i = 0; i < userNav.length; i++){
			userNav[i].classList.remove('header__button--active');
		}
	}

	for(let i = 0; i < closeCardBtn.length; i++){
		(function(i){
			closeCardBtn[i].addEventListener('click', ()=> {
				hideAllCards();
			});
		})(i);
	}
}