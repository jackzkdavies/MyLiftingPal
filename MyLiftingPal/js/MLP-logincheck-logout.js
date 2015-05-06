//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com

//Code section for checking login state
function checkLoginStatus(){
    var locationTest = [(window.location.pathname).toLocaleString(), "/index.html"];
    if (user['success'] == true){
        if(locationTest[0].indexOf('index') > -1){
            window.location.replace("main-page.html"); 
        }
    }
    else{
        if(locationTest[0].indexOf('index') <= -1 ){
            window.location.replace("index.html");
        }
    }
}

function logout(){
    mlpObject.logout();
    localStorage.clear();
    window.location.replace("index.html");
}

