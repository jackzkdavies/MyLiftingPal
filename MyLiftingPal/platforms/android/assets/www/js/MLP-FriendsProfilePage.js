//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatortoise.com
function init_friends_profile(f_id){
	friendsInfo = mlpObject.getUsers({id:f_id}).result;
	yourFriends = friendsInfo['data']['acceptedfriends'];
	userProfilePhoto = friendsInfo['data']['dp'];
	friendsusername = friendsInfo['data']['username'];
	friendsId = f_id;
	friendsWeight = friendsInfo['data'][7];
	friendsGender = friendsInfo['data'][8];
	friendsAge = friendsInfo['data'][9];
	friendsAbout = friendsInfo['data'][11];
	friendsWhy = friendsInfo['data'][12];
	friendsGoals = friendsInfo['data'][13];
	friendsStats = friendsInfo['data']['stats'];
	friends_units = friendsInfo['data']['units'];
}

function friendsprofile_displayUser(){
	divtoshow('#friendsprofile',friendsusername);
	$('#friendsName').empty();
	$('#friendsName').append(friendsusername+"'s Profile");

	var dp = '<img class="firindsprofilePicture" src='+userProfilePhoto+' alt="">';
	document.getElementById('friendsprofilepicture').innerHTML=dp;
	document.getElementById('friendsusername').innerHTML='<h3>'+friendsusername+'</h3>';
	document.getElementById('friendsdetails').innerHTML=friendsWeight+friends_units+'&nbsp;•&nbsp;' + friendsGender+'&nbsp;•&nbsp;' +friendsAge+'&nbsp;years old';
	document.getElementById('friendsaboutMe').innerHTML=friendsAbout;
	document.getElementById('friendswhy').innerHTML="<h5>Why I Lift</h5>"+friendsWhy;
	document.getElementById('friendsgoals').innerHTML="<h5>My Lifting Goals</h5>"+friendsGoals;    
	friendsdisplayMaxes();

}

function friendsdisplayMaxes(){
	$("#friendsmaxes").empty();
	for(lifts in friendsStats){
		var liftName = friendsStats[lifts]['name'];
		var liftfriendsWeight = friendsStats[lifts]['onerm'];
		var type = friendsStats[lifts]['type'];
		$("#friendsmaxes").append(liftName+': '+liftfriendsWeight+friends_units+' ('+type+')<br>');
	}
}

function friend_checkIfFriends(inputid){
	$('#friendStatus').empty();
	$('#friendStatus').append("<h5 class='goodText' onclick='console.log(mlpObject.addFriend({friendid:"+inputid+"}).result);history.go(0)'>Add Friend</h5>");
	
	for (f in yourFriends){
		if (yourFriends[f]['username'] == friendsusername){
			$('#friendStatus').empty();
			$('#friendStatus').append("<h5 class='badText' onclick='console.log(mlpObject.removeFriend({friendid:"+inputid+"}).result);history.go(0)'>Remove Friend</h5>");
		}
	}
}
function viewFriendsDiary(){
	divtoshow('#friendsdiary',friendsusername);
	friend_checkResults(friendsId);
}


