//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com

modalHistoryTest = {}

var globalExerciseObjs; 
var globalWorkoutObjs;
var globalProgramObjs; 
var firstMainPageAddClicked=false;
var submitDairySearchClass= 'e';
var currentTotals={};
window.localStorage.setItem("lastFriendView", null);
var toggleList={};
recordsList={};
var toggleSpeed=0;

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


function toggleDropDownArrow(i){
    if (i.classList.contains('w--open')=== true){
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/db.png" alt="">My Training&nbsp;&nbsp;<i class="fa fa-caret-up"></i>';
    }
}

function checkResults(){
modalHistoryTest={};
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
                
                modalHistoryTest[myDiaryResults['data'][myRes]['id']] = myDiaryResults['data'][myRes]
                
                
                var myResId="myResExNameDiv"+myDiaryResults['data'][myRes]['exerciseid'];
                
                
                
                
  
                
                if (document.getElementById(myResId) == null ){
                    
                    
                    if (myResId != 0 ){
                        
                        test.push([myDiaryResults['data'][myRes]['records']]);
                        if (firstDiv == true){
                            firstDiv =false;
                            toAppend +="<div style=''></div>"; 
                        }
                        else{
                            toAppend +="<div style=''><hr style='width:100%;float:left;  border-top:3px solid rgb(0, 94, 134); margin-top: 20px; */' /></div>"; 
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
                            '<div id="'+myDiaryResults['data'][myRes]['id']+'" onclick="diaryEditExercise('+"'"+myDiaryResults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" >'+
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
                            toAppend+='% <i class="redFont fa fa-pencil-square-o" style="margin-left: 4px;margin-right: -8px;"></i></div></div>'+
                            '<div id="'+myResId+myDiaryResults['data'][myRes]['id']+'" style="display:none; ">'+
                            '<div style=" margin-bottom: -35px; "><a href="javascript:diaryEditExercise('+myDiaryResults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: rgb(0, 94, 134); color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div></div><div id="'+myResId+"Third"+'" style="display:none"></div> ';
                            
                            
                            $("#myDairyResults").append(toAppend);
                }
                else{
                    
                    test.push([myDiaryResults['data'][myRes]['records']]);
                    toAppend +='<div style="width:100%; float:left"><br>'+
                            '<div id="'+myDiaryResults['data'][myRes]['id']+'" onclick="diaryEditExercise('+"'"+myDiaryResults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" onclick="toggle('+"'"+myResId+myDiaryResults['data'][myRes]['id']+"'"+')">'+
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
                            toAppend+='% <i class="redFont fa fa-pencil-square-o" style="margin-left: 4px;margin-right: -8px;"></i></div></div>'+
                            '<div id="'+myResId+myDiaryResults['data'][myRes]['id']+'" style="display:none;">'+
                            
                            '<div style=" margin-bottom: -35px;"><a href="javascript:diaryEditExercise('+myDiaryResults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: rgb(0, 94, 134); color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
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
                '<a href="javascript:diaryModalAddSet(['+myDiaryResults['data'][myRes]['exerciseid']+','+myDiaryResults['data'][myRes]['id']+']);" style="font-size: 24px; margin: 4px; padding-top: 18px;padding-left: 2px; width:60px; margin-bottom: 4px; background-color: white; color:rgb(0, 94, 134)" class="btn btn-default btn-circle-main"  title="Add Result to your Exercise"><i class="fa fa-plus"></i></a>'+
                '<a href="javascript:diaryModalDelete('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 18px;padding-left: 2px;  width:60px; margin-bottom: 4px; background-color: #ff6666; color:white" class="btn btn-default btn-circle-main" title="Delete exercise from your diary"><i class="fa fa-trash"></i></a>'+
                '<a href="javascript:diaryModalHistory('+myDiaryResults['data'][myRes]['exerciseid']+');" style="font-size: 24px; margin: 4px; padding-top: 18px;padding-left: 2px;  width:60px; margin-bottom: 4px; background-color: #66cc66; color:white" class="btn btn-default btn-circle-main"  title="View your log for this exercise"><i class="fa fa-book"></i></a>'+
//                '<a href="javascript:void(0);" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: rgb(0, 94, 134); color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a>'+
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
        currentTotals[diaryres['exerciseid']] = (parseFloat(diaryres['weight']) * parseFloat(diaryres['reps']));
    }
    else{
        
    currentTotals[diaryres['exerciseid']] = (parseFloat(currentTotals[diaryres['exerciseid']]) + (parseFloat(diaryres['weight']) * parseFloat(diaryres['reps'])));
}
    
}
function updateDiaryResults(inputID){
    loadingModal("Updating Set...");
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
    loadingModal("Removing Results...")
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
    document.getElementById("updateResultRemove").innerHTML ='<button onclick="diaryRemoveResults('+inputID+')" type="button" style="background-color:#ff6666;border-color:#ff6666" class="btn btn-primary">Remove</button>';
    $("#modalEditDiaryResultFooter").empty();
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
            '<button onclick="updateDiaryResults('+inputID+')" type="button" class="btn btn-primary">Update</button>';
    $("#modalEditDiaryResultFooter").append(buttons); 
    var options = {
    "backdrop" : "true",
    "keyboard":true,
    "show":"true"};
    $('#modalEditDiaryResult').modal(options);
}

function diaryModalHistory(inputID){

		for(resultNotes in modalHistoryTest){
			if(modalHistoryTest[resultNotes]['exerciseid'] == inputID){
				if (modalHistoryTest[resultNotes]['notes'] != null){
					$('#modalHistoryNotesContent').val(modalHistoryTest[resultNotes]['notes'])
				}
				else{
					$('#modalHistoryNotesContent').val("");
				}
				
			}
		}

	currentModalHistoryID = inputID;
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
        catch(e){ console.log(e);
        }
        var toAppend="<h5>Overal Records</h5>";
        $("#modalHistoryRecords").append(toAppend); 
        try{
            if (typeof records[record]['overall']['max'] !='undefined'){
            toAppend ='<p>Best '+records[record]['overall']['rep']+' RM recorded: '+records[record]['overall']['max']+displayUnits+'</p><br>';
            $("#modalHistoryRecords").append(toAppend);
    
            }
        }
        catch(e){ console.log(e); 
        }
        try{
            if (typeof records[record]['backoffs']['best'] !='undefined'){
            toAppend ='<p>Best set volume for '+records[record]['overall']['rep']+' rep sets: '+ records[record]['backoffs']['best'] +displayUnits+'</p><br>';
                $("#modalHistoryRecords").append(toAppend);
    
            }
        }
        catch(e){ console.log(e);
        }
    }
    bestVolume(inputID);
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#basicModalHistory').modal(options);
}

function diaryModalDelete(inputID){
    $("#modalDirayDeleteButtons").empty();    
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
            '<button onclick="deleteModalDiaryResult('+inputID+')" type="button" class="btn btn-primary">Remove</button>';
    $("#modalDirayDeleteButtons").append(buttons);
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#modalDirayDelete').modal(options);
}

function deleteModalDiaryResult(inputID){
    loadingModal("Deleteing Resutls...");
    mlpObject.removeResults({exerciseid:inputID, assigneddate:year+"-"+(month+1)+"-"+date});
    $('#modalDirayDelete').modal('hide');
    checkResults(); 
}

function addModalDiaryResult(inputID){
    loadingModal("Adding Set...");
    try{
        var rep=document.getElementById("ModalAddSetRep").value;
        var set=document.getElementById("ModalAddSetSet").value;
        var wei=document.getElementById("ModalAddSetWeight").value;
        var rp=document.getElementById("ModalAddSetRPE").value;
        var rm=document.getElementById("ModalAddSetRM").value;
        
        
        //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage,assigneddate
        mlpObject.addResults({exerciseid:inputID, reps:rep, sets:set, weight:wei, rpe:rp, percentage:rm, assigneddate:year+"-"+(month+1)+"-"+date});
        $('#ModalDiaryAddSet').modal('hide');
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
    $("#ModalAddSetButtons").empty();
    var records = recordsList[inputID[0]][0][0];
    var temp = 'myResExNameDiv'+inputID[0]+'Second';
    var rpe = parseFloat((document.getElementById(inputID[1]).childNodes[7]['innerText']).replace("%","")); 
    console.log(rpe);
    document.getElementById("ModalAddSetRep").value = records['overall']['rep'];
    document.getElementById("ModalAddSetSet").value = document.getElementById(temp).childNodes.length +1;
    document.getElementById("ModalAddSetWeight").value = records['amrap']['weight'];
    document.getElementById("ModalAddSetRPE").value = records['amrap']['rpe'];
    document.getElementById("ModalAddSetRM").value = rpe;

    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
            '<button id="submitAddSetButton" onclick="addModalDiaryResult('+inputID+')" type="button" class="btn btn-primary">Add</button>';
    $("#ModalAddSetButtons").append(buttons);
    
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#ModalDiaryAddSet').modal(options);
}

function diaryPageAddExToResults(data){

    loadingModal("Adding Exercise to Diary...");

    var exID = data[0];
    var tdate = (data[1]+"-"+data[2]+"-"+data[3]);
    var rep= data[4];
    var set= data[5];
    var rp= data[6];
    var weig= data[7];
    var per= data[8];

    try{
        mlpObject.addResults({exerciseid:exID,assigneddate:tdate, reps:rep,sets:set, rpe:rp, weight:weig, percentage:per}).result;
        checkResults();
    }
    
    catch(e){
        
    }
}

function addWorkoutToDiary(inputID){
    loadingModal("Adding Workout...");
    try{
        mlpObject.addResults({workoutid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result;
        $('#modalDisplayWorkoutExercies').modal('hide');
        checkResults();
    }
    catch(e){
        
    } 
}


//Code for modals
function diaryModalDisplayWorkoutExercies(inputID){

    var searchResult = mlpObject.getWorkouts({id:inputID}).result['data'][0];
    var name = searchResult['name']
    var exercises = searchResult['exercises'];
 
    
    $("#modalDisplayWorkoutExerciesHeader").empty();
    $("#modalDisplayWorkoutExerciesHeader").append(name);
    
    var toAppend='<table><tr style="color: rgb(0, 94, 134); font-weight:bold;" ><td>Exercise</td><td>Weight</td><td>Reps</td><td>Sets</td><td>RPE</td></tr>';
    
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
    
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
            '<button onclick="addWorkoutToDiary('+inputID+')" type="button" class="btn btn-primary">Add</button>';
    
    $("#modalDisplayWorkoutExerciesFooter").empty();
    $("#modalDisplayWorkoutExerciesFooter").append(buttons);
    

    $("#modalDisplayWorkoutExerciesBody").empty();
    $("#modalDisplayWorkoutExerciesBody").append(toAppend);
    
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
        document.getElementById('mainExSearch').style.color='rgb(0, 94, 134)';
        document.getElementById('mainWorkSearch').style.color='#333';
        document.getElementById('mainProSearch').style.color='#333';  
        document.getElementById("mainSearchTerm").placeholder="Select Exercise to add";
        firstMainPageAddClicked = true;  
      }
    


    
}



function infoDataModal(data){
    
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
        document.getElementById('mainExSearch').style.color='rgb(0, 94, 134)';
        document.getElementById('mainWorkSearch').style.color='#333';
        document.getElementById('mainProSearch').style.color='#333';  
        document.getElementById("mainSearchTerm").placeholder="Select Exercise to add";
        submitDairySearchClass= 'e';
    }
    else if (inp === 'w'){   

        document.getElementById('mainExSearch').style.color='#333';
        document.getElementById('mainWorkSearch').style.color='rgb(0, 94, 134)';
        document.getElementById('mainProSearch').style.color='#333';
        document.getElementById("mainSearchTerm").placeholder="Select Workout to add";
        submitDairySearchClass= 'w';
    }
    else if (inp === 'p'){   
        document.getElementById('mainExSearch').style.color='#333';
        document.getElementById('mainWorkSearch').style.color='#333'; 
        document.getElementById('mainProSearch').style.color='rgb(0, 94, 134)';
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
        diaryProgramSearch();
    }
    
}
function clearSearchTables(){
    //clean up from any past searches
	$("#outerResultsContainer").css({"width": "100%","display":"hidden","float":"left"});
    document.getElementById("searchresults").innerHTML = "";
    document.getElementById("searchResultsHeading").innerHTML="";
    try{
        
        
    
        $("#mytable").dataTable().fnDestroy();
        $("#mytableWorkouts").dataTable().fnDestroy();
        $("#programSearchTable").dataTable().fnDestroy();
        
        
        $("#searchresults").empty();
        $("#searchresultsWorkouts").empty();
        $("#searchResultsProgram").empty();
        
        document.getElementById('mytable').style.display='none';
        document.getElementById('mytableWorkouts').style.display='none';
        document.getElementById('programSearchTable').style.display='none';
    }
    catch(e){
        console.log(e);
    }
}
function dairyPageExSearch(){
    //clean up from any past searches
    clearSearchTables();
    
    var searchTerms =['name','musclegroup','type'];
    var searchTerm= (document.getElementById("mainSearchTerm").value.toString()).trim();
    
   
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
                toAppend += '<i class="fa fa-plus-circle" onClick="diaryPageAddExToResults(['+resultData+'])"></i>';
                toAppend += "</td>";
            }
            
        }
        
        toAppend += "</tr>";

    }}
    
  
    
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


    //clean up from any past searches
    clearSearchTables();
    
    var searchTerms =['name','userid'];
    var searchTerm= (document.getElementById("mainSearchTerm").value.toString()).trim();

    
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
        toAppend += "<tr onClick='diaryModalDisplayWorkoutExercies("+key+")'>";
       

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
    
    
    $("#searchresultsWorkouts").append(toAppend);
    $('#mytableWorkouts').DataTable({bFilter: false});
    document.getElementById('mytableWorkouts').style.display='table';
    document.getElementById('searchResultsHeading').innerHTML='<div style="line-height:50px">Search results for workout: '+searchTerm+'</div>';
    
    }
    catch(e){console.log(e);}
    finally{};
}


