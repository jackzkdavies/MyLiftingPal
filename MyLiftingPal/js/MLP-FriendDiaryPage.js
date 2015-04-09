//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

//User data
var user = mlpObject.getUser().result;
var notifications = user['data']['requests'];
var displayUnits  = user['data']['units'];

//Global Friend Variables 
var friend = mlpObject.getUsers({id:window.localStorage.getItem("lastFriendView")}).result;

var friendUsername = friend['data']['username'];

var day ;
var date ;                 
var month ;            
var year ;
var fullDate;

var toggleSpeed = window.localStorage.getItem("toggleSpeed");
toggleSpeed=0;



var toggleList={};
var recordsList={};
//code for nav
$(window).scroll(function() {
  if ($(document).scrollTop() > 100) {
    $('#logoHeader').css({"margin-top":"-50px"});;
  } else {
    $('#logoHeader').css({"margin-top":"0px"});;
  }
});
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

function logout(){
    mlpObject.logout();
    window.location.replace("index.html");
}
//code for nav
$(window).scroll(function() {
  if ($(document).scrollTop() > 100) {
    $('#logoHeader').css({"margin-top":"-50px"});;
  } else {
    $('#logoHeader').css({"margin-top":"0px"});;
  }
});
//Code section for date and calander 
    var days= ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"]; 
    var months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    var monthPrefix = ["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];

function setVarDate(){

    day = $("#date-Picker").datepicker('getDate').getDay();
    date = $("#date-Picker").datepicker('getDate').getDate();                 
    month = $("#date-Picker").datepicker('getDate').getMonth();             
    year = $("#date-Picker").datepicker('getDate').getFullYear();
    fullDate = days[day] + ", " + date +monthPrefix[date-1]+ " " + months[month]+", "+year;

//    document.getElementById("date").innerHTML = "<span style='color:#77b2c9'><i class='fa fa-caret-left'></i> </span> " + fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-right' onclick='dateScroll(1)'></i></span>";
    if ($(".calender").is(':hidden')){
        document.getElementById("date").innerHTML = fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-down'></i></span>";

    }
    else{
        document.getElementById("date").innerHTML = fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-up'></i></span>";

    }
    
    checkResults();
}

function centerCalander(){
    var t = document.getElementById("date-Picker");
    t.style.backgroundColor="white";
//    t.style.paddingLeft=0;
//    var sw= screen.availWidth;
//    var tw = $("div.calender table").width();
//    var dpw = $("div.datepicker").width();
//    if (tw !== 0){
//            if(tw===217){
//            t.style.paddingLeft= ((sw-tw)/2)-22+'px';
//            t.style.backgroundColor="#77b2c9";
//        }
//        else{
//            t.style.paddingLeft= ((sw-tw)/2)-25+'px';
//            t.style.backgroundColor="#77b2c9";
//        }
//    }
//    else{
//        t.style.paddingLeft= ((sw-dpw)/2)-10+'px';
//        t.style.backgroundColor="#77b2c9";
//    }
}

//Code section for setting toggle states
function toggleListActivate(){

    try{
    for (var key in toggleList) {
      if (toggleList.hasOwnProperty(key)) {
        if(toggleList[key]===true){
            var div="#"+key;
            $(div).slideToggle(toggleSpeed);
        }
        
      }
    }
    }
    catch(e){console.log(e);}
}

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
    $(div).slideToggle(toggleSpeed);
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

function checkResults(){
    $('#diaryOwner').empty();
    $('#diaryOwner').append(friendUsername+"'s Diary");
    var firstDiv=true;
    var test = [];
    recordsList={};
    $("#myDairyResults").empty();
    document.getElementById("noResults").innerHTML = "";
    try{
        var myDiaryResults = mlpObject.selectResults({userid:window.localStorage.getItem("lastFriendView"), assigneddate:year+"-"+(month+1)+"-"+date}).result;
        console.log(window.localStorage.getItem("lastFriendView"),myDiaryResults);
        if (myDiaryResults['success'] === false){
            document.getElementById("noResults").innerHTML = "Rest day is it?";
        }
        else{
            
            
            $("#myDairyResults").append('<div><br></div>');
            
            for (myRes in myDiaryResults['data']){
                var toAppend ="";
                var test=[];
                
                
                
                var myResId="myResExNameDiv"+myDiaryResults['data'][myRes]['exerciseid'];
                
                
                
                
  
                
                if (document.getElementById(myResId) == null ){
                    
                    
                    if (myResId != 0 ){
                        
                        test.push([myDiaryResults['data'][myRes]['records']]);
                        if (firstDiv == true){
                            firstDiv =false;
                            toAppend +="<div style=''></div>"; 
                        }
                        else{
                            toAppend +="<div style=''><hr style='width:100%;float:left;  border-top:3px solid #77b2c9; margin-top: 20px; */' /></div>"; 
                        }
                        }
                        toAppend += '<div style="width:100%; float:left">'+
                        '<div id="'+myResId+'" onclick="toggle('+"'"+myResId+"Second"+"'"+');toggle('+"'"+myResId+"Third"+"'"+')" style="width:100%; float:left"><h3 style="text-align:left">'+
                            myDiaryResults['data'][myRes]['name']+
                            '<i class="fa fa-pencil-square-o" style="  font-size: 15px;  padding-left: 10px;"></i> </h3>';
                            toAppend +='</div>';
//                            '<div style="width:60%; float:left"><h3 style="text-align:right;font-size:50px">'+
//                                '<i class="fa fa-plus-circle"></i>&nbsp;'+
//                                '<i class="fa fa-pencil"></i>&nbsp;'+
//                                '<i class="fa fa-cog"></i></h3>'+
//                            '</div>'+
//                        '';
                        
            
                    toAppend +='<div id="'+myResId+"Second"+'" style="display:none;width:100%"><div style="width:100%; float:left"><br>'+
                            '<div onclick="diaryEditExercise('+"'"+myDiaryResults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" >'+
                            myDiaryResults['data'][myRes]['reps']+
                            ' </div>'+
                            '<div class="exerciseSetDiv">'+
                            myDiaryResults['data'][myRes]['sets']+
                            ' </div>'+
                            ' <div class="exerciseWeightDiv">'+
                            myDiaryResults['data'][myRes]['weight']+
                            displayUnits+'  </div>'+
                            ' <div class="exerciseRPeDiv">'+
                            myDiaryResults['data'][myRes]['rpe']+
                            ' </div>'+

                            ' <div class="exercise1RMdiv">'+
                            myDiaryResults['data'][myRes]['percentage'];
                            toAppend+='%</div></div>'+
                            '<div id="'+myResId+myDiaryResults['data'][myRes]['id']+'" style="display:none; ">'+
                            '<div style=" margin-bottom: -35px; "><a href="javascript:diaryEditExercise('+myDiaryResults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div></div><div id="'+myResId+"Third"+'" style="display:none"></div> ';
                            
                            
                            $("#myDairyResults").append(toAppend);
                }
                else{
                    
                    test.push([myDiaryResults['data'][myRes]['records']]);
                    toAppend +='<div style="width:100%; float:left"><br>'+
                            '<div onclick="diaryEditExercise('+"'"+myDiaryResults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" onclick="toggle('+"'"+myResId+myDiaryResults['data'][myRes]['id']+"'"+')">'+
                            myDiaryResults['data'][myRes]['reps']+
                            ' </div>'+
                            '<div class="exerciseSetDiv">'+
                            myDiaryResults['data'][myRes]['sets']+
                            ' </div>'+
                            ' <div class="exerciseWeightDiv">'+
                            myDiaryResults['data'][myRes]['weight']+
                            displayUnits+'  </div>'+
                            ' <div class="exerciseRPeDiv">'+
                            myDiaryResults['data'][myRes]['rpe']+
                            ' </div>'+

                            ' <div class="exercise1RMdiv">'+
                            myDiaryResults['data'][myRes]['percentage'];
                            toAppend+='%</div></div>'+
                            '<div id="'+myResId+myDiaryResults['data'][myRes]['id']+'" style="display:none;">'+
                            
                            '<div style=" margin-bottom: -35px;"><a href="javascript:diaryEditExercise('+myDiaryResults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div>';
                            
                            var resId="#"+myResId+"Second";

                            $(resId).append(toAppend);
                            
                    
                }                               

                
                recordsList[myDiaryResults['data'][myRes]['exerciseid']]=test;
            
     
            }

                
        }
        
            
        
    }
    catch(e){
        console.log(e);
    }
    toggleListActivate();
}

function diaryModalHistory(inputID){
    var records = recordsList[inputID][0];
    
    
    
    for (record in records){
        $("#modalHistoryRecords").empty();
        var toAppend="<h5>Records for current weight</h5>";
        $("#modalHistoryRecords").append(toAppend);
            
        try{
            if (typeof records[record]['amrap']['weight'] !='undefined'){
            toAppend = '<p>Best Reps with '+records[record]['amrap']['weight']+displayUnits+': '+records[record]['amrap']['reps']+
                    ' @RPE '+records[record]['amrap']['rpe']+'</p><br>';
            $("#modalHistoryRecords").append(toAppend);
            }
        
        }
            catch(e){ console.log(e);}
        
//        try{
//            if (typeof records[record]['overall']['max'] !='undefined'){
//            toAppend ='<p>'+records[record]['overall']['rep']+'RM (estimated): '+records[record]['overall']['max']+displayUnits+'</p><br>';
//            $("#modalHistoryRecords").append(toAppend);
//    
//            }
//        }
        var toAppend="<h5>Overal Records</h5>";
        $("#modalHistoryRecords").append(toAppend);
        
        try{
            if (typeof records[record]['overall']['max'] !='undefined'){
            toAppend ='<p>Best '+records[record]['overall']['rep']+' RM recorded: '+records[record]['overall']['max']+displayUnits+'</p><br>';
            $("#modalHistoryRecords").append(toAppend);
    
            }
        }
        catch(e){ console.log(e); }

        try{
            if (typeof records[record]['backoffs']['best'] !='undefined'){
            toAppend ='<p>Best set volume for '+records[record]['overall']['rep']+' rep sets: '+ records[record]['backoffs']['best'] +displayUnits+'</p><br>';
                $("#modalHistoryRecords").append(toAppend);
    
            }
        }
        catch(e){ console.log(e);}
        
        try{
//            if(typeof records[record]['history']['sets'] != 'undefined'){
//            toAppend +='<p>Last time you did' + records[record]['history']['sets']+ 'x' +  records[record]['history']['reps'] + ' using ' + records[record]['history']['weight'] +displayUnits +'</p><br>';
//            }
        }
            catch(e){ console.log(e);}
        }
        bestVolume(inputID);
                

    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#basicModalHistory').modal(options);
}

function bestVolume(exId){
    var maxVolume=(-99999);
    var volume;
    var toReturn;
    try{
    var results = mlpObject.selectResults({exerciseid:exId}).result['data'];
    for(res in results){
        volume = (results[res]['weight']) * (results[res]['reps']);
        if(volume < 0){
            volume = volume*(-1);
        }
        if((volume) > maxVolume){
            maxVolume = volume;
            toReturn='<p>Best single set volume: '+(volume)+displayUnits+' @ '+results[res]['weight']+displayUnits+' for '+results[res]['reps']+' reps.</p>';
            }
    }

    $('#modalHistoryRecords').append(toReturn)
    return;
    }
    catch(e){console.log(e);}
}


//Code for modals
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

//Code for search section on diary page



function infoDataModal(data){
    console.log(data);
    document.getElementById("infoDataModalBody").innerHTML = data;
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#infoDataModal').modal(options);
    

    $('#addModal').hide();
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
function viewFriend(id){
    window.localStorage.setItem("lastFriendView", id);
    console.log(window.localStorage.getItem("lastFriendView"));
    window.location.replace("friendsProfile.html");
}
