  function logingp() {
    window.plugins.googleplus.login(
        {
          'iOSApiKey': '6535513912-uvpf249ak7avodois85tkjmh2lc2j952.apps.googleusercontent.com'
        },
        function (obj) {
          var data = {"id":obj.userId, "name":obj.displayName, "email":obj.email};
        if (mlpObject.loginGp(data).result["success"] === true){
            try{
                window.localStorage.setItem("un", data.name);
                window.localStorage.setItem("pw", data.id);
                var user = mlpObject.getUser().result;
                var userid = user['data']['id'];
                var displayUnits  = user['data']['units'];
                var notifications = user['data']['requests'];
                window.location.replace("PlusStrength.html");
                }
                catch(e){
                    console.log("Error creating local storage vaiables in 'submitLoginForm'"+e)
                }   
        };

        if(mlpObject.result["success"] === false){            
            errormsg = 'errorLoggingInToGooglePlus';
            if (mlpObject.result["errormsg"] === "Incorrect password ."){
                errormsg = 'incorrectPassword';
            }
            else if (mlpObject.result["errormsg"].indexOf('You are already logged in as') > -1){
                    window.location.replace("PlusStrength.html");
            }

            message = document.getElementById(errormsg);
            message.innerHTML = mlpObject.result["errormsg"];
        }		  
		  
		  
		  
        },
        function (msg) {
          alert("error: " + msg);
        }
    );
  }
  
 var loginfb = function () {
	if (!window.cordova) {
		var appId = prompt("Enter FB Application ID", "");
		facebookConnectPlugin.browserInit(appId);
	}
	facebookConnectPlugin.login( ["email"],
		function (response) { 
			
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            facebookConnectPlugin.api(user_id + '/?fields=id,email,name', ["email"], function(profile) {
		
				var data = {"id":profile.id, "name":profile.name, "email":profile.email};

				if (mlpObject.loginFb(data).result["success"] === true){

					try{
						window.localStorage.setItem("un", data.name);
						window.localStorage.setItem("pw", data.id);
						var user = mlpObject.getUser().result;
						var userid = user['data']['id'];
						var displayUnits  = user['data']['units'];
						var notifications = user['data']['requests'];
						window.location.replace("PlusStrength.html");
						}
						catch(e){
							console.log("Error creating local storage vaiables in 'submitLoginForm'"+e)
						}   
				}
				
				if(mlpObject.result["success"] === false){            
					errormsg = 'errorLoggingInToFacebook';
					if (mlpObject.result["errormsg"] === "Incorrect password ."){
						errormsg = 'incorrectPassword';
					}
					else if (mlpObject.result["errormsg"].indexOf('You are already logged in as') > -1){
							window.location.replace("PlusStrength.html");
					}

					message = document.getElementById(errormsg);
					message.innerHTML = mlpObject.result["errormsg"];
				}					
			
			},
			function (response) { alert(JSON.stringify(response)) });
		
		});
} 