//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

//Toggling ful view of exercises with
function slideToggle(number){
    $(".tabsdiv"+number).slideToggle(400);
}

function toggleTest(){
    slideToggle(1);
    slideToggle(2);
    slideToggle(3);
}
//////////////////////////////////
//document.forms["signup"].submit();

function submitSignUpForm()
{ 
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
            mlpObject.createuser(sEmail,sUsername,sPassword);
            submitLoginForm();
        }
        else{ throw "Email or Password falid check";
        }
    }
    
    catch (e){
        console.log(e,"email: " + sEmail, "username: " + sUsername, "password: " + sPassword);
    }
    
    finally{
        sEmail = null; 
        sUsername = null; 
        sPassword = null;
        sConfirmPassword = null;
    }
}

function submitLoginForm(){
    var lUsername; 
    var lPassword;
    
    try{
        lUsername = document.getElementById("username").value; 
        lPassword = document.getElementById("password").value;
        mlpObject.login(lUsername,lPassword);
    }
    catch(e){
        console.log(e,"username: " + lUsername, "password: " + lPassword);
    }
    finally{
        lUsername = null; 
        lPassword = null; 
    }
}

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
    else{document.getElementById("invalidemailresponse").innerHTML = "";} 
}
//Client side email regex, make sure is also checked server side!
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function checkPassword()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('password').value;
    var pass2 = document.getElementById('passwordconfirm').value;
    //Store the Confimation Message Object ...
    var message = document.getElementById('invalidpasswordmatch');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1 === pass2){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        passwordconfirm.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!";
    }
    else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        passwordconfirm.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match";
    }
} 