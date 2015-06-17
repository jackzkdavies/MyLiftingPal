var wi = $(window).width();

$("p.testp").text('Initial screen width is currently: ' + wi + 'px.');

$(window).resize(function() {
        var wi = $(window).width();
        $("p.testp").text('Screen width is currently: ' + wi + 'px.');
});

/*
* How to detect browser width
*/
$(window).ready(function() {
    var wi = $(window).width();  
	$('#page1').css({'min-height':windowHeight-20+'px'});
    $("p.testp").text('Initial screen width is currently: ' + wi + 'px.');
 
    $(window).resize(function() {
        var wi = $(window).width();
 
        if (wi <= 480){
            $("p.testp").text('Screen width is less than or equal to 480px. Width is currently: ' + wi + 'px.');
            }
        else if (wi <= 767){
            $("p.testp").text('Screen width is between 481px and 767px. Width is currently: ' + wi + 'px.');
            }
        else if (wi <= 980){
            $("p.testp").text('Screen width is between 768px and 980px. Width is currently: ' + wi + 'px.');
            }
        else if (wi <= 1200){
            $("p.testp").text('Screen width is between 981px and 1199px. Width is currently: ' + wi + 'px.');
            }
        else {
            $("p.testp").text('Screen width is greater than 1200px. Width is currently: ' + wi + 'px.');
            }
    });            
});

var previousOrientation = window.orientation;
var checkOrientation = function(){
    if(window.orientation !== previousOrientation){
        previousOrientation = window.orientation;
        // orientation changed, do your magic here
		location.reload();
    }
};

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);

// (optional) Android doesn't always fire orientationChange on 180 degree turns
/* setInterval(checkOrientation, 2000); */



var cw = $('.arc-wrapper').width();
$('.arc-wrapper').css({'height':cw+'px'});
$('.arc-wrapper').css({'font-size':cw+'px'});
	
var $createId = $('#createId');
$createId.css({'padding-top':cw/15+'px'});
$createId.css({'padding-left':cw/7+'px'});
$createId.css({'letter-spacing':cw/50+'px'});

var $caId = $('#caId');
$caId.css({'padding-top':cw/5+'px'});
$caId.css({'padding-left':cw/5+'px'});

var $accountId = $('#accountId');
$accountId.css({'padding-top':cw/2+'px'});
$accountId.css({'padding-left':cw/4+'px'});
$accountId.css({'font-size':'3vw'});
$accountId.css({'letter-spacing':cw/19+'px'});
