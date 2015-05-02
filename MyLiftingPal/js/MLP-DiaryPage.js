//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com

var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
var user = JSON.parse(localStorage.getItem('user'));
var notifications = user['data']['requests'];
var displayUnits  = user['data']['units'];

var day ;
var date ;                 
var month ;            
var year ;
var fullDate;

var globalExerciseObjs; 
var globalWorkoutObjs;
var globalProgramObjs; 

var firstMainPageAddClicked=false;
var submitDairySearchClass= 'e';

var currentTotals={};

window.localStorage.setItem("lastFriendView", null);
//var displayUnits = window.localStorage.getItem("displayUnits");

var toggleList={};
var recordsList={};
var toggleSpeed=0;

//Code section for checking login state
function checkLoginStatus(){
    var locationTest = [(window.location.pathname).toLocaleString(), "/index.html"];
    if (user['success'] == true){
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

function logout(){
    mlpObject.logout();
    localStorage.clear();
    window.location.replace("index.html");
}
//Code section for date and calander 


function setVarDate(){
    var days= ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"]; 
    var months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    var monthPrefix = ["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];

    day = $("#date-Picker").datepicker('getDate').getDay();
    date = $("#date-Picker").datepicker('getDate').getDate();                 
    month = $("#date-Picker").datepicker('getDate').getMonth();             
    year = $("#date-Picker").datepicker('getDate').getFullYear();
    fullDate = days[day] + ", " + date +monthPrefix[date-1]+ " " + months[month]+", "+year;

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

function toggleDropDownArrow(i){
    if (i.classList.contains('w--open')=== true){
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp;<i class="fa fa-caret-up"></i>';
    }
}


function checkResults(){
    currentTotals={};
    var firstDiv=true;
    var test = [];
    recordsList={};
    $("#myDairyResults").empty();
    document.getElementById("noResults").innerHTML = "";
    try{
        var myDiaryResults = mlpObject.selectResults({assigneddate:year+"-"+(month+1)+"-"+date}).result;
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
                            toAppend+='% <i class="fa fa-pencil-square-o" style="color: rgb(119, 178, 201);margin-left: 4px;margin-right: -8px;"></i></div></div>'+
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
                            toAppend+='% <i class="fa fa-pencil-square-o" style="color: rgb(119, 178, 201);margin-left: 4px;margin-right: -8px;"></i></div></div>'+
                            '<div id="'+myResId+myDiaryResults['data'][myRes]['id']+'" style="display:none;">'+
                            
                            '<div style=" margin-bottom: -35px;"><a href="javascript:diaryEditExercise('+myDiaryResults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div>';
                            
                            var resId="#"+myResId+"Second";

                            $(resId).append(toAppend);
                            
                    
                }                               
//                var resId="#"+myResId+"Third";
                currentTotalVolumeCalc(myDiaryResults['data'][myRes]);
                var currentTotalVolume = currentTotals[myDiaryResults['data'][myRes]['exerciseid']];
                var resId=myResId+"Third";
                toAppend = '';
                toAppend += '<div id="DiaryControls'+myResId+'Second" style="width:100%;" >'+
                        '<p>Current Total Volume: <span style="font-weight:600">'+currentTotalVolume+'</span></p>'+
                '<a href="javascript:diaryModalAddSet('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 5px;padding-left: 1px; width:60px; margin-bottom: 4px; background-color: white; color:#77b2c9" class="btn btn-default btn-circle-main"  title="Add Result to your Exercise"><i class="fa fa-plus"></i></a>'+
                '<a href="javascript:diaryModalDelete('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 5px; width:60px; margin-bottom: 4px; background-color: #ff6666; color:white" class="btn btn-default btn-circle-main" title="Delete exercise from your diary"><i class="fa fa-trash"></i></a>'+
                '<a href="javascript:diaryModalHistory('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 5px; width:60px; margin-bottom: 4px; background-color: #66cc66; color:white" class="btn btn-default btn-circle-main"  title="View your log for this exercise"><i class="fa fa-book"></i></a>'+
//                '<a href="javascript:void(0);" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a>'+
                '</div>';
                document.getElementById(resId).innerHTML =toAppend;
//                $(resId).append(toAppend);

                
                recordsList[myDiaryResults['data'][myRes]['exerciseid']]=test;
            
     
            }

                
        }
        
            
        
    }
    catch(e){
        console.log(e);
    }
    toggleListActivate();
}

function currentTotalVolumeCalc(diaryres){

    if (currentTotals[diaryres['exerciseid']] == null){
        currentTotals[diaryres['exerciseid']] = (parseInt(diaryres['weight']) * parseInt(diaryres['reps']));
    }
    else{
        
    currentTotals[diaryres['exerciseid']] = (parseInt(currentTotals[diaryres['exerciseid']]) + (parseInt(diaryres['weight']) * parseInt(diaryres['reps'])));
}
    
}
function updateDiaryResults(inputID){
    try{
        var rep=document.getElementById("updateModalChangeRep").value;
        var set=document.getElementById("updateModalChangeSet").value;
        var wei=document.getElementById("updateModalChangeWeight").value;
        var rp=document.getElementById("updateModalChangeRPE").value;
        var rm=document.getElementById("updateModalChangeRM").value;
        
        
        //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage,assigneddate
        mlpObject.changeResults({id:inputID, reps:rep, sets:set, weight:wei, rpe:rp, percentage:rm}).result;
        $('#modalEditDiaryResult').modal('hide');
        checkResults();
    }
    catch(e){}
    
}

function diaryRemoveResults(inputID){
    try{
        mlpObject.removeResults({id:inputID});
        $('#modalEditDiaryResult').modal('hide');
        checkResults();
    }
    catch(e){}
}

function diaryEditExercise(inputID){
    var result = mlpObject.selectResults({id:inputID}).result['data'][0];
    

    document.getElementById("updateModalChangeRep").value = result['reps'];
    document.getElementById("updateModalChangeSet").value = result['sets'];
    document.getElementById("updateModalChangeWeight").value = result['weight'];
    document.getElementById("updateModalChangeRPE").value = result['rpe'];
    document.getElementById("updateModalChangeRM").value = result['percentage'];
    $("#basicModalUpdateButtons").empty();

    var buttons='<button onclick="diaryRemoveResults('+inputID+')" type="button" style="background-color:#ff6666;border-color:#ff6666" class="btn btn-primary">Remove</button>'+
            '<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="updateDiaryResults('+inputID+')" type="button" class="btn btn-primary">Update</button>';
    $("#basicModalUpdateButtons").append(buttons);
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#modalEditDiaryResult').modal(options);
    
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

function diaryModalDelete(inputID){
    
    $("#basicModalDeleteButtons").empty();
//    var delBut = '<button onclick="deleteExercise('+inputId+')" type="button" class="btn btn-primary">Delete</button>';
//    $("#basicModalAddSetButtons").append(delBut);
    

    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="deleteModalDiaryResult('+inputID+')" type="button" class="btn btn-primary">Remove</button>';
    $("#basicModalDeleteButtons").append(buttons);
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#basicModalDelete').modal(options);
    
}

function deleteModalDiaryResult(inputID){
    mlpObject.removeResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date});
    $('#basicModalDelete').modal('hide');
    checkResults();
    
}

