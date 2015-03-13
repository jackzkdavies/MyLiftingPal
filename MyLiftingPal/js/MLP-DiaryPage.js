//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

//Global Variables 
var day ;
var date ;                 
var month ;            
var year ;
var fullDate;
var globalExerciseObjs; 
var globalWorkoutObjs;
var globalProgramObjs; 
var firstMainPageAddClicked=false;
var toggleSpeed = window.localStorage.getItem("toggleSpeed");
toggleSpeed=0;
var submitDairySearchClass= 'e';
var displayUnits = window.localStorage.getItem("displayUnits");
if (displayUnits === null){displayUnits = 'kg';}
var toggleList={};
var recordsList={};

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

//function dateScroll(i){
//    if(i >= 1){
//        if(day < 6){day += 1;}else{day = 0;}
//        date+= 1;
//        var realDate = new Date(date, month - 1, year); 
//        date+= 1;
//        var fullDate = days[day] + ", " + date +monthPrefix[date-1]+ " " + months[month]+", "+year;
//        
//        $('#datePicker').datepicker('setDate', realDate);
//        document.getElementById("date").innerHTML = "<span style='color:#77b2c9'><i class='fa fa-caret-left'></i> </span> " + fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-right'></i></span>";
//        checkResults();
//    }
//    else{
//        var realDate = new Date(day - 1, month - 1, year);
//        date+= -1;
//        var fullDate = days[day-1] + ", " + date +monthPrefix[date-1]+ " " + months[month]+", "+year;
//        
//        $('#datePicker').datepicker('setDate', realDate);
//        document.getElementById("date").innerHTML = "<span style='color:#77b2c9'><i class='fa fa-caret-left'></i> </span> " + fullDate + "<span style='color:#77b2c9'> <i class='fa fa-caret-right'></i></span>";
//        checkResults();
//    }
//
//
////$('#datePicker').datepicker({ dateFormat: 'yy-mm-dd' }); // format to show
//  
//}


function centerCalander(){
    var t = document.getElementById("date-Picker");
    t.style.backgroundColor="#77b2c9";
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

function toggleDropDownArrow(i){
    if (i.classList.contains('w--open')=== true){
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp;<i class="fa fa-caret-up"></i>';
    }
}


function checkResults(){
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
                test=[];
                
                
                
                var myResId="myResExNameDiv"+myDiaryResults['data'][myRes]['exerciseid'];
                
                
                
                
  
                
                if (document.getElementById(myResId) == null ){
                    
                    
                    if (myRes != 0 ){
                        
                        test.push([myDiaryResults['data'][myRes]['records']]);
                        toAppend +="<div style=''><hr style='width:100%;float:left;  border-top:3px solid #77b2c9; margin-top: 20px; */' /></div>";} 
                    toAppend += '<div style="width:100%; float:left">'+
                        '<div id="'+myResId+'" onclick="toggle('+"'"+myResId+"Second"+"'"+')" style="width:100%; float:left"><h3 style="text-align:left">'+
                            myDiaryResults['data'][myRes]['name']+
                            '</h3>';
                            toAppend += bestVolume(myDiaryResults['data'][myRes]['exerciseid'])+'</div>';
//                            '<div style="width:60%; float:left"><h3 style="text-align:right;font-size:50px">'+
//                                '<i class="fa fa-plus-circle"></i>&nbsp;'+
//                                '<i class="fa fa-pencil"></i>&nbsp;'+
//                                '<i class="fa fa-cog"></i></h3>'+
//                            '</div>'+
//                        '';
                        
            
                    toAppend +='<div id="'+myResId+"Second"+'" style="width:100%"><div style="width:100%; float:left"><br>'+
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
                            '</div><br><hr></div></div><div id="'+myResId+"Third"+'"></div> ';
                            
                            
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
//                var resId="#"+myResId+"Third";
                var resId=myResId+"Third"
                toAppend = '';
                toAppend += '<div id="DiaryControls'+myResId+'Second" style="width:100%;" >'+
                '<a href="javascript:diaryModalAddSet('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 5px;padding-left: 1px; width:60px; margin-bottom: 4px; background-color: white; color:#77b2c9" class="btn btn-default btn-circle-main"  title="Add Result to your Exercise"><i class="fa fa-plus"></i></a>'+
                '<a href="javascript:diaryModalDelete('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 5px; width:60px; margin-bottom: 4px; background-color: #ff6666; color:white" class="btn btn-default btn-circle-main" title="Delete exercise from your diary"><i class="fa fa-times"></i></a>'+
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
        var toAppend="";
            
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

        try{
            if (typeof records[record]['overall']['max'] !='undefined'){
            toAppend ='<p>Best '+records[record]['overall']['rep']+' RM recorded: '+records[record]['overall']['max']+displayUnits+'</p><br>';
            $("#modalHistoryRecords").append(toAppend);
    
            }
        }
        catch(e){ console.log(e); }

        try{
            if (typeof records[record]['backoffs']['best'] !='undefined'){
            toAppend ='<p>Best volume for '+records[record]['overall']['rep']+' rep sets: '+ records[record]['backoffs']['best'] +displayUnits+'</p><br>';
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
            toReturn='<div>'+
                    'Best Volume: '+(volume)+displayUnits+' @ '+results[res]['weight']+displayUnits+' for '+results[res]['reps']+' reps.'+
                    '</div>';
            }
    }
    return toReturn;
    }
    catch(e){console.log(e);}
}

function diaryModalAddSet(inputID){
    $("#basicModalAddSetButtons").empty();

    var records = recordsList[inputID][0];


    document.getElementById("updateModalAddRep").value = records[0]['amrap']['reps'];
    document.getElementById("updateModalAddSet").value = $("#myResExNameDiv2Second> div").length+1;
    document.getElementById("updateModalAddWeight").value = records[0]['amrap']['weight'];
    document.getElementById("updateModalAddRPE").value = records[0]['amrap']['rpe'];
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
      if(firstMainPageAddClicked === false){
        document.getElementById('mainExSearch').style.color='#77b2c9';
        document.getElementById('mainWorkSearch').style.color='#333';
        document.getElementById('mainProSearch').style.color='#333';  
        document.getElementById("mainSearchTerm").placeholder="Select Exercise to add";
        firstMainPageAddClicked = true;  
      }
    
     var t = $("#addToMyDiaryDropdown").is(':visible');

     $("#addToMyDiaryDropdown").slideToggle(toggleSpeed);
     if ( t === true){
         
        document.getElementById('mainPageAddButton').style.color='white';
        document.getElementById('mainPageAddButton').style.background='#77b2c9';
     }
     else{
 
        document.getElementById('mainPageAddButton').style.color='#77b2c9';
        document.getElementById('mainPageAddButton').style.background='white';}

    
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
        toAppend += "<tr onClick='addExToResults(["+resultData+"])'>";
       

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
    $("#mytableWorkouts").dataTable().fnDestroy();
    $("#searchresults").empty();
    $("#searchresultsWorkouts").empty();
    document.getElementById('mytableWorkouts').style.display='none';
    }
    catch(e){console.log(e);}
    
    $("#searchresults").append(toAppend);
    $('#mytable').DataTable({bFilter: false});
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
