//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com


//code for nav

//$( window ).load(function() { 
//var myElement = document.getElementById('page-top');
//
//// create a simple instance
//// by default, it only adds horizontal recognizers
//var mc = new Hammer(myElement);
//// listen to events...
//var locationTest = [(window.location.pathname).toLocaleString()];
// console.log(locationTest);
//mc.on("panleft panright tap press", function(ev) {
//	if(locationTest[0].indexOf('main-page') > -1){
//			if (ev.type ==="panright" ){
//		window.location.replace("create-exercise.html");
//		}
//		else{
//			window.location.replace("create-program.html");
//		}	
//	}
//	
//	if(locationTest[0].indexOf('create-exercise') > -1){
//			if (ev.type ==="panright" ){
//		window.location.replace("create-workout.html");
//		}
//		else{
//			window.location.replace("main-page.html");
//		}	
//	}
//	
//		if(locationTest[0].indexOf('create-workout') > -1){
//			if (ev.type ==="panright" ){
//		window.location.replace("create-program.html");
//		}
//		else{
//			window.location.replace("create-exercise.html");
//		}	
//	}
//	
//	if(locationTest[0].indexOf('create-program') > -1){
//			if (ev.type ==="panright" ){
//		window.location.replace("main-page.html");
//		}
//		else{
//			window.location.replace("create-workout.html");
//		}	
//	}
//});
//
//mc.add( new Hammer.Pan({threshold: 100 }) );
//
//
// }) 

$(window).scroll(function() {
  if ($(document).scrollTop() > 100) {
    $('#logoHeader').css({"margin-top":"-50px"});
    $('#MLPlogo').css({"display":"none"});;
    $('#headerDateDiv').css({"display":"block"});;


  } else {
    $('#logoHeader').css({"margin-top":"0px"});
    $('#MLPlogo').css({"display":"block"});;
    $('#headerDateDiv').css({"display":"none"});;
  }
});

var days= ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"]; 
var months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
var monthPrefix = ["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];

var day;
var date;                 
var month ;          
var year ;
var fullDate ;

function setVarDate(){
    day = $("#date-Picker").datepicker('getDate').getDay();
    date = $("#date-Picker").datepicker('getDate').getDate();                 
    month = $("#date-Picker").datepicker('getDate').getMonth();             
    year = $("#date-Picker").datepicker('getDate').getFullYear();
    fullDate = days[day] + ", " + date +monthPrefix[date-1]+ " " + months[month]+", "+year;

    if ($(".calender").is(':visible')){
        document.getElementById("date").innerHTML = fullDate + "<span class='themeColour'> <i class='fa fa-caret-up'></i></span>";
    }
    else{
        document.getElementById("date").innerHTML = fullDate + "<span class='themeColour'> <i class='fa fa-caret-down'></i></span>";
    }
    
    document.getElementById("headerDate").innerHTML = fullDate; 
	
	try{
	    if ($('#diary').is(':hidden')) {
			/* do nothing */
		} else {
			checkResults();
		}
		
		if ($('#friendsdiary').is(':hidden')) {
			/* do nothing */
		} else {
			friend_checkResults(friendsId);
		}
	}
	catch(e){}

}

function slideToggleCalender(){

    if ($(".calender").is(':visible')){
        document.getElementById("date").innerHTML = fullDate + "<span class='themeColour'> <i class='fa fa-caret-down'></i></span>";
        $(".calender").slideToggle(toggleSpeed);
    }
    else{
        document.getElementById("date").innerHTML = fullDate + "<span class='themeColour'> <i class='fa fa-caret-up'></i></span>";
        $(".calender").slideToggle(toggleSpeed);
    }
}

