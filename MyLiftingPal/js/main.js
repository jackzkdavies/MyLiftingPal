//Toggling ful view of exercises with
function slideToggle(number){
    $(".tabsdiv"+number).slideToggle(400);
}

function toggleTest(){
    slideToggle(1);
    slideToggle(2);
    slideToggle(3);
}
//////////////////////////////////
document.forms["signup"].submit();

function submitform()
{
    var wanted_value = form.someFieldName.value; 

    console.log(wanted_value);
 
}

