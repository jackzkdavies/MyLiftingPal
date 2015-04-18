var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
//User data
var user = mlpObject.getUser().result;

var userId=user['data']['id'];

var notifications = user['data']['requests'];

//Global Variables 
var toggleSpeed = window.localStorage.getItem("toggleSpeed");
var displayUnits = window.localStorage.getItem("displayUnits");
if (displayUnits === null){displayUnits = 'kg';}

function toggle(divID){
    if (!(divID in toggleList)){
        toggleList[divID] =true;
    }
    
    else{
        var temp  = toggleList[divID];
        if(temp===true ){

            toggleList[divID] = false;
        }
        else{
            toggleList[divID] = true;
        }
    }
    
    var div="#"+divID;
    $(div).slideToggle(0);

//    var test="#DiaryControls"+divID;
//    console.log(test);
//    if (divID.indexOf("Second") != -1) {
//        $(test).slideToggle(400);
//}
}

function checkLoginStatus(){
//    if ($.cookie("mlpsession") === undefined){
//        window.location.replace("index.html");
//    }

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

function logout(){
    mlpObject.logout();
    window.location.replace("index.html");
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

function slideToggleCalender(){
    
    if ($(".calender").is(':hidden')){
        document.getElementById("date").innerHTML = fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-up'></i></span>";
        $(".calender").slideToggle(toggleSpeed);
    }
    else{
        document.getElementById("date").innerHTML = fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-down'></i></span>";
        $(".calender").slideToggle(toggleSpeed);
    }
    centerCalander();
}

function toggleDropDownArrow(i){
    if (i.classList.contains('w--open')=== true){
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/open.png" alt="">My Training&nbsp;&nbsp<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/open.png" alt="">My Training&nbsp;&nbsp;<i class="fa fa-caret-up"></i>';
    }
}

var FirstToggle=0;
function toggleMyPrograms(){
    
    if (FirstToggle === 0){
        displayMyPrograms();
        FirstToggle =1;
        document.getElementById("showWkToggleArrow").innerHTML = '<i style="font-size:40px" class="fa fa-minus"></i>'
    }
    else{
        var isVisible = $( "#myWorkouts" ).is( ":visible" ); 


        $("#myWorkouts").slideToggle(400);

        if (isVisible !== true){
            document.getElementById("showWkToggleArrow").innerHTML = '<i style="font-size:40px" class="fa fa-minus"></i>';
        }
        else{
            document.getElementById("showWkToggleArrow").innerHTML = '<i style="font-size:40px" class="fa fa-plus-circle"></i>';
        }
    }
 
}

function setVarDate(){
        var days= ["Sunday","Monday","Tuesday","Wednesday", "Thursdat","Friday","Saturday"]; 
        var months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
        var monthPrefix = ["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];

        day = $("#date-Picker").datepicker('getDate').getDay();
        date = $("#date-Picker").datepicker('getDate').getDate();                 
        month = $("#date-Picker").datepicker('getDate').getMonth();             
        year = $("#date-Picker").datepicker('getDate').getFullYear();
        fullDate = days[day] + ", " + date +monthPrefix[date-1]+ " " + months[month]+", "+year;

        document.getElementById("date").innerHTML = "<span style='color:#77b2c9'><i class='fa fa-caret-left'></i> </span> " + fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-right'></i></span>";
}

function centerCalander(){
    var t = document.getElementById("date-Picker");

}

function modalDisplayWorkoutExercies(inputID){

    var searchResult = mlpObject.getWorkouts({id:inputID}).result['data'][0];
    var name = searchResult['name']
    var exercises = searchResult['exercises'];
 
    
    $("#modalLabelDWE").empty();
    $("#modalLabelDWE").append(name);
    
    var toAppend='<table><tr style="color: #77b2c9; font-weight:bold;" ><td>Exercise</td><td>Weight</td><td>Reps</td><td>Sets</td><td>RPE</td></tr>';
    
    for(i in exercises){
        toAppend+='<tr>';
        toAppend+='<td width="50%">';
        toAppend+=exercises[i]['name'];
        toAppend+='</td>';
        toAppend+='<td width="20%">';
        toAppend+=exercises[i]['weight'];
        toAppend+='</td>';
        toAppend+='<td width="10%">';
        toAppend+=exercises[i]['reps'];
        toAppend+='</td>';
        toAppend+='<td width="10%">';
        toAppend+=exercises[i]['sets'];
        toAppend+='</td>';
        toAppend+='<td width="10%">';
        toAppend+=exercises[i]['rpe'];
        toAppend+='</td>';
        toAppend+='</tr>'

    }
    toAppend+='</table>'
    
    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="addWorkoutToDiary('+inputID+')" type="button" class="btn btn-primary">Add</button>';
    
    $("#basicModalDWAdd").empty();
    $("#basicModalDWAdd").append(buttons);
    

    $("#modalDWEdetails").empty();
    $("#modalDWEdetails").append(toAppend);
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#modalDisplayWorkoutExercies').modal(options);
}

function modalWorkoutExerciseEdit(inputID,wID){
    console.log(wID);
    var workouts = mlpObject.getExercises({id:inputID}).result;

     
     
//    document.getElementById("updateModalAddRep").value = workouts['data'][0]['name'];
//    document.getElementById("updateModalAddSet").value = workouts['data'][0]['name'];
//    document.getElementById("updateModalAddWeight").value = workouts['data'][0]['name'];
//    document.getElementById("updateModalAddRPE").value = workouts['data'][0]['name'];
//    document.getElementById("updateModalAddRM").value = workouts['data'][0]['name'];
     
    document.getElementById("updateModalAddRep").value = 0;
    document.getElementById("updateModalAddSet").value = 0;
    document.getElementById("updateModalAddWeight").value = 0;
    document.getElementById("updateModalAddRPE").value = 0;
    document.getElementById("updateModalAddRM").value = 0; 
     
    $("#myModalLabelWorkoutExerciseEdit").empty();
    $("#myModalLabelWorkoutExerciseEdit").append(workouts['data'][0]['name']);
    
    
    $("#modalWorkoutExerciseEditControls").empty();
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="workoutExerciseEdit('+inputID+','+wID+')" type="button" class="btn btn-primary">Save</button>';
    $("#modalWorkoutExerciseEditControls").append(buttons);
    
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#modalWorkoutExerciseEdit').modal(options);
    
}
function addExerciseCalanderModal(inputID){
    
    var date = $("#date-Picker2").datepicker('getDate').getDate();                 
    var month = $("#date-Picker2").datepicker('getDate').getMonth();             
    var year = $("#date-Picker2").datepicker('getDate').getFullYear();
    var tdate=year+"-"+(month+1)+"-"+date;
    
    try{
        console.log(mlpObject.addResults({workoutid:inputID, assigneddate:tdate}).result);
    }
    catch(e){
        
    }
    messageModal('#calanderModal');
    
}

function messageModal(caller){
    $("#messageModalBody").empty();
    
    if(caller== '#basicModalAddEx'){
        $("#messageModalBody").append('<img class="" src="images/loader.GIF" alt="Loading"><h3>Adding To Current Day</h3>');
    }
    else if(caller == '#calanderModal'){
        $("#messageModalBody").append('<img class="" src="images/loader.GIF" alt="Loading"><h3>Adding To Selected Day</h3>');
    }
    else{ $("#messageModalBody").append('<img class="" src="images/loader.GIF" alt="Loading"><h3>Completing Action</h3>'); }
    

    $(caller).modal('hide');
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#messageModal').modal(options);
    
    
    setTimeout(function(){

        $("#messageModal").modal('hide');
     }, 2000);

        
}

function calanderModal(data){
    var caller=data[1];
    var inputID=data[0];
    $(caller).modal('hide');
    
    
    var buttons= '<hr>'+
                 '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                 '<button type="button" onclick="addExerciseCalanderModal('+inputID+')" class="btn btn-primary">Confirm</button>'+
                 '<br><br>';
    
    $('#calanderModalButtons').empty();
    $('#calanderModalButtons').append(buttons);
    
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#calanderModal').modal(options);
    
    $('#date-Picker2').datepicker({
        format: "dd/mm/yyyy",
        orientation: "top",
        keyboardNavigation: false,
        calendarWeeks: true,
        todayHighlight: true,
        gotoCurrent: true
        }).datepicker("setDate", new Date());
}
function workoutSeach(){
    var searchTerms =['name','userid'];
    var searchTerm= (document.getElementById("workoutsearch").value.toString()).trim();
    document.getElementById("searchresults").innerHTML = "";
    document.getElementById("searchResultsHeading").innerHTML="";
    if (searchTerm ===""){
        $("#searchresultsWorkouts").append("Please enter a keyword");
        return;
    }
    globalWorkoutObjs={};
    try{  
    for (st in searchTerms){
        var data = new Array();
        data[searchTerms[st]] = searchTerm;
        var searchResult = mlpObject.getWorkouts(data).result;
        if (searchResult['success'] === true){
            for ( objects in searchResult['data'] ){              
                globalWorkoutObjs[searchResult['data'][objects]['id']]=searchResult['data'][objects];
            };
        
            
        }
    }
    
    var toAppend="";   
    
        for (key in globalWorkoutObjs){    
              if (globalWorkoutObjs.hasOwnProperty(key)) {    
                  
        var useDate=[year,(month+1),date];
        toAppend += "<tr onClick='modalDisplayWorkoutExercies("+key+")'>";
       

        for (st in searchTerms){
            toAppend += "<td>";
   
            if (searchTerms[st] === 'userid'){
              
                toAppend += mlpObject.getUsers({id:globalWorkoutObjs[key][searchTerms[st]]}).result['data'][1];

            }
            else {
                toAppend += globalWorkoutObjs[key][searchTerms[st]];
            }
            toAppend += "</td>";
        }
        
        toAppend += "</tr>";

    }}
    
    try{
    $("#mytable").dataTable().fnDestroy();
    $("#mytableWorkouts").dataTable().fnDestroy();
    $("#searchresults").empty();
    $("#searchresultsWorkouts").empty();
    document.getElementById('mytable').style.display='none';
    }
    catch(e){console.log(e);}
    
    $("#searchresultsWorkouts").append(toAppend);
    $('#mytableWorkouts').DataTable({bFilter: false});
    document.getElementById('mytableWorkouts').style.display='table';
    document.getElementById('searchResultsHeading').innerHTML='<div style="line-height:50px">Search results for workout: '+searchTerm+'</div>';
    
    }
    catch(e){console.log(e);}
    finally{};
}

function addMyProgramDetails(input,duration){
    var toAppend ="";
    var divId='#'+input;
    var idNum =input.replace('myPrograms','');
    var workouts = mlpObject.selectWorkouts({programid:idNum}).result;
    console.log(workouts);
    if ((document.getElementById(input).innerHTML).trim() === ""){
        
        if (workouts['success'] === false){
            toAppend +='<p>No Workouts to display</p>';
        }
        else{
            var count = 1;
            
                while(count <= duration){
                    var writeOut = false;
                    toAppend += '<hr>Day: ' + count; 
                    for (workout in workouts['data']){ 
                        if (count == workouts['data'][workout]['day']){
                            writeOut = true;
                            toAppend +='<div style="background-color:rgba(226, 218, 203, 1);  padding-left: 10px;  padding-right: 10px;  padding-top: 1px;   margin-top: 5px;">';
                            var workoutDetails = workouts['data'][workout];

                            var workoutId=workouts['data'][workout]['workoutid'];

                            var workoutObj = mlpObject.getWorkouts({id:workoutId}).result;

                            var workoutName = workoutObj['data'][0]['name'];

                            toAppend += '<h5 style="color:#333">'+workoutName+'</h5>';

                            for (exercises in workoutObj['data'][0]['exercises']){
                                toAppend += '<p style="text-align:left">'+workoutObj['data'][0]['exercises'][exercises]["name"]+'</p>';
                                toAppend += '<table style="width:100%">';
                                toAppend += '<tr><td>reps</td><td>sets</td><td>weight</td><td>RPE</td><td>%1RM</td></tr>';
                                toAppend += '<tr><td>'+workoutObj['data'][0]['exercises'][exercises]["reps"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["sets"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["weight"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["rpe"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["percentage"]+'</td></tr>';
                                toAppend += '</table>';
                                toAppend += '<br>';
                            }
                            toAppend += '</div>';
                            break;
                        }
                        else{

                        }
                       
                    }
                    if (writeOut === false){
                        toAppend +='<div style="background-color:white">' 
                        toAppend += '<p>rest day</p>';
                        toAppend += '</div>';
                    }
                    console.log(count);
                    count = count+1;
                }
            
        }
                
     toAppend +=  ' <a href="javascript:modalProgramEdit('+idNum+","+duration+');" style="border:6px solid transparent" class="btn btn-default btn-circle myexercises-edit">'+
        '<i style="font-size:40px ;padding-left:5px" class="fa fa-pencil-square-o"></i></a>';
    
    
    $(divId).append(toAppend);
    }
     else{$(divId).slideToggle(400);
    }
}

function modalProgramEdit(idNum,duration){

    var workouts = mlpObject.selectWorkouts({programid:idNum}).result;
    console.log(workouts);

    
    
    $("#updateProgramDuration").val(duration);
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#modalProgramEdit').modal(options);
}

function updateWorkout(wId){
    mlpObject.updateWorkout({id:wId,name:document.getElementById("updateWorkoutName").value});
    $('#basicModalEdit').modal('hide');
    displayMyPrograms();
}

function deleteWorkout(wId){
    mlpObject.deleteWorkout({id:wId});
    $('#basicModalEdit').modal('hide');
    displayMyPrograms();
}

function updateModalWorkoutAdd(wId)
{
    var workout = mlpObject.getWorkouts({id:wId});

//
//    addWorkoutToDiary
    $("#myModalLabelWorkoutAdd").empty();
    $("#myModalLabelWorkoutAdd").append("Add " + workout.result['data'][0]['name'] + " To:");
    
    $("#modalWorkoutAddTo").empty();
    
    var tempString="'#basicModalAddWorkout'";
    var calanderData=[wId,tempString];
    
    var toAppend ='';
     toAppend += '<h3 onclick='+'"addWorkoutToDiary('+wId+')"><i class="fa fa-book"></i>Current Day</h3>'+
                            '<p style="color:#77b2c9">or</p>'+
                            '<h3 onclick="calanderModal(['+calanderData+'])"><i class="fa fa-calendar"></i>Select Day</h3>';
    $("#modalWorkoutAddTo").append(toAppend);
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalAddWorkout').modal(options);
}

function addWorkoutToDiary(inputID){
    messageModal('#basicModalAddWorkout');
    try{
        console.log(mlpObject.addResults({workoutid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);
    }
    catch(e){
        
    }
    
}

function displayMyPrograms(){
    var mpo=mlpObject.getPrograms({userid:userId}).result['data'];
    $("#myPrograms").empty();
//    console.log(mpo);
    for (objects in mpo){
        
//        console.log(mwo[objects])
    var toAppend = "";
    toAppend +='<div>';
    toAppend +='<div onclick="addMyProgramDetails(' + "'" +'myPrograms'+mpo[objects]['id']+"'"+','+mpo[objects]['duration']+ ')">';
    toAppend +='<h3 style="text-align:left;width:70%;padding: 8px; float:left">'+mpo[objects]['name'];
    toAppend +='<i class="fa fa-caret-down"></i>';
    toAppend +='</h3></div>';
    
    
    toAppend +='<a href="javascript:updateModalWorkoutAdd('+mpo[objects]['id']+');" style="width:60px; margin-bottom: 4px; z-index:10;" class="btn btn-default btn-circle-main">';
    toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
    toAppend +='</a>';
    toAppend +='<p>'+mpo[objects]["duration"]+' Day Program</p>';
    toAppend +='<div id="myPrograms'+mpo[objects]['id']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';


    toAppend+="</div><hr>";
    
    $("#myPrograms").append(toAppend);
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
        displayMyWorkouts()
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
    document.getElementById('mytable').style.display='table';
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
    document.getElementById("exercisesToAdd").style.display='table';
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

function checkNotifications(){
    var numberNotifications= notifications.length;
    if (notifications != null){
        for (request in notifications){
            console.log(notifications);

            if(numberNotifications > 99){
                $('#numNot').append('99+');
            }
            else{
                $('#numNot').append(numberNotifications);
            }
            
            $('#inboxNotifications').append("Friend Request from: <h5 onclick='viewFriend("+notifications[request]['userid']+")'>"+notifications[request]['username']+"</h5>");
        }
    }
}