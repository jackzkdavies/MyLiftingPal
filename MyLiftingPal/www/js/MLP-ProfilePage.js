//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatortoise.com

function init_profile_data(){
	 userProfilePhoto = user['data']['dp'].replace(/"/g, "");

	 userEmail = user['data']['email'];

	 username = user['data']['username'];

	 id = user['data']['id'];

	 dateCreated = user['data']['created'];

	 userInfo = mlpObject.getUsers({id:id}).result;

	 weight = userInfo['data'][7];

	 gender = userInfo['data'][8];

	 age = userInfo['data'][9];

	 about = userInfo['data'][11];

	 why = userInfo['data'][12];

	 goals = userInfo['data'][13];

	 friends = userInfo['data']['acceptedfriends'];

	 stats = userInfo['data']['stats'];

	 units = userInfo['data']['units'];
	displayUser();
}

function displayUser(){

	var dp = '<img class="profilePicture" src="'+userProfilePhoto+'" alt="">';
	document.getElementById('profilepicture').innerHTML=dp;
	document.getElementById('username').innerHTML='<h3>'+username+'</h3>';
	document.getElementById('details').innerHTML=weight+units+'&nbsp;•&nbsp;' + gender+'&nbsp;•&nbsp;' +age+'&nbsp;years old';
	document.getElementById('aboutMe').innerHTML=about;
	document.getElementById('why').innerHTML="<h5>Why I Lift</h5>"+why;
	document.getElementById('goals').innerHTML="<h5>My Lifting Goals</h5>"+goals;    
    displayMaxes();
    displayFriends();
}

function displayMaxes(){
	document.getElementById('maxes').innerHTML="<h5>Max Lifts</h5>";
    for(lifts in stats){
        var liftName = stats[lifts]['name'];
        var liftWeight = stats[lifts]['onerm'];
        var type = stats[lifts]['type'];
       $("#maxes").append(liftName+': '+liftWeight+units+' ('+type+')<br>');
    }
}

function displayFriends(){
	$("#friends").empty();	   
    for (friend in friends){
        var f ='';
        f += '<div style="" onclick="viewFriend('+friends[friend]['0']+')"> <img class="friendsProfilePicture" src='+friends[friend]['dp']+' alt=""><br>'+
               friends[friend][1]+'</div>';
        $("#friends").append(f);
    }
} 


function viewFriend(id){
	init_friends_profile(id);
	friendsprofile_displayUser();
	friend_checkIfFriends(id);
}
function profileEditModal(){
	$(document).ready(function() {
		$('#edit-profile-gender').val(gender);
		$('#ageUpdate').val(age);
		$('#weightUpdate').val(weight);
	});
	document.getElementById('aboutUpdate').innerHTML=about;
	document.getElementById('whyUpdate').innerHTML=why;
	document.getElementById('goalsUpdate').innerHTML=goals;

    var options = {
        "backdrop" : "true",
        "show":"true"};
    $('#updateProfileModal').modal(options);
}

function submitProfileUpate(){
	loadingModal("Updating Profile...");
	 try{
		console.log(mlpObject.updateProfile({userid:id, weight:$('#weightUpdate').val(),gender:$('#edit-profile-gender').val(),age:$('#ageUpdate').val(),about:document.getElementById('aboutUpdate').innerHTML,why:document.getElementById('whyUpdate').innerHTML,goals:document.getElementById('goalsUpdate').innerHTML}).result);
		user = mlpObject.getUser().result;
		init_profile_data();
	}
	catch(e){console.log(e)}
}

init_profile_data();
