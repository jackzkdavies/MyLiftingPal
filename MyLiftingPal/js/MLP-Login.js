
try{
    var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
    window.localStorage.setItem("mlp", JSON.stringify(mlpObject));
}

catch(e){
    alert(e+' :Could not create connection with server. Ending Sesson');
    throw new Error();       
}

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
            try{
                var user = mlpObject.getUser().result;
                window.localStorage.setItem("user", JSON.stringify(user));

                var notifications = user['data']['requests'];
                window.localStorage.setItem("notifications", JSON.stringify(notifications));

                var displayUnits  = user['data']['units'];
                window.localStorage.setItem("displayUnits", JSON.stringify(displayUnits));

                window.location.replace("main-page.html");
                }
                catch(e){
                    console.log("Error creating local storage vaiables in 'submitLoginForm'"+e)
                }   
        };

        if(mlpObject.result["success"] === false){            
            errormsg = 'usernameNotFound';
            if (mlpObject.result["errormsg"] === "Password incorrect."){
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
        console.log('Error Loging in:' +e);
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
            if (mlpObject.createUser({email:sEmail,username:sUsername,password:sPassword}).result['success']===true){
                try{
                    mlpObject.login({username: sUsername, password:sPassword});
                    document.getElementById('whiteBackground').style.display="none";
                    document.getElementById('successSignUp').style.display="block";
                    setTimeout(function () {
                        window.location.replace("main-page.html");
                    }, 2000);

                }

                catch(e){
                    console.log("Error signing in with new account:" + e);
                }
            };
            if(mlpObject.result['success']===false){
                document.getElementById("invalidemailresponse").innerHTML = mlpObject.result['errormsg'];

            }
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

function checkLoginStatus(){
    var user = JSON.parse(localStorage.getItem('user'));

    var locationTest = [(window.location.pathname).toLocaleString(), "/index.html"];

    if (typeof user != undefined){
        if(locationTest[0].indexOf('index') > -1){
            window.location.replace("main-page.html"); 
        }
    }
    else{

        if(locationTest[0].indexOf('index') < -1 ){
            window.location.replace("index.html");
        }
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
//Used in index page.
function checkEmailaddress(){
    var sEmail = document.getElementById("email").value;
    if (validateEmail(sEmail) === false){document.getElementById("invalidemailresponse").innerHTML = "Invalid Email Address";}
    else{document.getElementById("invalidemailresponse").innerHTML = " ";} 
}
function checkPassword(){
    if(document.getElementById("password").value.length < 6) {
        document.getElementById("invalidpasswordmatch").innerHTML = "Password must contain at least six characters";
        return false;
    }
    else{
        document.getElementById("invalidpasswordmatch").innerHTML = " ";
    }
}
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
