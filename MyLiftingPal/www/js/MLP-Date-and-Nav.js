//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.gigatortoise.com

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

