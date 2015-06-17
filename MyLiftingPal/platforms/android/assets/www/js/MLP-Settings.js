
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



function changePassword(){
    document.getElementById('newPwMessage').innerHTML='';
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#changePasswordModal').modal(options);
}

function updatePassword(){
    var oldPw  = document.getElementById("oldPw").value;
    var newPw1  = document.getElementById("newPw1").value;
    var newPw2  = document.getElementById("newPw2").value;
    
    if (newPw1 === newPw2){
        var message = mlpObject.updateUser({id:id, password:newPw1, oldpassword: oldPw}).result;
        console.log(message);
        if (message['success']==false){document.getElementById('newPwMessage').innerHTML=message['errormsg'];}
        else if ((message['success']==true)){
			window.localStorage.setItem("pw", JSON.stringify(newPw1));
            document.getElementById('newPwMessage').innerHTML='Password Updated';
                
                setTimeout(function(){
                $("#changePasswordModal").modal('hide');
                    document.getElementById("oldPw").value='';
                    document.getElementById("newPw1").value='';
                    document.getElementById("newPw2").value='';
                }, 2000);
        }
        
        
    }
    else{
        document.getElementById('newPwMessage').innerHTML="New Passwords do not match.";
    }
}

function changeEmail(){
    document.getElementById('newEmailMessage').innerHTML='';
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#changeEmailModal').modal(options);
}

function updateEmail(){
    var password  = document.getElementById("emailPassword").value;
    var newEmail1  = document.getElementById("newEmail1").value;
    var newEmail2  = document.getElementById("newEmail2").value;
    
    if (newEmail1 === newEmail2){
        if(validateEmail(newEmail1) !== true){
            document.getElementById('newEmailMessage').innerHTML='Email Address Not Valid';
            return;
        }
        var message = mlpObject.updateUser({id:id, password:password, email:newEmail1}).result;
        console.log(message);
        if (message['success']==false){document.getElementById('newEmailMessage').innerHTML=message['errormsg']+'<br>Email already in use.';}
        else if ((message['success']==true)){
            document.getElementById('newEmailMessage').innerHTML='Email Updated';
                
                setTimeout(function(){
                $("#changeEmailModal").modal('hide');
                    document.getElementById("emailPassword").value='';
                    document.getElementById("newEmail1").value='';
                    document.getElementById("newEmail2").value='';
                }, 2000);
        }
        
        
    }
    else{
        document.getElementById('newEmailMessage').innerHTML="New Emails do not match.";
    }
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function changeEmailPref(){
    document.getElementById('newEmailPrefMessage').innerHTML='';
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#changeEmailPrefModal').modal(options);
}
function updateEmailPref(){
    var emailPref = document.getElementById("emailPref").value;
    var pref = mlpObject.updateSettings({userid:id,emailpreferences:emailPref}).result;
    var success = pref['success'];
    if (success == true){document.getElementById('newEmailPrefMessage').innerHTML="Updated Successfully";}
    else{document.getElementById('newEmailPrefMessage').innerHTML="Updated Failed<br>"+pref['errormsg'];}
    
    setTimeout(function(){
    $("#changeEmailPrefModal").modal('hide');

    }, 2000);
    
}

function changeUnitPref(){
    document.getElementById('newUnitPrefMessage').innerHTML='';
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#changeUnitPrefModal').modal(options);
}
function updateUnitPref(){
    var unitPref = document.getElementById("unitPref").value;
    var pref = mlpObject.updateSettings({userid:id,units:unitPref}).result;
    var success = pref['success'];
    if (success == true){document.getElementById('newUnitPrefMessage').innerHTML="Updated Successfully";
	displayUnits = unitPref;
	checkResults();	}
    else{document.getElementById('newUnitPrefMessage').innerHTML="Updated Failed<br>"+pref['errormsg'];}
    
    setTimeout(function(){
    $("#changeUnitPrefModal").modal('hide');

    }, 2000);
    
}

