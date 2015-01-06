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

////////// examplemlpObject.login({username: 'myusername', password:'mypassword'}

//create exercise
function submitCreateExerciseForm(add){
    var addToDay = add;
    var sExerciseName;
    var sExerciseMuscleGroup; 
    var sExerciseType;
    
    try {
        sExerciseName = document.getElementById("cExerciseName").value; 
        sExerciseMuscleGroup = document.getElementById("cExerciseMusclegroup").value; 
        sExerciseType = document.getElementById("cExerciseType").value;

        
        if (mlpObject !== null){ 
            //name,musclegroup,type
            mlpObject.createxercise({name:sExerciseName,musclegroup:sExerciseMuscleGroup,type:sExerciseType});
            if(addToDay === 1){
                console.log("need to add code for adding to current day");
            }
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
//create programme
}
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
            mlpObject.createuser({email:sEmail,username:sUsername,password:sPassword});
            if (mlpObject['result']['success'] === true){
                try{
                    mlpObject.login({username: u, password:p});
                    document.getElementById('whiteBackground').style.display="none";
                    document.getElementById('successSignUp').style.display="block";

                }

                catch(e){
                    console.log(e);
                }
            };
//            checkIfUserCreated(sUsername,sPassword);
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
    
    try{
        lUsername = document.getElementById("signInUsername").value; 
        lPassword = document.getElementById("signInPassword").value;
        //username, password
        mlpObject.login({username:lUsername,password:lPassword});
    }
    catch(e){
        console.log(e,"username: " + lUsername, "password: " + lPassword);
    }
    finally{
        lUsername = null; 
        lPassword = null;
//        if (mlpObject.sesson !== null){window.location.href ("main-page.html");}
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