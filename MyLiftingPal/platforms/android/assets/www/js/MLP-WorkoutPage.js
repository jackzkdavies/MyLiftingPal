//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com

//Global Variables 
var toggleSpeed = 0;

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



function toggleDropDownArrow(i){
    if (i.classList.contains('w--open')=== true){
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/open.png" alt="">My Training&nbsp;&nbsp<i class="fa fa-caret-down"></i>';
    }
    else{
        document.getElementById("dropDownArrow").innerHTML = '<img class="dumbbells" src="images/open.png" alt="">My Training&nbsp;&nbsp;<i class="fa fa-caret-up"></i>';
    }
}

var FirstToggle=0;
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
    
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
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

function modalWorkoutExerciseEdit(exerciseid,wID){
    console.log(wID);
    var workouts = mlpObject.getExercises({id:exerciseid}).result;

    document.getElementById("updateModalAddRep").value = 0;
    document.getElementById("updateModalAddSet").value = 0;
    document.getElementById("updateModalAddWeight").value = 0;
    document.getElementById("updateModalAddRPE").value = 0;
    document.getElementById("updateModalAddRM").value = 0; 
     
    $("#myModalLabelWorkoutExerciseEdit").empty();
    $("#myModalLabelWorkoutExerciseEdit").append(workouts['data'][0]['name']);
    
    
    $("#modalWorkoutExerciseEditControls").empty();
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
            '<button onclick="workoutExerciseEdit('+exerciseid+','+wID+')" type="button" class="btn btn-primary">Save</button>';
    $("#modalWorkoutExerciseEditControls").append(buttons);
    
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#modalWorkoutExerciseEdit').modal(options);
    
}
function workoutExerciseEdit(exerciseid,wID){
	loadingModal("Updating Workout...");
    reps = document.getElementById("updateModalAddRep").value;
    sets = document.getElementById("updateModalAddSet").value;
    weight = document.getElementById("updateModalAddWeight").value;
    RPE = document.getElementById("updateModalAddRPE").value;
    RM = document.getElementById("updateModalAddRM").value;
    mlpObject.changeExercise({id:wID,exerciseid:exerciseid, reps:reps, sets:sets, rpe:RPE, weight:weight,percentage:RM});
	displayMyWorkouts();
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
    /* messageModal('#calanderModal'); */
    loadingModal("Adding Workout to Diary...");
}

function workout_workoutSeach(){
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
//                console.log(workouts['data'][workout]);
//                console.log(workouts['data'][workout]['exerciseid']);
//                console.log(wnames['data'][0]);
                toAppend +='<br><table onclick="modalWorkoutExerciseEdit('+workouts['data'][workout]['exerciseid']+','+workouts['data'][workout]['id']+')" class="table table-striped">'+
                '<thead>'+
                    '<tr>'+
                        '<td colspan="5">'+wnames['data'][0]['name']+'</td>'+
//                        '<td colspan="2">'+wnames['data'][0]['musclegroup']+'</td>'+
//                        '<td colspan="2">'+wnames['data'][0]['type']+'</td>'+
                        '<td style="text-align:right" colspan="1"><i class="fa fa-cog"></i></td>'+
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
        toAppend +='<a href="javascript:workout_updateModalWorkoutAdd('+idNum+');" style="border:6px solid transparent" class="no-background btn btn-default btn-circle myexercises-edit">'+
                '<i style="font-size:60px" class="fa fa-plus-square"></i></a><br>';
                
     toAppend +=  ' <a href="javascript:workout_updateModalWorkoutAdd('+idNum+');" style="border:6px solid transparent" class="no-background btn btn-default btn-circle myexercises-edit">'+
        '<i style="font-size:40px ;padding-left:5px" class="fa fa-pencil-square-o"></i></a>';
    
    
    $(divId).append(toAppend);
    }
     else{$(divId).slideToggle(400);
    }
}

