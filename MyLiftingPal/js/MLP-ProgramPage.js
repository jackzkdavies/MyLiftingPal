var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
//User data
var user = mlpObject.getUser().result;

var userId=user['data']['id'];

var notifications = user['data']['requests'];

//Global Variables 
var toggleSpeed = window.localStorage.getItem("toggleSpeed");
var displayUnits = window.localStorage.getItem("displayUnits");
var lastCallertoWorkoutSearch=null;
var globalProgramObjs={}
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
        var isVisible = $( "#myPrograms" ).is( ":visible" ); 


        $("#myPrograms").slideToggle(400);

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

function hideWorkoutShowSearch(){
    $('#modalDisplayWorkoutExercies').modal('hide');
    var options = {
        "backdrop" : "true",
        "show":"true"};
    $('#modalDisplayWorkoutSearch').modal(options);
}

var globalWorkoutsToAdd={};

function addWorkoutToProgramDay(id,name){
   $('#modalDisplayWorkoutExercies').modal('hide');
   console.log(lastCallertoWorkoutSearch);
   var day = lastCallertoWorkoutSearch.replace("newprogramday", "");
   
   globalWorkoutsToAdd[day]=id;
   
   var divid= "#"+lastCallertoWorkoutSearch;
   $(divid).val(name);   
}
function modalDisplayWorkoutExercies(inputID){
    $('#modalDisplayWorkoutSearch').modal('hide');

    var searchResult = mlpObject.getWorkouts({id:inputID}).result['data'][0];
    var name = searchResult['name']
    var exercises = searchResult['exercises'];
 
    
    $("#workoutDetailsName").empty();
    $("#workoutDetailsName").append(name);
    
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
    
    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" onclick="hideWorkoutShowSearch()">Cancel</button>'+
            '<button onclick="addWorkoutToProgramDay('+"'"+inputID+"','"+name+"'"+')" type="button" class="btn btn-primary">Add</button>';
    
    $("#workoutDetailsButtons").empty();
    $("#workoutDetailsButtons").append(buttons);
    

    $("#modalWorkoutdetails").empty();
    $("#modalWorkoutdetails").append(toAppend);
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#modalDisplayWorkoutExercies').modal(options);
}

