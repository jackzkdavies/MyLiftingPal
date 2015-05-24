//Facebook

window.fbAsyncInit = function() {
    FB.init({
    appId      : '1538067003114411',
    cookie     : true,                       
    xfbml      : true, 
    version    : 'v2.1'
    });
  };
  
function loginToFB(){
	facebookConnectPlugin.login(["public_profile"]),
	function() {alert("hey");},
	function() {alert("error")}
	

}
  
  
  
function fb_login(){
    FB.login(function(response) {
        if ($.cookie('mlpsession') !== undefined){
		$(".main-login-content").hide();
		$(".main-logout-content").show();
                return;
        }
        if (response.authResponse) {
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {
                mlpObject.loginFb(response); 
                document.location.href="index.html";
            });

        } else {
            //user hit cancel button
            //console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'email'
    });
}

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//Google plus 

var runCount = 0;
function signinCallback(authResult) {
    if (runCount < 1){runCount +=1 ;return;}
    
    
        if ($.cookie('mlpsession') !== undefined){
		$(".main-login-content").hide();
		$(".main-logout-content").show();
                return;
        }
        
    if (authResult['status']['signed_in']) {
        var accessToken = authResult['access_token']
        $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken, function(data) {
                mlpObject.loginGp(data);  
                document.location.href="index.html";
        });

    } else {
        //console.log('User cancelled login or did not fully authorize.');
    }
    


}




