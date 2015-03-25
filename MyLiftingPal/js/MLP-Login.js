//
//      Author Jack Davies MyLiftingPal 2014-2015©
//      jack.z.k.davies@gmail.com
//

//Create MLP object
try{
    var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
}

catch(e){
    //CREATE CODE FOR HANDLING ERROR CREATING OBJECT
}


//Set DisplayUnits
try{
    window.localStorage.setItem("displayUnits", mlpObject.getUser().result['data']['units']);
}

catch(e){}

try{
    window.localStorage.setItem("toggleSpeed", '0');
}

catch(e){}


//Code Section for Loging in
function submitLoginForm(){
    var lUsername; 
    var lPassword;
    var errormsg;
    var message;
    
    document.getElementById('usernameNotFound').innerHTML="";
    document.getElementById('incorrectPassword').innerHTML="";
    
    try{
        lUsername = document.getElementById("signInUsername").value; 
        lPassword = document.getElementById("signInPassword").value;
        //username, password
        if (mlpObject.login({username:lUsername,password:lPassword}).result["success"] === true){
            console.log('Logged In');
            window.location.replace("main-page.html");
        };
        if(mlpObject.result["success"] === false){            
            errormsg = 'usernameNotFound';
            if (mlpObject.result["errormsg"]=== "Password incorrect."){
                errormsg = 'incorrectPassword';
            }
			else if (mlpObject.result["errormsg"].indexOf('You are already logged in as') > -1){
				window.location.replace("main-page.html");
			}
            message = document.getElementById(errormsg);
            message.innerHTML = mlpObject.result["errormsg"];
        }
    }
    catch(e){
        console.log(e);
        console.log("username: " + lUsername, "password: " + lPassword);
    }
    finally{
        lUsername = null; 
        lPassword = null;
        errormsg = null;
        message = null;
    }
}

//Code section for signing up 'in app'
function submitSignUpForm(){ 

    var sEmail;
    var sUsername; 
    var sPassword;
    var sConfirmPassword;
    
    try {
        sEmail = document.getElementById("email").value; 
        sUsername = document.getElementById("username").value; 
        sPassword = document.getElementById("password").value;
        sConfirmPassword = document.getElementById('passwordconfirm').value;
        
        if ((sPassword === sConfirmPassword) && (validateEmail(sEmail) === true)){ 
            //email,username,password
            if (mlpObject.createUser({email:sEmail,username:sUsername,password:sPassword}).result['success']===true){
                try{
                    mlpObject.login({username: sUsername, password:sPassword});
                    document.getElementById('whiteBackground').style.display="none";
                    document.getElementById('successSignUp').style.display="block";
                    setTimeout(function () {window.location.replace("main-page.html");}, 2000);

                }

                catch(e){
                    console.log(e);
                }
            };
            if(mlpObject.result['success']===false){
                document.getElementById("invalidemailresponse").innerHTML = mlpObject.result['errormsg'];
                
            }
//            checkIfUserCreated(sUsername,sPassword);
        }
        else{
            var message = document.getElementById('invalidpasswordmatch');
            var badColor = "#ff6666";
            passwordconfirm.style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "Passwords Do Not Match"; 
            throw "Email or Password falid check";
        }
    }
    
    catch (e){
        console.log(e);
    }
    
    finally{
        sEmail = null; 
        sUsername = null; 
        sPassword = null;
        sConfirmPassword = null;
    }
}


//Code section for checking login state
function checkLoginStatus(){
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

//Code Section for Toggling between signup/login forms
function toggleForms(){
    if (document.getElementById("signupdiv").style.display !== "block"){
        document.getElementById("signupdiv").style.display="block";
        document.getElementById("signindiv").style.display="none";
    }
    else{
        document.getElementById("signupdiv").style.display="none";
        document.getElementById("signindiv").style.display="block";
    }
    
}

function checkEmailaddress(){
    var sEmail = document.getElementById("email").value;
    if (validateEmail(sEmail) === false){document.getElementById("invalidemailresponse").innerHTML = "Invalid Email Address";}
    else{document.getElementById("invalidemailresponse").innerHTML = " ";} 
}
//Client side email regex, make sure is also checked server side!
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 