function modalWorkoutExerciseEdit(inputID,wID){
    console.log(wID);
    var workouts = mlpObject.getExercises({id:inputID}).result;
     
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

function programSearch(){
    
    //clean up from any past searches
    try{
        $("#programSearchTable").dataTable().fnDestroy();
        $("#searchResultsProgram").empty();
        document.getElementById('programSearchTable').style.display='none';
    }
    catch(e){console.log(e);}
    
    
    var searchTerms =['name','userid'];
    var searchTerm= (document.getElementById("programseachterm").value.toString()).trim();
    
    if (searchTerm ===""){
        $("#failedProgramSearch").append("Please enter a search term");
        return;
    }
    
    globalProgramObjs={};
    try{  
    for (st in searchTerms){
        var data = new Array();
        data[searchTerms[st]] = searchTerm;
        var searchResult = mlpObject.getPrograms(data).result;
        if (searchResult['success'] === true){
            for ( objects in searchResult['data'] ){              
                globalProgramObjs[searchResult['data'][objects]['id']]=searchResult['data'][objects];
            };
        
            
        }
    }
    }
    catch(e){
        
    }
    
    for (key in globalProgramObjs){    
        if (globalProgramObjs.hasOwnProperty(key)) { 
            toAppend = "<tr onclick='rightResultsContainerUpdate("+key+")'><td>" + globalProgramObjs[key]['name'] +"</td></tr>";
            $('#searchResultsProgram').append(toAppend);
        }

    }
        

    
    $('#programSearchTable').DataTable({bFilter: false});
    document.getElementById('programSearchTable').style.display='table';
        
    console.log(globalProgramObjs);
    
}
function displayLeftSearchContainer(){
    $("#leftResultsContainer").css({"width": "100%","display":"block"});
    $("#rightResultsContainer").css({"width": "0px","display":"none", "overflow": "hidden"});
    
}

function rightResultsContainerUpdate(programId){
    var name=globalProgramObjs[programId]['name'];
    var duration=globalProgramObjs[programId]['duration'];
    var workouts=globalProgramObjs[programId]['workouts'];
    console.log(globalProgramObjs);
    $('#rightSearchResultsName').empty();
    $('#rightSearchResultsName').append('<hr><h3>'+name+'</h3><h2><i onclick="displayLeftSearchContainer()"class="fa fa-arrow-left"></i></h2>');
    
    toAppend='';
    if (typeof workouts === null){
            toAppend +='<p>No Workouts to display</p>';
        }
        else{
            var count = 1;
            
                while(count <= duration){
                    var header=false;
                    var writeOut = false;
                    toAppend += '<hr><p style="color:#77b2c9; font-weight:bold">Day: ' + count+'</p>'; 
                    for (workout in workouts){ 
                        if (count == workouts[workout]['day']){
    
                            
                            writeOut = true;
                            toAppend +='<div style="text-align:center;">';
                            
                            if(header === false){
                                toAppend+='<p style="text-align:center;">'+workouts[workout]['workoutname']+'</p>';
                                header = true;
                                
                            }
                            
                            var workoutDetails = workouts[workout];

                            var workoutId=workouts[workout]['workoutid'];

                            var workoutName = workouts[workout]['workoutname'];
                            
                            var exerciseName = workouts[workout]['name']

//                            toAppend += '<p style="color:#77b2c9">'+workoutName+'</p><br>';


                            toAppend += '<p style="text-align:center;font-size: 14px;margin-bottom: -5px;font-weight: bold;">'+exerciseName+'</p>';
                            
                            toAppend += '<table style="width:100%;text-shadow:none; style="text-align:center;"">';
                            toAppend += '<tr><td>reps</td><td>sets</td><td>weight</td><td>RPE</td><td>%1RM</td></tr>';
                            toAppend += '<tr><td>'+workouts[workout]["reps"]+'</td>';
                            toAppend += '<td>'+workouts[workout]["sets"]+'</td>';
                            toAppend += '<td>'+workouts[workout]["weight"]+'</td>';
                            toAppend += '<td>'+workouts[workout]["rpe"]+'</td>';
                            toAppend += '<td>'+workouts[workout]["percentage"]+'</td></tr>';
                            toAppend += '</table>';

                            
                            toAppend += '<br></div>';
                            
                        }
                        else{

                        }
                       
                    }
                    if (writeOut === false){
                        toAppend +='<div style="background-color:white">' 
                        toAppend += '<p style="color:#ff6666">Rest day.</p>';
                        toAppend += '</div>';
                    }
                    console.log(count);
                    count = count+1;
                }
            
        }
     toAppend+='<div style="width:100%"><a href="javascript:updateModalProgramAdd('+programId+','+"'"+name+"'"+');" style="width:60px; margin-bottom: 4px; z-index:10; background-color: #77b2c9;color:white" class="btn btn-default btn-circle-main"><i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i></a></div>';
     toAppend+='<br><h2><i onclick="displayLeftSearchContainer()" class="fa fa-arrow-left"></i></h2>';
    $('#rightResultsContent').empty();
    $('#rightResultsContent').append(toAppend);
    
    $("#rightResultsContainer").css({"width": "100%","display":"block"});
    $("#leftResultsContainer").css({"width": "0px", "overflow": "hidden","display":"none"});

    
}

var globalProgramWorkouts = [];
function addMyProgramDetails(input,duration,programname){
    var toAppend =duration+" Day Program.";
    var divId='#'+input;
    var idNum =input.replace('myPrograms','');
    var workouts = mlpObject.selectWorkouts({programid:idNum}).result;
    
    $('#programDetailsName').empty();
    $('#programDetailsName').append(programname);
    
    globalProgramWorkouts[idNum]=workouts['data'];

    
    
        
        if (workouts['success'] === false){
            toAppend +='<p>No Workouts to display</p>';
        }
        else{
            var count = 1;
            
                while(count <= duration){
                    var writeOut = false;
                    toAppend += '<hr><p style="color:#77b2c9; font-weight:bold">Day: ' + count+'</p>'; 
                    for (workout in workouts['data']){ 
                        if (count == workouts['data'][workout]['day']){
                            writeOut = true;
                            toAppend +='<div style="">';
                            var workoutDetails = workouts['data'][workout];

                            var workoutId=workouts['data'][workout]['workoutid'];

                            var workoutObj = mlpObject.getWorkouts({id:workoutId}).result;

                            var workoutName = workoutObj['data'][0]['name'];

                            toAppend += '<p style="color:#77b2c9">'+workoutName+'</p><br>';

                            for (exercises in workoutObj['data'][0]['exercises']){
                                toAppend += '<p style="text-align:center;font-size: 14px;margin-bottom: -5px;font-weight: bold;">'+workoutObj['data'][0]['exercises'][exercises]["name"]+'</p>';
                                toAppend += '<table style="width:100%;text-shadow:none">';
                                toAppend += '<tr><td>reps</td><td>sets</td><td>weight</td><td>RPE</td><td>%1RM</td></tr>';
                                toAppend += '<tr><td>'+workoutObj['data'][0]['exercises'][exercises]["reps"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["sets"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["weight"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["rpe"]+'</td>';
                                toAppend += '<td>'+workoutObj['data'][0]['exercises'][exercises]["percentage"]+'</td></tr>';
                                toAppend += '</table>';
                                toAppend += '';
                            }
                            toAppend += '<br></div>';
                            break;
                        }
                        else{

                        }
                       
                    }
                    if (writeOut === false){
                        toAppend +='<div style="background-color:white">' 
                        toAppend += '<p style="color:#ff6666">Rest day.</p>';
                        toAppend += '</div>';
                    }
                    console.log(count);
                    count = count+1;
                }
            
        }
                
     toAppend +=  ' <hr><a href="javascript:modalProgramEdit('+idNum+","+duration+');" style="border:6px solid transparent" class="btn btn-default btn-circle myexercises-edit">'+
        '<i style="font-size:40px ;padding-left:5px" class="fa fa-pencil-square-o"></i></a>';
    
    $('#programDetailsBody').empty();
    $('#programDetailsBody').append(toAppend);
    
    
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
        '<button onclick="addProgramToDiary('+idNum+')" type="button" class="btn btn-primary">Add</button>';
    
    $('#programDetailscontrols').empty();
    $('#programDetailscontrols').append(buttons);
    
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#programDetails').modal(options);
    

}

function programClearDay(){
   
   var day = lastCallertoWorkoutSearch.replace("newprogramday", "");
   delete globalWorkoutsToAdd[day];
   var divid= "#"+lastCallertoWorkoutSearch;
   $(divid).val("Rest day.");   
    
}

function displayWorkoutSearchModal(day,callerid){
    lastCallertoWorkoutSearch = callerid;
    
    $('#programDay').empty();
    $('#programDay').append("Update day: " + day);
    
    
    $('#modalProgramEdit').modal('hide');
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#modalDisplayWorkoutSearch').modal(options);
}

function modalProgramEdit(idNum,duration){

    var workouts = globalProgramWorkouts[idNum];
    
    $("#updateProgramName").val();
    
    $("#updateProgramDuration").val(duration);
    
    $("#programWorkouts").empty();

    for (count = 1; count <= duration; count++){
        $("#programWorkouts").append('<div onclick="displayWorkoutSearchModal('+"'"+count+"','"+count+'programday'+idNum+"'"+')" id="'+count+'program'+idNum+'"><p>Day: '+count+'</p><input id="'+count+'programday'+idNum+'" class="w-input" type="text" placeholder="Rest day." name="Program Name" required="required" data-name="programename"></div>');
  
    }
        
    for (workout in workouts){
        
        var workoutDay = workouts[workout]['day'];
        var divId = '#'+workoutDay+'program'+idNum;
        var inputId = '#'+workoutDay+'programday'+idNum;
        
        var workoutObj = mlpObject.getWorkouts({id:workouts[workout]['workoutid']}).result;
        var workoutName = workoutObj['data'][0]['name'];
        $(inputId).val(workoutName);
    }
    
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#modalProgramEdit').modal(options);
}
var globalWorkoutObjs;

function workoutSeach(){
    var searchTerms =['name','userid'];
    var searchTerm= (document.getElementById("workoutsearchterm").value.toString()).trim();
    document.getElementById("searchresultsWorkouts").innerHTML = "";
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

function updateModalProgramAdd(pId,programNam)
{

    $("#myModalLabelWorkoutAdd").empty();
    $("#myModalLabelWorkoutAdd").append("Add " + programNam + " To:");
    
    $("#modalWorkoutAddTo").empty();
    
    var tempString="'#basicModalAddWorkout'";
    var calanderData=[pId,tempString];
    
    var toAppend ='';
     toAppend += '<h3 onclick='+'"addProgramToDiary('+pId+')"><i class="fa fa-book"></i>Current Day</h3>'+
                            '<p style="color:#77b2c9">or</p>'+
                            '<h3 onclick="calanderModal(['+calanderData+'])"><i class="fa fa-calendar"></i>Select Day</h3>';
    $("#modalWorkoutAddTo").append(toAppend);
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalAddWorkout').modal(options);
}

function addProgramToDiary(inputID){
    messageModal('#basicModalAddWorkout');
    try{
        console.log(mlpObject.addResults({programid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);
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
    toAppend +='<div style="width:70%;float:left" onclick="addMyProgramDetails(' + "'" +'myPrograms'+mpo[objects]['id']+"'"+','+mpo[objects]['duration']+",'"+mpo[objects]["name"]+"'"+')">';
    toAppend +='<h3 style="text-align:left;;padding: 8px;" >'+mpo[objects]['name'];
    toAppend +='&nbsp;&nbsp;<i class="fa fa-list"></i>';
    toAppend +='</h3><p style="margin-top: -20px;  font-size: 10px;margin-left: -50px;">Duration: '+mpo[objects]["duration"]+'Day(s)</p></div>';
    
    
    toAppend +='<a href="javascript:updateModalProgramAdd('+mpo[objects]['id']+",'"+mpo[objects]['name']+"'"+');" style="width:60px; margin-bottom: 4px; z-index:10;" class="btn btn-default btn-circle-main">';
    toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
    toAppend +='</a>';
    toAppend +='';
    toAppend +='<div id="myPrograms'+mpo[objects]['id']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';


    toAppend+="</div><hr>";
    
    $("#myPrograms").append(toAppend);
    }
}

//create Program
function submitCreateProgramForm(){
    var sProgramName;
    var duration = $('#programDuration').val();
    console.log(duration);
    var temp;
//    var addExercises = []; 
    
    try {
        sProgramName = document.getElementById("cProgramName").value; 
        if(sProgramName.trim() ===""){
            document.getElementById("errorCreatingProgram").innerHTML="Please Enter Name for Program!";
            return;
        }
        
        if(duration < 1 || duration > 365){
            document.getElementById("errorCreatingProgram").innerHTML="Duration must be bewteen 1-365 days!";
            return;
        }

        if (mlpObject !== null){ 
            console.log("In Create new program loop.");
            //name
            var newProgram = mlpObject.createProgram({name:sProgramName, duration:duration});
                var npi = newProgram['result']['data']['id'];
                if(globalWorkoutsToAdd !== {}){
                    console.log("in add exercises to new Workoutout:");
                    for (key in globalWorkoutsToAdd){    
                        if (globalWorkoutsToAdd.hasOwnProperty(key)) {

                            console.log(globalWorkoutsToAdd[key]);
                            console.log(key);
                            
                            try{
                            temp = mlpObject.addWorkout({workoutid:globalWorkoutsToAdd[key], day:key, programid:npi});
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
        displayMyPrograms();
        sProgramName = null; 
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
function programDuration(dur){
    $("#newProgramWorkouts").empty();
    for (i = 1; i <= dur; i++){
        $("#newProgramWorkouts").append('<div onclick="displayWorkoutSearchModal('+"'"+i+"','"+i+'newprogramday'+"'"+')" id="'+i+'newprogram"><p>Day: '+i+'</p><input id="'+i+'newprogramday" class="w-input" type="text" placeholder="Rest day." name="Program Name" required="required" data-name="programename"></div>');
  
    }
//    $('#programWorkouts')
    
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