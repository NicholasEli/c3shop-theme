//check if user is logged in
const loggedIn = () =>{
    if(!mobileDevice()){
        const userStorage = localStorage.getItem('user_status');
        if(user().uid && userStorage != 'loggedIn' ){
            notify('Welcome!', 'You are now logged in', Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png");
            localStorage.setItem('user_status', 'loggedIn');
        }else if(!user().uid){
            localStorage.removeItem('user_status');
        }

        let logoutBtn = document.querySelectorAll('logout-btn');
        for(let i = 0; i < logoutBtn.length; i++){
            (function(i){
                logoutBtn[i].addEventListener('click', () =>{
                    localStorage.removeItem('user_status');
                       
                });
            })(i);
        }    
    }
}
    