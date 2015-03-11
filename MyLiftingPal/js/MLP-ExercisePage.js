//Create MLP object
var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');

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
//    mlpObject.deleteExercise({id:eid});
//    $('#basicModalEdit').modal('hide');
//    displayMyExercises();

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


        $("#myExercises").slideToggle(toggleSpeed);

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

//////////////////////////////////
//idex page 



