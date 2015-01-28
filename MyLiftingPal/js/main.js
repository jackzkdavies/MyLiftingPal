//Date
var d = new Date(); var date = d.getDate(); var day = d.getDay(); var year = d.getFullYear(); var month = d.getMonth();
//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
var globalExerciseObjs; 
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

function toggleDropDownArrow(i){
    if (i.classList.contains('w--open')=== true){
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
function updateModalExerciseAdd(inputId){
    var getExercise = mlpObject.getExercises({id:inputId});
    
    $("#myModalLabelExerciseAdd").empty();
    $("#myModalLabelExerciseAdd").append("Add " + getExercise.result['data'][0]['name'] + " To:");
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalUpdate').modal(options);
    
    

}
function deleteExercise(eid){
    mlpObject.deleteExercise({id:eid});
    $('#basicModalEdit').modal('hide');
    displayMyExercises();

}

function updateExercise(eid){
    var newExName = document.getElementById("updateExerciseName").value;
    
    var e = document.getElementById("updateExerciseMuscle");
    var newExGroup = e.options[e.selectedIndex].text;
    
    var e2 = document.getElementById("updateExerciseType");
    var newExType = e2.options[e2.selectedIndex].text;
    

    mlpObject.updateExercise({id:eid,name:newExName,musclegroup:newExGroup,type:newExType});
    
    $('#basicModalEdit').modal('hide');
    displayMyExercises();
}
function updateModalExerciseEdit(inputId){
    var getExercise = mlpObject.getExercises({id:inputId}).result['data'][0];
    
    
    document.getElementById("updateExerciseName").value = getExercise['name'];
    
    var element = document.getElementById('updateExerciseMuscle');
    element.value = 0;
    var element2 = document.getElementById('updateExerciseType');
    element2.value = 0;
    
    
    $("#deleteExerciseButton").empty();
    var delBut = '<button onclick="deleteExercise('+inputId+')" type="button" class="btn btn-primary">Delete</button>';
    $("#deleteExerciseButton").append(delBut);
    
    $("#editCalANDSav").empty();
    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="updateExercise('+inputId+')" type="button" class="btn btn-primary">Save</button>';
    $("#editCalANDSav").append(buttons);
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalEdit').modal(options);
    

}
//Displaay exercises
function displayMyExercises(){
    $("#myExercises").empty();
    var userId=mlpObject.getUser().result['data']['id'];
    var meo=mlpObject.getExercises({userid:userId}).result['data'];
    for (objects in meo){
    var toAppend = [];
    toAppend +='<div >';
    toAppend +='<h3 onclick="displayMyExercisesDetails(' + "'" +'myExercises'+meo[objects]['id']+"'"+ ')" style="text-align:left;width:70%;padding: 8px; float:left">'+meo[objects]['name'];
    toAppend +='<span id="myExercisesDetailsArrow'+meo[objects]['id']+'"><i class="fa fa-caret-down"></i></span>';
    toAppend +='</h3>';
  
    toAppend +='<a href="javascript:updateModalExerciseAdd(' +meo[objects]['id']+ ')" style="width:60px; margin-bottom: 4px;" class="btn btn-default btn-circle-main">';
 
    toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
    toAppend +='</a>';

    toAppend +='<div id="myExercises'+meo[objects]['id']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';


    toAppend+="</div><hr>";
    
    $("#myExercises").append(toAppend);
    }
}

function displayMyExercisesDetails(input){
    var toAppend ="";
    var divId='#'+input;
    var idNum =input.replace('myExercises','');
    var exercise = mlpObject.getExercises({id:idNum}).result['data'][0];;
    if ((document.getElementById(input).innerHTML).trim() === ""){

        toAppend +='<p style="text-align:left; color:#77b2c9;">&nbsp;&nbsp;&nbsp;'+exercise['musclegroup']+'</p>'+
                '<p style="text-align:left; color:#77b2c9;">&nbsp;&nbsp;&nbsp;'+exercise['type']+'</p>'+
                
                
               ' <a href="javascript:updateModalExerciseEdit('+idNum+');" class="btn btn-default btn-circle myexercises-edit">'+
                '<i class="fa fa-pencil-square-o"></i></a>';
        
    
    
    $(divId).append(toAppend);
    }
     else{$(divId).slideToggle(400);
    }
    
    if (document.getElementById('myExercisesDetailsArrow'+idNum).innerHTML=== '<i class="fa fa-caret-up"></i>'){
        document.getElementById('myExercisesDetailsArrow'+idNum).innerHTML = '<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById('myExercisesDetailsArrow'+idNum).innerHTML = '<i class="fa fa-caret-up"></i>';
    }
    
}
//create exercise
function submitCreateExerciseForm(add){
    var addToDay = add;
    var sExerciseName;
    var sExerciseMuscleGroup; 
    var sExerciseType;
    document.getElementById("createSuccess").innerHTML = "";
    
    try {
        sExerciseName = document.getElementById("cExerciseName").value; 
        
        var e2 = document.getElementById("cExerciseMusclegroup");
        var sExerciseMuscleGroup = e2.options[e2.selectedIndex].text;
        
        var e3 = document.getElementById("cExerciseType");
        var sExerciseType = e3.options[e3.selectedIndex].text;
        
//        sExerciseMuscleGroup = document.getElementById("cExerciseMusclegroup").value; 
//        sExerciseType = document.getElementById("cExerciseType").value;
        if (sExerciseName.trim() === '' || sExerciseMuscleGroup.trim() === '' || sExerciseType.trim() === ''){
            console.log(sExerciseName.trim(), sExerciseMuscleGroup.trim(),sExerciseType.trim());
            document.getElementById("createSuccess").innerHTML = "<span style='color:#ff6666'>Required feild empty</span>";
            return;
        }
        
        if (mlpObject !== null){ 
            //name,musclegroup,type
            mlpObject.createExercise({name:sExerciseName,musclegroup:sExerciseMuscleGroup,type:sExerciseType});
            if(addToDay === 1){
                console.log("need to add code for adding to current day");
            }
            document.getElementById("createSuccess").innerHTML = '"'+sExerciseName +'"'+ " <span style='color:#66cc66'>Added Successfully!</span>";
        }
        else{ throw "Session is null";
        }
        
        displayMyExercises();
        
        $('#cExerciseName').val('').removeAttr('checked').removeAttr('selected');
        $('#cExerciseMusclegroup').val('').removeAttr('checked').removeAttr('selected');
        $('#cExerciseType').val('').removeAttr('checked').removeAttr('selected');
        
        
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
    catch(e){console.log(e);}
    
    $("#searchresults").append(toAppend);
    $('#mytable').DataTable({bFilter: false});
    document.getElementById('mytable').style.display='block';
    document.getElementById('searchResultsHeading').innerHTML='Search results for: '+searchTerm;
    
    }
    catch(e){console.log(e);}
    finally{};
}



function addMyworkoutDetails(input){

    var toAppend ="";
    var divId='#'+input;
    var idNum =input.replace('myWorkouts','');
    var workouts = mlpObject.selectExercises({workoutid:idNum}).result;

//    console.log(workouts);
    if ((document.getElementById(input).innerHTML).trim() === ""){
        
        if (workouts['success'] === false){
            toAppend +='<p>No exercises to display</p>';
        }
        else{
        for (workout in workouts['data']){
//            console.log(workouts['data'][workout]);
            var wnames = mlpObject.getExercises({id:workouts['data'][workout]['exerciseid']}).result;

            toAppend +='<table class="table table-striped">'+
            '<thead>'+
                '<tr>'+
                    '<td colspan="2">'+wnames['data'][0]['name']+'</td>'+
                    '<td colspan="2">'+wnames['data'][0]['musclegroup']+'</td>'+
                    '<td colspan="2">'+wnames['data'][0]['type']+'</td>'+
                '</tr>'+
            '</thead>'+

            "<tbody id ='myWorkouts'>"+
                "<tr>"+
                    
                    "<td style='border-left: 3px solid white;border-right: 3px solid white'>sets</td>"+
                    "<td style='border-top-left-radius: 3px; border-right: 3px solid white'>reps</td>"+
                    "<td colspan='2' style='border-top-right-radius: 3px; border-left: 3px solid white'>weight</td>"+
                    "<td style='border-top-right-radius: 3px; border-left: 3px solid white'>rpe</td>"+
                    "<td style='border-top-right-radius: 3px; border-left: 3px solid white'>%1RM</td>"+
                "</tr>"+

                "<tr>"+
                    
                    "<td style='border-left: 3px solid white;border-right: 3px solid white'>"+workouts['data'][workout]['sets']+"</td>"+
                    "<td style='border-top-left-radius: 3px; border-right: 3px solid white'>"+workouts['data'][workout]['reps']+"</td>"+
                    "<td colspan='2' style='border-top-right-radius: 3px; border-left: 3px solid white'>"+workouts['data'][workout]['weight']+"</td>"+
                    "<td style='border-top-right-radius: 3px; border-left: 3px solid white'>"+workouts['data'][workout]['rpe']+"</td>"+
                    "<td style='border-top-right-radius: 3px; border-left: 3px solid white'>"+workouts['data'][workout]['percentage']+"</td>"+
                "</tr>    "+
            "</tbody>"+

           "</table>";
            }
        }
     toAppend +=  ' <a href="javascript:updateModalWorkoutEdit('+input+');" class="btn btn-default btn-circle myexercises-edit">'+
        '<i class="fa fa-pencil-square-o"></i></a>';
    
    
    $(divId).append(toAppend);
    }
     else{$(divId).slideToggle(400);
    }
}
//Display my workouts
function displayMyWorkouts(){
    var userId=mlpObject.getUser().result['data']['id'];
    var mwo=mlpObject.getWorkouts({userid:userId}).result['data'];
    for (objects in mwo){
    var toAppend = [];
    toAppend +='<div onclick="addMyworkoutDetails(' + "'" +'myWorkouts'+mwo[objects]['id']+"'"+ ')">';
    toAppend +='<h3 style="text-align:left;width:70%;padding: 8px; float:left">'+mwo[objects]['name'];
    toAppend +='<i class="fa fa-caret-down"></i>';
    toAppend +='</h3>';
    
    toAppend +='<a href="javascript:void(0);" style="width:60px; margin-bottom: 4px;" class="btn btn-default btn-circle-main">';
    toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
    toAppend +='</a>';

    toAppend +='<div id="myWorkouts'+mwo[objects]['id']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';


    toAppend+="</div><hr>";
    
    $("#myWorkouts").append(toAppend);
    }
}

//create Workout
function submitCreateWorkoutForm(){
    var sWorkoutName;
    var temp;
//    var addExercises = []; 
    
    try {
        sWorkoutName = document.getElementById("cWorkoutName").value; 
        if(sWorkoutName.trim() ===""){
            document.getElementById("errorCreatingWorkout").innerHTML="Please Enter Name for Workout";
            return;
        }
        console.log(sWorkoutName);

        
        if (mlpObject !== null){ 
            console.log("In Create new workoutLoop.");
            //name
            var newWorkout = mlpObject.createWorkout({name:sWorkoutName});
                console.log("newWorkout obj:");
                console.log(newWorkout);
                console.log(newWorkout['result']['data']['id']);
                var nwi = newWorkout['result']['data']['id'];
                if(globalExerciseIds !== {}){
                    console.log("in add exercises to new Workoutout:");
                    for (key in globalExerciseIds){    
                        if (globalExerciseIds.hasOwnProperty(key)) {
                            //exerciseid, workoutid,ordering, reps, sets, rpe, weight, percentage
//                            try{
//                            mlpObject.addexercise({exerciseid:globalExerciseIds[key]['id'], workoutid:newWorkout['id'], ordering:key, 
//                            reps:globalExerciseIds[key]['reps'], sets:globalExerciseIds[key]['sets'], rpe:globalExerciseIds[key]['rpe'],weight:globalExerciseIds[key]['weight'], percentage:globalExerciseIds[key]['percentage']});
//                            }
                            console.log("globalExerciseIds[key]['id']:");
                            console.log(globalExerciseIds[key]['id']);
                            console.log("newWorkout['id']:");
                            console.log(newWorkout['id']);
                            console.log("key:");
                            console.log(key);
                            try{
                            temp = mlpObject.addExercise({exerciseid:globalExerciseIds[key]['id'], workoutid:nwi, ordering:key.toString(), 
                            reps:'0', sets:'0', rpe:'0',weight:'0', percentage:'0'});
                            console.log(temp);
                             }

                            catch(e){
                                console.log(e);}

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
    catch(e){console.log(e);}
    
    $("#searchresults").append(toAppend);
    $('#mytable').DataTable({bFilter: false});
    document.getElementById('mytable').style.display='block';
    document.getElementById('searchResultsHeading').innerHTML='Search results for: '+searchTerm;
    
    }
    catch(e){console.log(e);}
    finally{};
    
}
var globalExerciseIds ={};
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
//            globalExerciseIds.push(globalExerciseObjs[obj]);
            globalExerciseIds[globalExerciseObjs[obj]['id']]=globalExerciseObjs[obj];
        }
    }
    
//    for (obj in globalExerciseIds){
//            for (st in searchTerms ){
//            Append += "<td>";
//            Append+= globalExerciseIds[obj][searchTerms[st]];
//            Append += "</td>";
//        }
//    }
    
    for (key in globalExerciseIds){ 
        for (st in searchTerms){
                Append += "<td>";

                if (searchTerms[st] === 'userid'){
    //                toAppend += mlpObject.getUsers({id:results[obj][searchTerms[st]]}).result['data']['username'];

                }
                else {
                    Append += globalExerciseIds[key][searchTerms[st]];
                }
                Append += "</td>";
            }
            Append +="<td> <span style='color:#77b2c9'> <i class='fa fa-pencil-square-o'></i> </span> </td>";
    Append +="</tr>";
            
    }
       
    
    
    try{
        $("#exercisesToAdd").dataTable().fnDestroy();
        $("#selectedExerciseToAdd").empty();
    }
    catch(e){coneole.log(e);}
    
    
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