function addModalDiaryResult(inputID){
    try{
        var rep=document.getElementById("updateModalAddRep").value;
        var set=document.getElementById("updateModalAddSet").value;
        var wei=document.getElementById("updateModalAddWeight").value;
        var rp=document.getElementById("updateModalAddRPE").value;
        var rm=document.getElementById("updateModalAddRM").value;
        
        
        //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage,assigneddate
        mlpObject.addResults({exerciseid:inputID, reps:rep, sets:set, weight:wei, rpe:rp, percentage:rm, assigneddate:year+"-"+(month+1)+"-"+date});
        $('#basicModalAddSet').modal('hide');
        checkResults();
    }
    catch(e){}
    
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

function diaryModalAddSet(inputID){
    $("#basicModalAddSetButtons").empty();

    var records = recordsList[inputID][0][0];

    var temp = 'myResExNameDiv'+inputID+'Second';
    document.getElementById("updateModalAddRep").value = records['amrap']['reps'];
    document.getElementById("updateModalAddSet").value = document.getElementById(temp).childNodes.length +1;
    document.getElementById("updateModalAddWeight").value = records['amrap']['weight'];
    document.getElementById("updateModalAddRPE").value = records['amrap']['rpe'];
//    document.getElementById("updateModalAddRM").value = result['percentage'];

    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="addModalDiaryResult('+inputID+')" type="button" class="btn btn-primary">Add</button>';
    $("#basicModalAddSetButtons").append(buttons);
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#basicModalAddSet').modal(options);
}

function addExToResults(data){
    
    var exID = data[0];
    var tdate = (data[1]+"-"+data[2]+"-"+data[3]);
    var rep= data[4];
    var set= data[5];
    var rp= data[6];
    var weig= data[7];
    var per= data[8];

    try{
        //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage,assigneddate
        mlpObject.addResults({exerciseid:exID,assigneddate:tdate, reps:rep,sets:set, rpe:rp, weight:weig, percentage:per}).result;
        checkResults();
    }
    
    catch(e){
        
    }
}

function addWorkoutToDiary(inputID){
    try{
        mlpObject.addResults({workoutid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result;
        $('#modalDisplayWorkoutExercies').modal('hide');
        checkResults();
    }
    catch(e){
        
    } 
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
function mainPageAdd(){
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#addModal').modal(options);
    
      if(firstMainPageAddClicked === false){
        document.getElementById('mainExSearch').style.color='#77b2c9';
        document.getElementById('mainWorkSearch').style.color='#333';
        document.getElementById('mainProSearch').style.color='#333';  
        document.getElementById("mainSearchTerm").placeholder="Select Exercise to add";
        firstMainPageAddClicked = true;  
      }
    


    
}



function infoDataModal(data){
    console.log(data);
    document.getElementById("infoDataModalBody").innerHTML = data;
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#infoDataModal').modal(options);
    

    $('#addModal').hide();
}


function viewFriend(id){
    window.localStorage.setItem("lastFriendView", id);
    console.log(window.localStorage.getItem("lastFriendView"));
    window.location.replace("friendsProfile.html");
}






function mainSearchEx(inp){

    if (inp === 'e'){   
        document.getElementById('mainExSearch').style.color='#77b2c9';
        document.getElementById('mainWorkSearch').style.color='#333';
        document.getElementById('mainProSearch').style.color='#333';  
        document.getElementById("mainSearchTerm").placeholder="Select Exercise to add";
        submitDairySearchClass= 'e';
    }
    else if (inp === 'w'){   

        document.getElementById('mainExSearch').style.color='#333';
        document.getElementById('mainWorkSearch').style.color='#77b2c9';
        document.getElementById('mainProSearch').style.color='#333';
        document.getElementById("mainSearchTerm").placeholder="Select Workout to add";
        submitDairySearchClass= 'w';
    }
    else if (inp === 'p'){   
        document.getElementById('mainExSearch').style.color='#333';
        document.getElementById('mainWorkSearch').style.color='#333'; 
        document.getElementById('mainProSearch').style.color='#77b2c9';
        document.getElementById("mainSearchTerm").placeholder="Select Programme to add";
        submitDairySearchClass= 'p';
    }
    
}


function submitDairySearch(){
    if (submitDairySearchClass === 'e'){
        dairyPageExSearch();
    }
    
    if (submitDairySearchClass === 'w'){
        diaryPageWorkoutSeach();
    }
    
    if (submitDairySearchClass === 'p'){
        programSearch();
    }
    
}
function dairyPageExSearch(){
    var searchTerms =['name','musclegroup','type'];
    var searchTerm= (document.getElementById("mainSearchTerm").value.toString()).trim();
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
                  
        var dat =(year+'-'+(month+1)+'-'+date);

        var useDate=[year,(month+1),date];
        var resultData=[key,useDate,1,1,1,1,1];
        var infoData='';
        toAppend += "<tr >";
       

        for (st in searchTerms){
            
   
            if (searchTerms[st] === 'userid'){
//                toAppend += mlpObject.getUsers({id:results[obj][searchTerms[st]]}).result['data']['username'];

            }
            if (searchTerms[st] === 'name'){
                toAppend += "<td>";
                toAppend += globalExerciseObjs[key][searchTerms[st]];
                toAppend += "</td>";
            }
            
            else if (searchTerms[st] === 'musclegroup'){

                infoData += '<h5>Muscle Group(s)</h5><p>'+(globalExerciseObjs[key][searchTerms[st]]).toString()+'</p>';
                
            }
            
            else if (searchTerms[st] === 'type'){
                toAppend += "<td>";
                infoData += '<h5>Type(s)</h5><p>'+(globalExerciseObjs[key][searchTerms[st]]).toString()+'</p>';
                toAppend += '<i class="fa fa-info-circle" onClick="infoDataModal('+"'"+infoData+"'"+')"></i>';
                toAppend += "</td>";
                
                toAppend += "<td>";
                toAppend += '<i class="fa fa-plus-circle" onClick="addExToResults(['+resultData+'])"></i>';
                toAppend += "</td>";
            }
            
        }
        
        toAppend += "</tr>";

    }}
    
    try{
    $("#mytable").dataTable().fnDestroy();
    $("#mytableWorkouts").dataTable().fnDestroy();
    $("#programSearchTable").dataTable().fnDestroy();
    $("#searchresults").empty();
    $("#searchresultsWorkouts").empty();
    document.getElementById('mytableWorkouts').style.display='none';
    }
    catch(e){console.log(e);}
    
    $("#searchresults").append(toAppend);
    $('#mytable').DataTable({bFilter: false,"dom": '<"top"i>rt<"bottom"flp><"clear">',
        "ordering": false,
        "info":     false});
    document.getElementById('mytable').style.display='table';
    document.getElementById('searchResultsHeading').innerHTML='<div style="line-height:50px">Search results for Exercise: '+searchTerm+'</div>';
    
    }
    catch(e){console.log(e);}
    finally{};
}

function diaryPageWorkoutSeach(){
    var searchTerms =['name','userid'];
    var searchTerm= (document.getElementById("mainSearchTerm").value.toString()).trim();
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
    $("#programSearchTable").dataTable().fnDestroy();
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
        $("#mytable").dataTable().fnDestroy();
        $("#mytableWorkouts").dataTable().fnDestroy();
        $("#programSearchTable").dataTable().fnDestroy();
        $("#searchResultsProgram").empty();
        document.getElementById('programSearchTable').style.display='none';
    }
    catch(e){console.log(e);}
    
    
    var searchTerms =['name','userid'];
    var searchTerm= (document.getElementById("mainSearchTerm").value.toString()).trim();
    
    if (searchTerm ===""){
        $("#failedProgramSearch").append("Please enter a search term");
        return;
    }
    
    globalProgramObjs={};
    try{
    document.getElementById('searchResultsHeading').innerHTML='<div style="line-height:50px">Search results for Program: '+searchTerm+'</div>';
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

function updateModalProgramAdd(pId,programNam){
    $('#addModal').modal('hide');

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
