//Create MLP object
var mlpObject = JSON.parse(window.localStorage.getItem("mlpObject"));

//Global Variables 
var globalExerciseObjs; 
var globalWorkoutObjs;
var globalProgramObjs; 
var firstMainPageAddClicked=false;
var submitDairySearchClass= 'e';
var displayUnits = window.localStorage.getItem("displayUnits");
var toggleList={};

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
    checkResults();
}

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
            console.log(div);
            $(div).slideToggle(0);
            
//            var test="#DiaryControls"+key;
//            console.log(test); 
//            if (divID.indexOf("Second") != -1) {
//            $(test).slideToggle(400);
//            }
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
    $(div).slideToggle(0);
}

function slideToggleCalender(){
    $(".calender").slideToggle(800);
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

function mainPageAdd(){
      if(firstMainPageAddClicked === false){
        document.getElementById('mainExSearch').style.color='#77b2c9';
        document.getElementById('mainWorkSearch').style.color='#333';
        document.getElementById('mainProSearch').style.color='#333';  
        document.getElementById("mainSearchTerm").placeholder="Select Exercise to add";
        firstMainPageAddClicked = true;  
      }
    
     var t = $("#addToMyDiaryDropdown").is(':visible');

     $("#addToMyDiaryDropdown").slideToggle(400);
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

function checkResults(){
    $("#myDairyResults").empty();
    document.getElementById("noResults").innerHTML = "";
    try{
        var myDiaryResults = mlpObject.selectResults({assigneddate:year+"-"+(month+1)+"-"+date}).result;
        if (myDiaryResults['success'] === false){
            document.getElementById("noResults").innerHTML = "Rest day is it?";
        }
        else{
            
//            console.log(myDiaryResults);
            
            $("#myDairyResults").append('<div><br></div>');
            
            for (myRes in myDiaryResults['data']){
                var toAppend ="";
                
                
                
                var myResId="myResExNameDiv"+myDiaryResults['data'][myRes]['exerciseid'];
                
                 
                
                if (document.getElementById(myResId) == null ){
                    if (myRes != 0 ){toAppend +="<div style=''><hr style='width:100%;float:left;  border-top:3px solid #77b2c9; margin-top: 20px; */' /></div>";} 
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
                            '<div onclick="toggle('+"'"+myResId+myDiaryResults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" >'+
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

                    toAppend +='<div style="width:100%; float:left"><br>'+
                            '<div onclick="toggle('+"'"+myResId+myDiaryResults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" onclick="toggle('+"'"+myResId+myDiaryResults['data'][myRes]['id']+"'"+')">'+
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
        console.log(mlpObject.changeResults({id:inputID, reps:rep, sets:set, weight:wei, rpe:rp, percentage:rm}).result);
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
    
    console.log(result);
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
    "backdrop" : "static",
    "show":"true"};
    $('#modalEditDiaryResult').modal(options);
    
}

function diaryModalHistory(inputID){
    var records = mlpObject.selectResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result['data'];
//    console.log (mlpObject.selectResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);


    for (record in records){
        $("#modalHistoryRecords").empty();
        var toAppend="";
            
        try{
            if (typeof records[record]['records']['amrap']['weight'] !='undefined'){
            toAppend = '<p>Best Reps with '+records[record]['records']['amrap']['weight']+displayUnits+': '+records[record]['records']['amrap']['reps']+
                    ' @RPE '+records[record]['records']['amrap']['rpe']+'</p><br>';
            $("#modalHistoryRecords").append(toAppend);
            }
        
        }
            catch(e){ console.log(e);}
        
        try{
            if (typeof records[record]['records']['overall']['max'] !='undefined'){
            toAppend ='<p>1RM (estimated): '+records[record]['records']['overall']['max']+displayUnits+'</p><br>';
            $("#modalHistoryRecords").append(toAppend);
    
            }
        }
        catch(e){ console.log(e); }

        try{
            if (typeof records[record]['records']['backoffs']['best'] !='undefined'){
                console.log(records[record]['records']['backoffs']['best']);
            toAppend ='<p>Best volume for current weight '+ records[record]['records']['backoffs']['best'] +displayUnits+'</p><br>';
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
                
    console.log(records[record]['records']);

    var options = {
    "backdrop" : "static",
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
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalDelete').modal(options);
    
}

function deleteModalDiaryResult(inputID){
    console.log(inputID);
    console.log(mlpObject.removeResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}));
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
        console.log(maxVolume);
        if(volume < 0){
            volume = volume*(-1);
        }
        if((volume) > maxVolume){
            maxVolume = volume;
            console.log(results[res]);
            toReturn='<div>'+
                    'Best Volume: '+(volume)+displayUnits+' @ '+results[res]['weight']+displayUnits+' for '+results[res]['reps']+' reps.'+
                    '</div>';
            }
    }
    console.log(toReturn);
    return toReturn;
    }
    catch(e){console.log(e);}
}

function diaryModalAddSet(inputID){
    console.log(inputID);
        
    
    $("#basicModalAddSetButtons").empty();
//    var delBut = '<button onclick="deleteExercise('+inputId+')" type="button" class="btn btn-primary">Delete</button>';
//    $("#basicModalAddSetButtons").append(delBut);
    

    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="addModalDiaryResult('+inputID+')" type="button" class="btn btn-primary">Add</button>';
    $("#basicModalAddSetButtons").append(buttons);
    
    var options = {
    "backdrop" : "static",
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
        console.log(mlpObject.addResults({workoutid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);
    }
    catch(e){
        
    } 
}

//Code Section for Diary Searchs
function submitDairySearch(){
    if (submitDairySearchClass === 'e'){
        dairyPageExSearch();
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
    $("#searchresults").empty();
    }
    catch(e){console.log(e);}
    
    $("#searchresults").append(toAppend);
    $('#mytable').DataTable({bFilter: false});
    document.getElementById('mytable').style.display='table';
    document.getElementById('searchResultsHeading').innerHTML='<div style="line-height:50px">Search results for: '+searchTerm+'</div>';
    
    }
    catch(e){console.log(e);}
    finally{};
}

function diaryPageWorkoutSeach(){
    
}