function diaryProgramSearch(){
    $("#outerResultsContainer").css({"width": "100%","display":"block","float":"left"});
    
    //clean up from any past searches
    clearSearchTables();
    
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
            toAppend = "<tr onclick='diaryRightResultsContainerUpdate("+key+")'><td>" + globalProgramObjs[key]['name'] +"</td></tr>";
            $('#searchResultsProgram').append(toAppend);
        }

    }
        

    
    $('#programSearchTable').DataTable({bFilter: false});
    document.getElementById('programSearchTable').style.display='table';
        
    
}

function displayLeftSearchContainer(){
    $("#leftResultsContainer").css({"width": "100%","display":"block"});
    $("#rightResultsContainer").css({"width": "0px","display":"none", "overflow": "hidden"});
    
}

function diaryRightResultsContainerUpdate(programId){
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
                    toAppend += '<hr><p style="color:rgb(0, 94, 134); font-weight:bold">Day: ' + count+'</p>'; 
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

//                            toAppend += '<p style="color:rgb(0, 94, 134)">'+workoutName+'</p><br>';


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
     toAppend+='<div style="width:100%"><a href="javascript:diaryUpdateModalProgramAdd('+programId+','+"'"+name+"'"+');" style="width:60px; margin-bottom: 4px; z-index:10; background-color: rgb(0, 94, 134);color:white" class="btn btn-default btn-circle-main"><i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i></a></div>';
     toAppend+='<br><h2><i onclick="displayLeftSearchContainer()" class="fa fa-arrow-left"></i></h2>';
    $('#rightResultsContent').empty();
    $('#rightResultsContent').append(toAppend);
    
    $("#rightResultsContainer").css({"width": "100%","display":"block"});
    $("#leftResultsContainer").css({"width": "0px", "overflow": "hidden","display":"none"});

    
}

function diaryUpdateModalProgramAdd(pId,programNam){
    $('#addModal').modal('hide');

    $("#myModalLabelWorkoutAdd").empty();
    $("#myModalLabelWorkoutAdd").append("Add " + programNam + " To:");
    
    $("#modalWorkoutAddTo").empty();
    
    var tempString="'#basicModalAddWorkout'";
    var calanderData=[pId,tempString];
    
    var toAppend ='';
     toAppend += '<h3 onclick='+'"addProgramToDiary('+pId+')"><i class="fa fa-book"></i>Current Day</h3>'+
                            '<p style="color:rgb(0, 94, 134)">or</p>'+
                            '<h3 onclick="calanderModal(['+calanderData+'])"><i class="fa fa-calendar"></i>Select Day</h3>';
    $("#modalWorkoutAddTo").append(toAppend);
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#basicModalAddWorkout').modal(options);
}

function addProgramToDiary(inputID){
    loadingModal("Adding Program...");
    try{
        console.log(mlpObject.addResults({programid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);
        checkResults();
    }
    catch(e){
        
    }
    
}

function calanderModal(data){
    var caller=data[1];
    var inputID=data[0];
    $(caller).modal('hide');
    
    
    var buttons= '<hr>'+
                 '<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
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
