const new_user_form = document.getElementById('new-user-form'),
	existing_user_form = document.getElementById('existing-user-form'),
	select = document.getElementById('new-user-registred-user-btn');

const new_user_existing_user_form_state = function(){
	
	if(select.value === 'existing_user'){
		new_user_form.classList.remove('proform-user-option--active')
		existing_user_form.classList.add('proform-user-option--active')
	}else if(select.value === 'new_user'){
		existing_user_form.classList.remove('proform-user-option--active')
		new_user_form.classList.add('proform-user-option--active')
	}else{
		existing_user_form.classList.remove('proform-user-option--active')
		new_user_form.classList.add('proform-user-option--active')
	}

}

const new_user_existing_user_form_update = function(){
	select.addEventListener('change', function(event){
		new_user_existing_user_form_state();
	});
}