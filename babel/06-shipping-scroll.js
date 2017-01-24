const activeSection = (element, anchor, activeClass) =>{
	let section = document.querySelectorAll(element),
		link 	= document.querySelectorAll(anchor);

		for(let i = 0; i < section.length; i++){
			if(inView(element, i) && section[i].getBoundingClientRect().top < parseInt(section[i].getAttribute('data-scrollThreshold'))){
				link[i].classList.add(activeClass);
			}else{
				link[i].classList.remove(activeClass);
			}
		}
}