function workout_updateModalWorkoutAdd(wId){

    var workout = mlpObject.getWorkouts({id:wId});
	console.log(workout);
    $("#workoutEditModalHeader").empty();
    $("#workoutEditModalHeader").append("Edit " + workout.result['data'][0]['name']);
   
   
    
    $("#workoutEditModalDelete").empty();
    var delBut = '<button onclick="workout_deleteWorkout('+wId+')" type="button" class="deleteButton btn btn-primary">Delete</button>';
    $("#workoutEditModalDelete").append(delBut);
    
    $("#workoutEditModalFooter").empty();
    var buttons='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-arrow-left"></i></button>'+
            '<button onclick="workout_updateWorkout('+wId+')" type="button" class="btn btn-primary">Update</button>';
    $("#workoutEditModalFooter").append(buttons);
    
    var options = {
    "backdrop" : "static",
    "show":"true"};
    $('#workoutEditModal').modal(options);
}

function workout_updateWorkout(wId){
	loadingModal("Updating Workout...");
    mlpObject.updateWorkout({id:wId,name:document.getElementById("updateWorkoutName").value});
    $('#workoutEditModal').modal('hide');
    displayMyWorkouts();
}

function workout_deleteWorkout(wId){
	loadingModal("Deleting Workout...");
    mlpObject.deleteWorkout({id:wId});
    $('#workoutEditModal').modal('hide');
    displayMyWorkouts();
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
	loadingModal("Adding Workout To Diary...")
    try{
        console.log(mlpObject.addResults({workoutid:inputID, assigneddate:year+"-"+(month+1)+"-"+date}).result);
		$('#diarymodalDisplayWorkoutExercies').modal('hide');
        checkResults();
    }
    catch(e){
        
    }
    
}

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
    
    toAppend +='<a href="javascript:updateModalWorkoutAdd('+mwo[objects]['id']+');" class="addingButtonsMain btn btn-default btn-circle-main">';
    toAppend +='<i class="fa fa-plus fa-2x" style="line-height: 1.9 !important"></i>';
    toAppend +='</a>';

    toAppend +='<div id="myWorkouts'+mwo[objects]['id']+'" style="width: 100%; position: relative" class="tabsdivMyWorkOutsBackAndBis"></div>';


    toAppend+="</div><hr>";
    
    $("#myWorkouts").append(toAppend);
    }
}

