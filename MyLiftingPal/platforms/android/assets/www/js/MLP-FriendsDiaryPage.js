//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatoroise.com
var friends_toggleList={};
var friends_recordsList={};


function friend_checkResults(f_id){
	console.log(f_id);
    $('#diaryOwner').empty();
    $('#diaryOwner').append(friendsusername+"'s Diary");
    var friends_firstDiv=true;
    var test = [];
    friends_recordsList={};
    $("#friendDiaryRestults").empty();
    document.getElementById("friends_noResults").innerHTML = "";
    try{
        var friendsDiaryRestults = mlpObject.selectResults({userid:f_id, assigneddate:year+"-"+(month+1)+"-"+date}).result;
        console.log(friendsDiaryRestults); 
        if (friendsDiaryRestults['success'] === false){
            document.getElementById("friends_noResults").innerHTML = "They must be bulking today.";
        }
        else{
            
            
            $("#friendDiaryRestults").append('<div><br></div>');
            
            for (myRes in friendsDiaryRestults['data']){
                var toAppend ="";
                var test=[];
                
                
                
                var myResId="freindsResExNameDiv"+friendsDiaryRestults['data'][myRes]['exerciseid'];
                               
                if (document.getElementById(myResId) == null ){
                    
                    
                    if (myResId != 0 ){
                        
                        test.push([friendsDiaryRestults['data'][myRes]['records']]);
                        if (friends_firstDiv == true){
                            friends_firstDiv =false;
                            toAppend +="<div style=''></div>"; 
                        }
                        else{
                            toAppend +="<div style=''><hr style='width:100%;float:left;  border-top:3px solid #77b2c9; margin-top: 20px; */' /></div>"; 
                        }
                        }
                        toAppend += '<div style="width:100%; float:left">'+
                        '<div id="'+myResId+'" onclick="friendsDiary_toggle('+"'"+myResId+"friendsSecond"+"'"+');friendsDiary_toggle('+"'"+myResId+"friendsThird"+"'"+')" style="width:100%; float:left"><h3 style="text-align:left">'+
                            friendsDiaryRestults['data'][myRes]['name']+
                            '</h3>';
                            toAppend +='</div>';

                        
            
                    toAppend +='<div id="'+myResId+"friendsSecond"+'" style="display:none;width:100%"><div style="width:100%; float:left"><br>'+
                            '<div onclick="diaryEditExercise('+"'"+friendsDiaryRestults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" >'+
                            friendsDiaryRestults['data'][myRes]['reps']+
                            ' </div>'+
                            '<div class="exerciseSetDiv">'+
                            friendsDiaryRestults['data'][myRes]['sets']+
                            ' </div>'+
                            ' <div class="exerciseWeightDiv">'+
                            friendsDiaryRestults['data'][myRes]['weight']+
                            friends_units+'  </div>'+
                            ' <div class="exerciseRPeDiv">'+
                            friendsDiaryRestults['data'][myRes]['rpe']+
                            ' </div>'+

                            ' <div class="exercise1RMdiv">'+
                            friendsDiaryRestults['data'][myRes]['percentage'];
                            toAppend+='%</div></div>'+
                            '<div id="'+myResId+friendsDiaryRestults['data'][myRes]['id']+'" style="display:none; ">'+
                            '<div style=" margin-bottom: -35px; "><a href="javascript:diaryEditExercise('+friendsDiaryRestults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div></div><div id="'+myResId+"friendsThird"+'" style="display:none"></div> ';
                            
                            
                            $("#friendDiaryRestults").append(toAppend);
                }
                else{
                    
                    test.push([friendsDiaryRestults['data'][myRes]['records']]);
                    toAppend +='<div style="width:100%; float:left"><br>'+
                            '<div onclick="diaryEditExercise('+"'"+friendsDiaryRestults['data'][myRes]['id']+"'"+')"><div class="exerciseRepsDiv" onclick="friendsDiary_toggle('+"'"+myResId+friendsDiaryRestults['data'][myRes]['id']+"'"+')">'+
                            friendsDiaryRestults['data'][myRes]['reps']+
                            ' </div>'+
                            '<div class="exerciseSetDiv">'+
                            friendsDiaryRestults['data'][myRes]['sets']+
                            ' </div>'+
                            ' <div class="exerciseWeightDiv">'+
                            friendsDiaryRestults['data'][myRes]['weight']+
                            friends_units+'  </div>'+
                            ' <div class="exerciseRPeDiv">'+
                            friendsDiaryRestults['data'][myRes]['rpe']+
                            ' </div>'+

                            ' <div class="exercise1RMdiv">'+
                            friendsDiaryRestults['data'][myRes]['percentage'];
                            toAppend+='%</div></div>'+
                            '<div id="'+myResId+friendsDiaryRestults['data'][myRes]['id']+'" style="display:none;">'+
                            
                            '<div style=" margin-bottom: -35px;"><a href="javascript:diaryEditExercise('+friendsDiaryRestults['data'][myRes]['id']+');" style="font-size: 24px; margin: 4px; padding-top: 6px; width:60px; margin-bottom: 4px; background-color: #77b2c9; color:white" class="btn btn-default btn-circle-main" title="View settings for this set"><i class="fa fa-cog"></i></a></div>'+
                            '</div><br><hr></div>';
                            
                            var resId="#"+myResId+"friendsSecond";

                            $(resId).append(toAppend);
                            
                    
                }                               

                
                friends_recordsList[friendsDiaryRestults['data'][myRes]['exerciseid']]=test;
            
     
            }

                
        }
        
            
        
    }
    catch(e){
        console.log(e);
    }
}
function friends_toggleListActivate(){
    try{
    for (var key in friends_toggleList) {
      if (friends_toggleList.hasOwnProperty(key)) {
        if(friends_toggleList[key]===true){
            var div="#"+key;
            $(div).slideToggle(toggleSpeed);
        }
        
      }
    }
    }
    catch(e){console.log(e);}
}

function friendsDiary_toggle(divID){
    if (!(divID in friends_toggleList)){
        friends_toggleList[divID] =true;
    }
    
    else{
        var temp  = friends_toggleList[divID];
        if(temp===true ){

            friends_toggleList[divID] = false;
        }
        else{
            friends_toggleList[divID] = true;
        }
    }
    
    var div="#"+divID;
    $(div).slideToggle(toggleSpeed);
}


