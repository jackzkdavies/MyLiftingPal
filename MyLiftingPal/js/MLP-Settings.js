//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

var user = mlpObject.getUser().result;

var userProfilePhoto = user['data']['dp'];

var userEmail = user['data']['email'];

var username = user['data']['username'];

var id = user['data']['id'];

var dateCreated = user['data']['created'];

var userInfo = mlpObject.getUsers({id:id}).result;

var weight = userInfo['data'][7];

var gender = userInfo['data'][8];

var age = userInfo['data'][9];

var about = userInfo['data'][11];

var why = userInfo['data'][12];

var goals = userInfo['data'][13];

var friends = userInfo['data']['acceptedfriends'];

var stats = userInfo['data']['stats'];

var units = userInfo['data']['units'];

//var weight = unserInfo[];

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

function changePassword(){
    console.log('test');
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#changePassworkModal').modal(options);
}

