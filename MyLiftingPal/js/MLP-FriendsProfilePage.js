//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

//User data
var user = mlpObject.getUser().result;
var notifications = user['data']['requests'];
var displayUnits  = user['data']['units'];

//Global Friend Variables 
var userInfo = mlpObject.getUsers({id:window.localStorage.getItem("lastFriendView")}).result;

var userProfilePhoto = userInfo['data']['dp'];

var userEmail = userInfo['data']['email'];

var username = userInfo['data']['username'];

var id = userInfo['data']['id'];

//var dateCreated = userInfo['data']['created'];

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

//code for nav
$(window).scroll(function() {
  if ($(document).scrollTop() > 100) {
    $('#logoHeader').css({"margin-top":"-50px"});;
  } else {
    $('#logoHeader').css({"margin-top":"0px"});;
  }
});
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

function displayUser(){
    $('#friendsName').empty();
$('#friendsName').append(username+'s Profile');
    var dp = '<img class="profilePicture" src='+userProfilePhoto+' alt="">';
    $("#profilePicture").append(dp);
    console.log(dp);
    $("#username").append('<h3>'+username+'</h3>');
    
    $("#userEmail").append(userEmail);
    
    $("#weight").append(weight+units+'&nbsp;');
    $("#gender").append(gender+',&nbsp;');
    $("#age").append(age+'&nbsp;years old');
    
    $("#aboutMe").append(about);
    $("#why").append(why);
    $("#goals").append(goals);
    displayMaxes();

}

function displayMaxes(){
    for(lifts in stats){
        var liftName = stats[lifts]['name'];
        var liftWeight = stats[lifts]['onerm'];
        var type = stats[lifts]['type'];
        $("#maxes").append(liftName+': '+liftWeight+units+' ('+type+')<br>');
    }
}

function displayFriends(){
    for (friend in friends){
        var f ='';
        f += '<div> <img class="friendsProfilePicture" src='+friends[friend]['dp']+' alt=""><br>'+
               friends[friend][1]+'</div>';
        $("#friends").append(f);

    }
//    console.log(friends);
} 

function viewFriendsDiary(){
    window.location.replace("friendsMain-page.html");
}


function checkNotifications(){
    var numberNotifications= notifications.length;
    if (notifications != null){
        for (request in notifications){
            console.log(notifications);

            if(numberNotifications > 99){
                $('#numNot').append('99+');
            }
            else{
                $('#numNot').append(numberNotifications);
            }
            
            $('#inboxNotifications').append("Friend Request from: <h5 onclick='viewFriend("+notifications[request]['userid']+")'>"+notifications[request]['username']+"</h5>");
        }
    }
}

