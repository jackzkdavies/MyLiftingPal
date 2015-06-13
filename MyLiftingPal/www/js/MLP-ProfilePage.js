//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatortoise.com
var userProfilePhoto = user['data']['dp'].replace(/"/g, "");

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

window.localStorage.setItem("lastFriendView", null);
//var weight = unserInfo[];
displayUser();
function displayUser(){
	var dp = '<img class="profilePicture" src="'+userProfilePhoto+'" alt="">';
	$("#profilePicture").append(dp);
    $("#username").append('<h3>'+username+'</h3>');
    $("#weight").append(weight+units+'&nbsp;&#x2022;&nbsp;');
    $("#gender").append(gender+'&nbsp;&#x2022;&nbsp;');
    $("#age").append(age+'&nbsp;years strong');
    
    document.getElementById('aboutMe').innerHTML='<h6 style="">About '+username+'</h6><p>'+about+'</p>';
    
    document.getElementById('why').innerHTML='<h6 style="">Why I lift</h6><p>'+why+'</p>';
    
    document.getElementById('goals').innerHTML='<h6 style="">My Goals</h6><p>'+goals+'</p>';
    
    displayMaxes();
    
    displayFriends();
}

function displayMaxes(){
    for(lifts in stats){
        var liftName = stats[lifts]['name'];
        var liftWeight = stats[lifts]['onerm'];
        var type = stats[lifts]['type'];
        $("#maxes").append('<h4>'+liftName+': '+liftWeight+units+' ('+type+')</h4>');
    }
}

function displayFriends(){
    for (friend in friends){
        var f ='';
        f += '<div style="float:left" onclick="viewFriend('+friends[friend]['0']+')"> <img class="friendsProfilePicture" src='+friends[friend]['dp']+' alt=""><br>'+
               friends[friend][1]+'</div>';
       console.log(f);
        $("#friends").append(f);

    }
    console.log(friends);
} 


function viewFriend(id){
    window.localStorage.setItem("lastFriendView", id);
    console.log(window.localStorage.getItem("lastFriendView"));
    window.location.replace("friendsProfile.html");
}
function profileEditModal(){
    var options = {
        "backdrop" : "true",
        "show":"true"};
    $('#updateProfileModal').modal(options);
}