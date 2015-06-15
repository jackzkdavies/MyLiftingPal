//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatortoise.com
function init_friends_profile(f_id){
	 friendsInfo = mlpObject.getUsers({id:f_id}).result;
	 yourFriends = friendsInfo['data']['acceptedfriends'];
	 userProfilePhoto = friendsInfo['data']['dp'];
	 userEmail = friendsInfo['data']['email'];
	 username = friendsInfo['data']['username'];
	 id = friendsInfo['data'][0];
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
	$('#friendsName').append(username+"'s Profile");
	var dp = '<img class="firindsprofilePicture" src='+userProfilePhoto+' alt="">';
	$("#friendsprofilepicture").append(dp);
	$("#friendsusername").append(username);
	$("#friendsdetails").append(weight+units+'&nbsp;•&nbsp;' + gender+'&nbsp;•&nbsp;' +age+'&nbsp;years old');
	$("#friendsaboutMe").append(about);
	$("#friendswhy").append(why);
	$("#friendsgoals").append(goals);
	friendsdisplayMaxes();
}

function friendsdisplayMaxes(){
	for(lifts in stats){
		var liftName = stats[lifts]['name'];
		var liftWeight = stats[lifts]['onerm'];
		var type = stats[lifts]['type'];
		$("#friendsmaxes").append(liftName+': '+liftWeight+units+' ('+type+')<br>');
	}
}

function friend_checkIfFriends(id){
	$('#friendStatus').empty();
	$('#friendStatus').append("<h5 class='goodText' onclick='console.log(mlpObject.addFriend({friendid:"+id+"}).result);history.go(0)'>Add Friend</h5>");
	
	for (f in yourFriends){
		if (yourFriends[f]['username'] == username){
			$('#friendStatus').empty();
			$('#friendStatus').append("<h5 class='badText' onclick='console.log(mlpObject.removeFriend({friendid:"+id+"}).result);history.go(0)'>Remove Friend</h5>");
		}
	}
}