//create Workout
function submitCreateWorkoutForm(){
	loadingModal("Creating New Workout...");
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
                if(workout_globalExerciseIds !== {}){
                    console.log("in add exercises to new Workoutout:");
					var t = $('#workout_selectedExerciseToAdd').children();
					for(i in t){
						if(typeof t[i].id != 'undefined' && t[i].id != ""){
						     try{
								console.log(t[i]);
								var reps=$(" #" +t[i].id+ " #updateModalAddRep").val();
								var sets=$(" #" +t[i].id+ " #updateModalAddSet").val();
								var weight=$(" #" +t[i].id+ " #updateModalAddWeight").val();
								var rpe=$(" #" +t[i].id+ " #updateModalAddRPE").val();
								var rm=$(" #" +t[i].id+ " #updateModalAddRM").val();

								console.log(reps);
								temp = mlpObject.addExercise({exerciseid:t[i].id, workoutid:nwi, ordering:(i - 2), 
								reps:reps, sets:sets, rpe:rpe,weight:weight, percentage:rm});
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
function workout_submitSearchExcerciseInWorkout(){
    var searchTerms =['name','musclegroup','type'];
    var searchTerm= (document.getElementById("workout_exercisesearch").value.toString()).trim();
    document.getElementById("workout_searchresults").innerHTML = "";
    document.getElementById("workout_searchresults_heading").innerHTML="";
    if (searchTerm ===""){
        $("#workout_searchresults").append("Please enter a keyword");
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
        
        toAppend += "<tr onClick='workout_selectedExercise("+globalExerciseObjs[key]['id']+")'>";
        
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
    $("#workout_searchtable").dataTable().fnDestroy();
    $("#workout_searchresults").empty();
    }
    catch(e){console.log(e);}
    
    $("#workout_searchresults").append(toAppend);
    $('#workout_searchtable').DataTable({bFilter: false});
    document.getElementById('workout_searchtable').style.display='table';
    document.getElementById('workout_searchresults_heading').innerHTML='Search results for: '+searchTerm+'.<br> Tap to add.';
    
    }
    catch(e){console.log(e);}
    finally{};
    
}

var workout_globalExerciseIds ={};
var workout_exerciseAddOrder =[];
function workout_selectedExercise(r){
    var searchTerms =['name'];
    if (typeof workout_globalExerciseIds[r] !== 'undefined'){
		alert("Already Contains: "+workout_globalExerciseIds[r]['name']);
	}
	else{
		for (obj in globalExerciseObjs){
			if( globalExerciseObjs[obj]['id'] == r){
				workout_globalExerciseIds[globalExerciseObjs[obj]['id']]=globalExerciseObjs[obj];
				workout_exerciseAddOrder.push(workout_globalExerciseIds[globalExerciseObjs[obj]['id']]);
			}
		}
	}
	   
		var Append="";
		
		Append +="<h3>Workout Exercises</h3><p>Hold and Drag to Reorder</p><hr>";
		for (items in workout_exerciseAddOrder){ 
			Append +="<div style='width:100%; padding-bottom: 20px;' id="+workout_exerciseAddOrder[items]['id']+">";
											
			for (st in searchTerms){
					Append += '<p class="redFont">';
					Append += workout_exerciseAddOrder[items][searchTerms[st]];
					Append += '</p>'; 
				}    
				Append +=   ' <table style="width:100%"><tr><td style="width: 20%;">reps</td><td style="width: 20%;">sets</td><td style="width: 20%;">weight</td><td style="width: 20%;">RPE</td style="width: 20%;"><td style="width: 20%;">%1RM</td></tr>'+
							'<tr><td><input id="updateModalAddRep" class="createWorkoutExerciseTable" type="number" placeholder="12" name="Reps" required="required" data-name="exercisename"></td>'+
							   '<td> <input id="updateModalAddSet" class="createWorkoutExerciseTable" type="number" placeholder="3" name="Set" required="required" data-name="exercisename"></td>'+
							   ' <td><input id="updateModalAddWeight" class="createWorkoutExerciseTable" type="number" placeholder="10" name="Weight" required="required" data-name="exercisename"></td>'+
							   '<td> <input id="updateModalAddRPE" class="createWorkoutExerciseTable" type="number" placeholder="8" name="RPE" required="required" data-name="exercisename"></td>'+
							   '<td><input id="updateModalAddRM" class="createWorkoutExerciseTable" type="number" placeholder="1" name="%1RM" required="required" data-name="exercisename"></td></tr></table>';
								
								
		Append +="</div>";  
		}
		 
		
		
		try{
			$("#workout_selectedExerciseToAdd").empty();
		}
		catch(e){coneole.log(e);}

		$("#workout_selectedExerciseToAdd").css({"display":"block"});
	   $("#workout_selectedExerciseToAdd").append(Append+"<p>Click 'Create' to finish, or search for more exercises!");
	   for (items in workout_exerciseAddOrder){ 
			$(" #" +workout_exerciseAddOrder[items]['id']+ " #updateModalAddRep").val(12);
			$(" #" +workout_exerciseAddOrder[items]['id']+ " #updateModalAddSet").val(3);
			$(" #" +workout_exerciseAddOrder[items]['id']+ " #updateModalAddWeight").val(0);
			$(" #" +workout_exerciseAddOrder[items]['id']+ " #updateModalAddRPE").val(0);
			$(" #" +workout_exerciseAddOrder[items]['id']+ " #updateModalAddRM").val(0);
		}
	

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

function workout_removeExFromGlobalExIds(id){
	for (i in workout_exerciseAddOrder){
		if (id = workout_exerciseAddOrder[i]['id']){
			workout_exerciseAddOrder.splice( i, 1 );
		}
	/* console.log(workout_exerciseAddOrder[i]['id'] */
	}
	delete workout_globalExerciseIds[id];
}


