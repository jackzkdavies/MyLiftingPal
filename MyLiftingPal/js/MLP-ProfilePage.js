//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

var user = mlpObject.getUser().result;

var userProfilePhoto = mlpObject.getUser().result['data']['dp'];

var userEmail = mlpObject.getUser().result['data']['email'];

var username = mlpObject.getUser().result['data']['username'];

var dateCreated = mlpObject.getUser().result['data']['created'];

var userID = mlpObject.getUser().result['data']['id'];

var userData = mlpObject.getUsers({id:userID});
function checkLoginStatus(){
//    if ($.cookie("mlpsession") === undefined){
//        window.location.replace("index.html");
//    }

var userData = mlpObject.getUser().result;
        var locationTest = [(window.location.pathname).toLocaleString(), "/index.html"];
        if (userData["success"] === true){

                if(locationTest[0].indexOf('index') > -1){
                    window.location.replace("main-page.html"); 
                }
                        
            }
        else if (userData['errormsg'].indexOf('You are already logged in as') > -1){
                    window.location.replace("main-page.html");
                }
        else{

                if(locationTest[0].indexOf('index') < -1 )
                    window.location.replace("index.html");
                
            }
}

function logout(){
    mlpObject.logout();
    window.location.replace("index.html");
}

function signOut(){
    try{
        if (mlpObject.logout().result["success"] === true){
        window.location.replace("index.html");       }
    }
    catch(e){
        console.log(e);
    }
    
}



function displayProfilePicture(){
    var dp = '<img class="profilePicture" src="'+userProfilePhoto+'" alt="">';
    $("#profilePicture").append(dp);
}
displayProfilePicture();

