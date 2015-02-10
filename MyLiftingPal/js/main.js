//Date
//$('.search-form-programs').keypress(function(e) {
//        if(e.which === 13) {
//            $('.search-programs .search-btn-programs').click();
//        }
//    });



//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
var globalExerciseObjs; 
var displayUnits = mlpObject.getUser().result['data']['units'];
//Toggling ful view of exercises with
function slideToggle(number){
    $(".tabsdiv"+number).slideToggle(400);
}

function toggle(divID){
    var div="#"+divID;
    $(div).slideToggle(400);
    
    var test="#DiaryControls"+divID;
    if (divID.indexOf("Second") != -1) {
        $(test).slideToggle(400);
}
}

function checkLoginStatus(){
//    if ($.cookie("mlpsession") === undefined){
//        window.location.replace("index.html");
//    }

var userData = mlpObject.getUser().result;

		if (userData["success"] === true){
		
			//logged in  
                        
		}
        else if (userData['errormsg'].indexOf('You are already logged in as') > -1){
                    window.location.replace("main-page.html");
                }
        else{
                   //window.location.replace("index.html");
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
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp;<i class="fa fa-caret-up"></i>';
    }
}
var d = new Date(); var date = d.getDate(); var day = d.getDay(); var year = d.getFullYear(); var month = d.getMonth();
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
var submitDairySearchClass= 'e';
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
//My Diary Page
var firstMainPageAddClicked=false;
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
            
            $("#myDairyResults").append('<div><br></div>')
            
            for (myRes in myDiaryResults['data']){
                var toAppend ="";
                
                
                
                var myResId="myResExNameDiv"+myDiaryResults['data'][myRes]['exerciseid'];

                if (document.getElementById(myResId) == null ){
                    if (myRes != 0 ){toAppend +="<div style=''><hr style='width:100%;float:left;  border-top:3px solid #77b2c9; margin-top: 20px; */' /></div>";} 
                    toAppend += '<div style="width:100%; float:left">'+
                        '<div id="'+myResId+'" onclick="toggle('+"'"+myResId+"Second"+"'"+')" style="width:100%; float:left"><h3 style="text-align:left">'+
                            myDiaryResults['data'][myRes]['name']+
                            '</h3></div>';
//                            '<div style="width:60%; float:left"><h3 style="text-align:right;font-size:50px">'+
//                                '<i class="fa fa-plus-circle"></i>&nbsp;'+
//                                '<i class="fa fa-pencil"></i>&nbsp;'+
//                                '<i class="fa fa-cog"></i></h3>'+
//                            '</div>'+
//                        '';
                        
            
                    toAppend +='<div id="'+myResId+"Second"+'" ><div style="width:100%; float:left"><br>'+
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
                            '<div style=" margin-bottom: -35px; "><a href="javascript:void(0);" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
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
                            '<div style=" margin-bottom: -35px;"><a href="javascript:void(0);" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div>';
                            
                            var resId="#"+myResId+"Second";

                            $(resId).append(toAppend);
                            
                    
                }                               
//                var resId="#"+myResId+"Third";
                var resId=myResId+"Third"
                toAppend = '';
                toAppend += '<div id="DiaryControls'+myResId+'Second" style="width:100%;" >'+
                '<a href="javascript:diaryModalAddSet('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 7px; width:60px; margin-bottom: 4px; background-color: white; color:#77b2c9" class="btn btn-default btn-circle-main"  title="Add Result to your Exercise"><i class="fa fa-plus"></i></a>'+
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
}
function diaryModalHistory(inputID){
    var records = mlpObject.selectResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result['data'];
//    console.log (mlpObject.selectResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);


    for (record in records){
        $("#basicModalHistoryBody").empty();
        var toAppend="";
            
        try{
            if (typeof records[record]['records']['amrap']['weight'] !='undefined'){
            toAppend += '<p>Best Reps with '+records[record]['records']['amrap']['weight']+displayUnits+': '+records[record]['records']['amrap']['reps']+
                    ' @RPE '+records[record]['records']['amrap']['rpe']+'</p><br>';
            }
        
        }
            catch(e){}
        
        try{
            if (typeof records[record]['records']['overall']['onerm'] !='undefined'){
            toAppend +='<p>1RM (estimated): '+records[record]['records']['overall']['onerm']+displayUnits+'</p><br>';
            }
        }
        catch(e){}

        try{
            if (typeof records[record]['records']['backoffs']['reps'] !='undefined'){
                console.log(records[record]['records']['backoffs']['reps']);
            toAppend +='<p>Best volume for '+ records[record]['records']['backoffs']['reps'] +' rep sets: ' + records[record]['records']['backoffs']['weight'] +displayUnits+'</p><br>';
            }
        }
        catch(e){}
        
        try{
            if(typeof records[record]['history']['sets'] != 'undefined'){
            toAppend +='<p>Last time you did' + records[record]['history']['sets']+ 'x' +  records[record]['history']['reps'] + ' using ' + records[record]['history']['weight'] +displayUnits +'</p><br>';
            }
        }
            catch(e){}
                
    console.log(records[record]['records']);
    $("#basicModalHistoryBody").append(toAppend);
    }
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
function updateModalExerciseAdd(inputId){
    var getExercise = mlpObject.getExercises({id:inputId});
    console.log(getExercise['result']);
    $("#myModalLabelExerciseAdd").empty();
    $("#myModalLabelExerciseAdd").append("Add " + getExercise['result']['data'][0]['name'] + " To:");
    
    $("#AddEdModalControls").empty();
    var toAppend = "";
    
    var useDate=[year,(month+1),date];
    var data=[inputId,useDate,1,1,1,1,1];

    toAppend+= '<h3 onclick="addExToResults(['+data+'])"><i class="fa fa-book"></i>Current Day</h3>'+
                            '<p style="color:#77b2c9">or</p>'+
                            '<h3><i class="fa fa-calendar"></i>Select Day</h3>'+
                            '<br>'+
                            '<h3><i class="fa fa-child"></i>Select Workout</h3>';
                    
    $("#AddEdModalControls").append(toAppend);
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalAddEx').modal(options);
    
    

}


function deleteExercise(eid){
    mlpObject.deleteExercise({id:eid});
    $('#basicModalEdit').modal('hide');
    displayMyExercises();

}


var FirstToggle=0;
function toggleMyExercises(){
    
    if (FirstToggle === 0){
        displayMyExercises();
        FirstToggle =1;
        document.getElementById("showExToggleArrow").innerHTML = '<i style="font-size:40px" class="fa fa-minus"></i>'
    }
    else{
        var isVisible = $( "#myExercises" ).is( ":visible" ); 


        $("#myExercises").slideToggle(400);

        if (isVisible !== true){
            document.getElementById("showExToggleArrow").innerHTML = '<i style="font-size:40px" class="fa fa-minus"></i>';
        }
        else{
            document.getElementById("showExToggleArrow").innerHTML = '<i style="font-size:40px" class="fa fa-plus-circle"></i>';
        }
    }
 
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
    var searchTerm="";
    try{
    searchTerm = document.getElementById('myExerciseSearch').value.trim();
    }
    catch(e){}
    console.log(searchTerm);
    $("#myExercises").empty();
    var userId=mlpObject.getUser().result['data']['id'];
    var meo;
    if (searchTerm !== ""){
        var meo=mlpObject.getExercises({userid:userId, name:searchTerm}).result['data'];   
    }
    else{
        var meo=mlpObject.getExercises({userid:userId}).result['data'];
    }
    

    
    var append = "";
    append +='<div style="color:#77b2c9; float:left; margin-right:10px;padding-top:5px;padding-left:7px;padding-right:7px">'+
                    '<p style="font-weight:bold"; >Sort by:</p></div>'+
                    '<select id="myExOrder" style="width:40%; " class="form-control myexercises-editModal-muscle">'+
                    '<option value="0">Name</option>'+
                    '<option>M.Group</option>'+
                    ' <option>Type</option>'+
                    ' <option>ID</option>'+
                    '</select><br>'+
                    '<div><input style="float:left; margin-right: -38px" class="w-input" id="myExerciseSearch" type="text" placeholder="Search My Exercises" name="addexercisetoworkout" required="required" data-name="addexercisetoworkout">'+
                    '<img class="searchImage" onclick="displayMyExercises();return false;" src="images/search.svg" alt="Search" onerror="this.src="your.png"></div>';
                    
    if (searchTerm !==""){append +="<div>Showing search results for: '<span style='color:#77b2c9; font-weight:bold'>" + searchTerm +"</span>'.</div>";}
    
    append +='<div><p>&nbsp;</p><br></div>';
    $("#myExercises").append(append);
    
    
    if ((searchTerm !=="")&& (typeof meo == 'undefined')){$("#myExercises").append("No results for search!<hr>");}
    
    if (typeof meo == 'undefined'){
        $("#myExercises").append("You have no exercises to display!<hr>");
        
    }
    else{
    
        for (objects in meo){
            var toAppend = [];
            toAppend +='<div >';
            toAppend +='<h3 onclick="displayMyExercisesDetails(' + "'" +'myExercises'+meo[objects]['id']+"'"+ ')" style="text-align:left;width:70%;padding: 8px; float:left">'+meo[objects]['name'];
            toAppend +='<span id="myExercisesDetailsArrow'+meo[objects]['id']+'"><i class="fa fa-caret-down"></i></span>';
            toAppend +='</h3>';

            toAppend +='<a href="javascript:updateModalExerciseAdd(' +meo[objects]['id']+ ')" style="width:60px; margin-bottom: 4px; background-color: #77b2c9;color:white" class="btn btn-default btn-circle-main">';

            toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
            toAppend +='</a>';

            toAppend +='<div id="myExercises'+meo[objects]['id']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';


            toAppend+="</div><hr>";

            $("#myExercises").append(toAppend);
        }
    }
    toAppend='';
    toAppend+='<div style="background-color: rgb(218, 215, 209);color:white; font-weight:bold"><p style="font-weight:bold ">My Recently Used:</p></div><hr>';
    $("#myExercises").append(toAppend);
    
    if (searchTerm !== ""){
        try{var mreo = mlpObject.selectResults({limit:20,userid:userId,type:'exercises', name:searchTerm}).result['data'];}
        catch(e){console.log(e);}
    }
    else{
        try{var mreo = mlpObject.selectResults({limit:20,userid:userId,type:'exercises'}).result['data'];}
        catch(e){console.log(e);}
    }
    
    
    try{
        for (objects in mreo){
        var toAppend = [];
        toAppend +='<div >';
        toAppend +='<h3 onclick="displayMyExercisesDetails(' + "'" +'myExercises'+mreo[objects]['exerciseid']+"'"+ ')" style="text-align:left;width:70%;padding: 8px; float:left">'+mreo[objects]['name'];
        toAppend +='<span id="myExercisesDetailsArrow'+mreo[objects]['id']+'"><i class="fa fa-caret-down"></i></span>';
        toAppend +='</h3>';

        toAppend +='<a href="javascript:updateModalExerciseAdd(' +mreo[objects]['exerciseid']+ ')" style="width:60px; margin-bottom: 4px; background-color: #77b2c9;color:white " class="btn btn-default btn-circle-main">';

        toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
        toAppend +='</a>';

        toAppend +='<div id="myExercises'+mreo[objects]['exerciseid']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';

        if ((objects) == mreo.length-1){
        toAppend+="</div><div><br><hr style='border-top:3px solid #77b2c9;' /><br></div>";
        }
        else{toAppend+="</div><hr>";
        }

        $("#myExercises").append(toAppend);
        }
    }
    catch(e){
        console.log(e);
    }
    
//    document.getElementById('myExerciseSearch').value = searchTerm;
//    selectResults({limit:limit, userid:userid, type:type})
//    limit is the number of recent exercises you want userid is obv the users id type can be exercise workout or program
    
}

function displayMyExercisesDetails(input){
    var toAppend ="";
    var divId='#'+input;
    var idNum =input.replace('myExercises','');
    var exercise = mlpObject.getExercises({id:idNum}).result['data'][0];;
    if ((document.getElementById(input).innerHTML).trim() === ""){

        toAppend +='<p style="text-align:left; color:#77b2c9;">&nbsp;&nbsp;&nbsp;'+exercise['musclegroup']+'</p>'+
                '<p style="text-align:left; color:#77b2c9;">&nbsp;&nbsp;&nbsp;'+exercise['type']+'</p>'+
                
                
               ' <a href="javascript:updateModalExerciseEdit('+idNum+');" style="border:1px solid transparent" class="btn btn-default btn-circle myexercises-edit">'+
                '<i style="font-size:40px ;padding-left:5px" class="fa fa-pencil-square-o"></i></a>';
     
    
    
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
            var newEx = mlpObject.createExercise({name:sExerciseName,musclegroup:sExerciseMuscleGroup,type:sExerciseType}).result;
            if (newEx['success']=== false){
                document.getElementById("createSuccess").innerHTML = "<span style='color:#ff6666'>"+newEx['errormsg']+"</span>";
                
            }
            else{
                if(addToDay === 1){
                    console.log(newEx);
                    updateModalExerciseAdd(newEx['data'][0]['id']);
                    }
                document.getElementById("createSuccess").innerHTML = '"'+sExerciseName +'"'+ " <span style='color:#66cc66'>Added Successfully!</span>";
                displayMyExercises();
            }
            }
        else{ throw "Session is null";
        }
        
        
        
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

        toAppend += "<tr onClick='updateModalExerciseAdd("+globalExerciseObjs[key]['id']+")'>";
        
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

function toggleMyWorkouts(){
    
    if (FirstToggle === 0){
        displayMyWorkouts();
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

            var wnames = mlpObject.getExercises({id:workouts['data'][workout]['exerciseid']}).result;

            if (wnames['success'] === false){
                $(divId).append("Contains Deleted Exercise!<hr>");

                }
            else{
                toAppend +='<br><table class="table table-striped">'+
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
        }
        toAppend +='<a href="javascript:addWorkoutEdit('+idNum+');" style="border:6px solid transparent" class="btn btn-default btn-circle myexercises-edit">'+
                '<i style="font-size:60px" class="fa fa-plus-square"></i></a><br>';
                
     toAppend +=  ' <a href="javascript:updateModalWorkoutEdit('+idNum+');" style="border:6px solid transparent" class="btn btn-default btn-circle myexercises-edit">'+
        '<i style="font-size:40px ;padding-left:5px" class="fa fa-pencil-square-o"></i></a>';
    
    
    $(divId).append(toAppend);
    }
     else{$(divId).slideToggle(400);
    }
}

function updateModalWorkoutEdit(wId){

    var workout = mlpObject.getWorkouts({id:wId});

    $("#myModalLabelWorkoutEdit").empty();
    $("#myModalLabelWorkoutEdit").append("Edit " + workout.result['data'][0]['name']);
    
    
    
    document.getElementById("updateWorkoutName").value = workout.result['data'][0]['name'];
        
    
    $("#deleteWorkoutButton").empty();
    var delBut = '<button onclick="deleteWorkout('+wId+')" type="button" class="btn btn-primary">Delete</button>';
    $("#deleteWorkoutButton").append(delBut);
    
    $("#editCalANDSav").empty();
    var buttons='<button type="button" style="color:#77b2c9;" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
            '<button onclick="updateWorkout('+wId+')" type="button" class="btn btn-primary">Update</button>';
    $("#editCalANDSav").append(buttons);
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalEdit').modal(options);
}
function updateWorkout(wId){
    mlpObject.updateWorkout({id:wId,name:document.getElementById("updateWorkoutName").value});
    $('#basicModalEdit').modal('hide');
    displayMyWorkouts();
}
function deleteWorkout(wId){
    mlpObject.deleteWorkout({id:wId});
    $('#basicModalEdit').modal('hide');
    displayMyWorkouts();
}
function updateModalWorkoutAdd(wId){
//    console.log(wId);
    var workout = mlpObject.getWorkouts({id:wId});
    
    $("#myModalLabelWorkoutAdd").empty();
    $("#myModalLabelWorkoutAdd").append("Add " + workout.result['data'][0]['name'] + " To:");
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalAdd').modal(options);
}
//Display my workouts


function displayMyWorkouts(){
    var userId=mlpObject.getUser().result['data']['id'];
    var mwo=mlpObject.getWorkouts({userid:userId}).result['data'];
    $("#myWorkouts").empty();
    
    for (objects in mwo){
        
//        console.log(mwo[objects]);
    var toAppend = "";
    toAppend +='<div>';
    toAppend +='<div onclick="addMyworkoutDetails(' + "'" +'myWorkouts'+mwo[objects]['id']+"'"+ ')">';
    toAppend +='<h3 style="text-align:left;width:70%;padding: 8px; float:left">'+mwo[objects]['name'];
    toAppend +='<i class="fa fa-caret-down"></i>';
    toAppend +='</h3></div>';
    
    toAppend +='<a href="javascript:updateModalWorkoutAdd('+mwo[objects]['id']+');" style="width:60px; margin-bottom: 4px; z-index:10;" class="btn btn-default btn-circle-main">';
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