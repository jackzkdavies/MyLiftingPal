//Date
var d = new Date(); var date = d.getDate(); var day = d.getDay(); var year = d.getFullYear(); var month = d.getMonth();
//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

//Toggling ful view of exercises with
function slideToggle(number){
    $(".tabsdiv"+number).slideToggle(400);
}

function checkLoginStatus(){
    if ($.cookie("mlpsession") === undefined){
        window.location.replace("index.html");
    }
}

function logout(){
    mlpObject.logout();
    window.location.replace("index.html");
}

function slideToggleCalender(){
    $(".calender").slideToggle(400);
    centerCalander();
}

function toggleDropDownArrow(t){
    if (t.classList.contains('w--open')=== true){
        document.getElementById("dropDownArrow").innerHTML = '<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<i class="fa fa-caret-up"></i>';
    }
}


function centerCalander(){
    var t = document.getElementById("sandbox-container");
    t.style.paddingLeft=0;
    var sw= screen.availWidth;
    var tw = $("div.calender table").width();
    var dpw = $("div.datepicker").width();
    if (tw !== 0){
            if(tw===217){
            t.style.paddingLeft= ((sw-tw)/2)-22+'px';
            t.style.backgroundColor="#77b2c9";
        }
        else{
            t.style.paddingLeft= ((sw-tw)/2)-25+'px';
            t.style.backgroundColor="#77b2c9";
        }
    }
    else{
        t.style.paddingLeft= ((sw-dpw)/2)-10+'px';
        t.style.backgroundColor="#77b2c9";
    }
}

function toggleTest(){
    slideToggle(1);
    slideToggle(2);
    slideToggle(3);
    
}

function checkResults(){
    try{
        if (mlpObject.selectResults({assigneddate:year+"-"+(month+1)+"-"+date}).result['success']===false){
            document.getElementById("noResults").innerHTML = "Rest day is it?";};
    }
    catch(e){
        console.log(e);
    }
}
////////// examplemlpObject.login({username: 'myusername', password:'mypassword'}

//check login


//create exercise
function submitCreateExerciseForm(add){
    var addToDay = add;
    var sExerciseName;
    var sExerciseMuscleGroup; 
    var sExerciseType;
    document.getElementById("createSuccess").innerHTML = "";
    
    try {
        sExerciseName = document.getElementById("cExerciseName").value; 
        sExerciseMuscleGroup = document.getElementById("cExerciseMusclegroup").value; 
        sExerciseType = document.getElementById("cExerciseType").value;

        
        if (mlpObject !== null){ 
            //name,musclegroup,type
            mlpObject.createExercise({name:sExerciseName,musclegroup:sExerciseMuscleGroup,type:sExerciseType});
            if(addToDay === 1){
                console.log("need to add code for adding to current day");
            }
            document.getElementById("createSuccess").innerHTML = sExerciseName + " Added Successfully";
        }
        else{ throw "Session is null";
        }
    }
    
    catch (e){
        console.log(e,"sExerciseName: " + sExerciseName, "sExerciseMuscleGroup: " + sExerciseMuscleGroup, "sExerciseType: " + sExerciseType);
    }
    
    finally{
        sExerciseName = null; 
        sExerciseMuscleGroup = null; 
        sExerciseType = null;
    }
}

