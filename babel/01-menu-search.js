const submitSearch = () => {
    let searchBtn       = document.querySelector('#search input[type="submit"]'),
        input           = document.querySelector('#search input[type="text"]'),
        newResults      = document.getElementById('search-results'),
        searchTimer;

    searchBtn.addEventListener('click', (event)=>{
        event.preventDefault();
        if(input.value != '' && input.value != null && input.value.length != 0){
            newResults.style.padding = "10px 0px";
            search(input.value);
        }else{
            input.setAttribute('placeholder', 'You must enter something...');
        }
    });

    input.addEventListener('keyup', ()=>{
        console.log(input.value.length);
        if(input.value != '' && input.value != null && input.value.length != 0){
            searchBtn.classList.add('button__plain--dk-gray-active');
        }else{
            searchBtn.classList.remove('button__plain--dk-gray-active');
        }
    });
}
//search/node/hats
const search = (data) => {
    let xmlhttp         = new XMLHttpRequest(),
        newResults      = document.getElementById('search-results');

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                let parser = new DOMParser(),
                    doc = parser.parseFromString(xmlhttp.responseText, "text/html"),
                    results = doc.getElementById('search-container').childNodes,
                    main = document.querySelectorAll('main')[0];
                newResults.innerHTML = "";
                for (var i = 0; i < results.length; i++) {
                    if (results[i].tagName === "FIELDSET" || results[i].tagName === "H2" || results[i].tagName === "UL") {
                        newResults.appendChild(results[i]);
                    }
                }


            } else {
                let title = "C3 Shop",
                    bodyText = "Oops! Something went wrong. Please refresh the page.",
                    iconImage = Drupal.settings.basePath + "sites/all/themes/c3Shop/images/c3-logo.png";

                notify(title, bodyText, iconImage);
            }
        }
    };

    xmlhttp.open("GET", Drupal.settings.basePath + 'search/node/' + data, true);
    xmlhttp.send();
}