const olarkStatus = () =>{
	setTimeout(() =>{
		let chat 	= document.getElementById('chat-status'),
			offline = document.getElementById('habla_offline_message_span');
			
		if(document.contains(offline)){
			chat.innerHTML = '<span class="button__plain button__plain--red">Olark Offline</span>'
		}else{
			chat.innerHTML = '<span class="button__plain button__plain--green">Olark Online</span>'
		}

	} , 2000);	
}