function submitSearchExcercise(){
    var results=[];
    var searchTerms =['name','musclegroup','type','userid'];
    var searchTerm= document.getElementById("exercisesearch").value.toString();
    try{
    for (st in searchTerms){
        var data = new Array();
        data[searchTerms[st]] = searchTerm;
        var searchResult = mlpObject.getExercises(data).result;
        if (searchResult['success'] === true){
            for ( test in searchResult['data'] ){
                results.push(searchResult['data'][test]);
            };
        
            
        }
    }
    document.getElementById("searchresults").innerHTML = "";
    var toAppend="";
    toAppend += "<tr><td> <br> </td></tr>";
    toAppend += "<tr><td> <h5><u>Search Results:</u> <h5></td></tr>";
    for (obj in results){
        console.log(results[obj]);

        toAppend += "<tr>";
        toAppend += "<td>";
        for (st in searchTerms){
            
   
            if (searchTerms[st] === 'userid'){
                toAppend += "<span style='color:#77b2c9'>Create By: &nbsp;</span>";
                toAppend += mlpObject.getUsers({id:results[obj][searchTerms[st]]}).result['data']['username'];
                toAppend += "<span style='color:#77b2c9'><hr></span>";

            }
            else {
                toAppend += "<span style='color:#77b2c9'>"+searchTerms[st].charAt(0).toUpperCase() + searchTerms[st].slice(1) + ": &nbsp; </span>";
                toAppend += results[obj][searchTerms[st]] +"<br>";
            }
   
        }
        toAppend += "</td>";
        toAppend += "<td style='text-align:center'>"+"<input type='button' class ='dropdownButton' value='Add To' data-dropdown='#dropdown' />" + "</td>";
        toAppend += "</tr>";
        toAppend += "<tr><td><br></td></tr>";
        
    
    }
    $("#searchresults").append(toAppend);
    
  
    
    }
    catch(e){console.log(e);}
    finally{};
    
}
//create Workout
function submitCreateWorkoutForm(){
    var sWorkoutName;
    var addExercises = []; 
    
    try {
        sWorkoutName = document.getElementById("cWorkoutName").value; 
        sExercises = document.getElementById("cAddExerciseToWorkout").value; 


        
        if (mlpObject !== null){ 
            //name
            mlpObject.creatWorkout({name:sWorkoutName});
            if(addExercises !== null){
                console.log("need to add code for adding to workout");
                for (exercise in addExercises){
                    //exerciseid, workoutid,ordering, reps, sets, rpe, weight, percentage
                    try{
                    mlpObject.addexercise({exerciseid:exercise['exerciseid'], workoutid:exercise['workoutid'], ordering:exercise['ordering'], 
                    reps:exercise['reps'], sets:exercise['sets'], rpe:exercise['rpe'],weight:exercise['weight'], percentage:exercise['percentage']});
                    }
                    
                    catch(e){
                        console.log(e);}
                }
            }
        }
        else{ throw "Session is null";
        }
    }
    
    catch (e){
        console.log(e);
    }
    
    finally{
        sWorkoutName = null; 
        sExercises = null; 
    }

}
var globalExerciseObjs; 
function submitSearchExcerciseInWorkout(){
    var searchTerms =['name','musclegroup','type'];
    var searchTerm= (document.getElementById("exercisesearch").value.toString()).trim();
    document.getElementById("searchresults").innerHTML = "";
    document.getElementById("searchResultsHeading").innerHTML="";
    if (searchTerm ===""){
        $("#searchresults").append("Please enter a keyword");
        return;
    }
    globalExerciseObjs={};
    try{  
    for (st in searchTerms){
        var data = new Array();
        data[searchTerms[st]] = searchTerm;
        var searchResult = mlpObject.getExercises(data).result;
        if (searchResult['success'] === true){
            for ( objects in searchResult['data'] ){              
                globalExerciseObjs[searchResult['data'][objects]['id']]=searchResult['data'][objects];
            };
        
            
        }
    }

    
    
    
    var toAppend="";   
    
        for (key in globalExerciseObjs){    
              if (globalExerciseObjs.hasOwnProperty(key)) {
                
                globalExerciseObjs[key]['id']
                
                
        
        toAppend += "<tr onClick='selectedExercise("+globalExerciseObjs[key]['id']+")'>";
        
        for (st in searchTerms){
            toAppend += "<td>";
   
            if (searchTerms[st] === 'userid'){
//                toAppend += mlpObject.getUsers({id:results[obj][searchTerms[st]]}).result['data']['username'];

            }
            else {
                toAppend += globalExerciseObjs[key][searchTerms[st]];
            }
            toAppend += "</td>";
        }
        
        toAppend += "</tr>";

    }}
    
    try{
    $("#mytable").dataTable().fnDestroy();
    $("#searchresults").empty();
    }
    catch(e){coneole.log(e);}
    
    $("#searchresults").append(toAppend);
    $('#mytable').DataTable({bFilter: false});
    document.getElementById('mytable').style.display='block';
    document.getElementById('searchResultsHeading').innerHTML='Search results for: '+searchTerm;
    
    }
    catch(e){console.log(e);}
    finally{};
    
}
var globalExerciseIds =[];
function selectedExercise(r){
    var searchTerms =['name','musclegroup','type'];
    
    var Append="";
    Append +="<tr>";
//    for (obj in globalExerciseObjs){
//        if( globalExerciseObjs[obj]['id'] == r){
//            globalExerciseIds.push(globalExerciseObjs[obj]['id']);
//                for (st in searchTerms ){
//                Append += "<td>";
//                Append+= globalExerciseObjs[obj][searchTerms[st]];
//                Append += "</td>";
//            }
//        }
//    }

    for (obj in globalExerciseObjs){
        if( globalExerciseObjs[obj]['id'] == r){
            globalExerciseIds.push(globalExerciseObjs[obj]);}
    }
    console.log(globalExerciseIds);
    for (obj in globalExerciseIds){
            for (st in searchTerms ){
            Append += "<td>";
            Append+= globalExerciseIds[obj][searchTerms[st]];
            Append += "</td>";
        }
    }
    
    
    
    Append +="<td> <span style='color:#77b2c9'> <i class='fa fa-pencil-square-o'></i> </span> </td>";
    Append +="</tr>";
    
    try{
        $("#exercisesToAdd").dataTable().fnDestroy();
        $("#selectedExerciseToAdd").empty();
    }
    catch(e){console.log(e);}
    
    
    $("#selectedExerciseToAdd").append(Append);
    document.getElementById("exercisesToAdd").style.display='block';
    $('#exercisesToAdd').DataTable({bFilter: false});

}
//create programme
function submitCreateProgrammeForm(){
    var cProgramName;
    var cProgramDuration;
    var addWorkouts = [];
    
    try {
        cProgramName = document.getElementById("cProgramName").value; 
        cProgramDuration = document.getElementById("cProgramDuration").value; 

        if (mlpObject !== null){
            //name, duration
            mlpObject.createProgram({name:cProgramName,duration:cProgramDuration});
            if(addWorkouts !== null){
                console.log("need to add code for adding to workout");
                for (workouts in addWorkouts){
                     //workoutid, programid, ordering, day
                    try{
                    mlpObject.addworkout ({workoutid:workouts['workoutid'], programid:workouts['programid'], ordering:workouts['ordering'], day:workouts['day']});
                    }
                    catch(e){
                        console.log(e);
                    }
                }
            }
        }
        else{ throw "Session is null";
        }
    }
    
    catch (e){
        console.log(e);
    }
    
    finally{
        sWorkoutName = null; 
        sExercises = null;
    }
}

//////////////////////////////////
//idex page 
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
/// OLD CREATE USER CHECK
//function checkIfUserCreated(u,p){
//    var r = mlpObject['result']['success'];
//    if (r === true){
//        try{
//            mlpObject.login({username: u, password:p});
//            document.getElementById('whiteBackground').style.display="none";
//            document.getElementById('successSignUp').style.display="block";
//
//        }
//
//        catch(e){
//            console.log(e);
//        }
//        
//    }
//    
//}

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
function signOut(){
    try{
        if (mlpObject.logout().result["success"] === true){
        window.location.replace("index.html");       }
    }
    catch(e){
        console.log(e);
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
    else{document.getElementById("invalidemailresponse").innerHTML = " ";} 
}
//Client side email regex, make sure is also checked server side!
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function checkPassword(){
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