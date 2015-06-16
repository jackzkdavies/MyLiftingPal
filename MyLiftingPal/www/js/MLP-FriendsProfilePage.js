//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatortoise.com
function init_friends_profile(f_id){
	friendsInfo = mlpObject.getUsers({id:f_id}).result;
	yourFriends = friendsInfo['data']['acceptedfriends'];
	userProfilePhoto = friendsInfo['data']['dp'];
	friendsusername = friendsInfo['data']['username'];
	friendsId = f_id;
	weight = friendsInfo['data'][7];
	gender = friendsInfo['data'][8];
	age = friendsInfo['data'][9];
	about = friendsInfo['data'][11];
	why = friendsInfo['data'][12];
	goals = friendsInfo['data'][13];
	stats = friendsInfo['data']['stats'];
	units = friendsInfo['data']['units'];
}

function friendsprofile_displayUser(){
	$('#friendsName').empty();
	$('#friendsName').append(friendsusername+"'s Profile");

	var dp = '<img class="firindsprofilePicture" src='+userProfilePhoto+' alt="">';
	document.getElementById('friendsprofilepicture').innerHTML=dp;
	document.getElementById('friendsusername').innerHTML='<h3>'+friendsusername+'</h3>';
	document.getElementById('friendsdetails').innerHTML=weight+units+'&nbsp;•&nbsp;' + gender+'&nbsp;•&nbsp;' +age+'&nbsp;years old';
	document.getElementById('friendsaboutMe').innerHTML=about;
	document.getElementById('friendswhy').innerHTML="<h5>Why I Lift</h5>"+why;
	document.getElementById('friendsgoals').innerHTML="<h5>My Lifting Goals</h5>"+goals;    
	friendsdisplayMaxes();

}

function friendsdisplayMaxes(){
	$("#friendsmaxes").empty();
	for(lifts in stats){
		var liftName = stats[lifts]['name'];
		var liftWeight = stats[lifts]['onerm'];
		var type = stats[lifts]['type'];
		$("#friendsmaxes").append(liftName+': '+liftWeight+units+' ('+type+')<br>');
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
	divtoshow('#friendsdiary');
	friend_checkResults(friendsId);
}


