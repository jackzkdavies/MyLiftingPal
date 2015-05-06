//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com

var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
var user = JSON.parse(localStorage.getItem('user'));
var notifications = user['data']['requests'];

function notifcationsModal(){
    var options = {
    "backdrop" : "true",
    "show":"true"};
    $('#notifcationsModal').modal(options);
}

function checkNotifications(){
    var numberNotifications = notifications.length;
    if (notifications != null){
        $('#notifcationsFriendRequest').empty();
        for (request in notifications){

            if(numberNotifications > 99){
                $('#numNot').append('99+');
                document.getElementById("notifcationsHeader").innerHTML='(99+) Inbox';
                
            }
            else{
                $('#numNot').append(numberNotifications);
                document.getElementById("notifcationsHeader").innerHTML='('+numberNotifications+') Inbox';
            }
            
            $('#notifcationsFriendRequest').append("<p >"+notifications[request]['username']+"&nbsp;&nbsp;&nbsp;&nbsp;<i style='color: rgb(119, 178, 201);' onclick='viewFriend("+notifications[request]['userid']+")'class='fa fa-user'></i>&nbsp;&nbsp;&nbsp;&nbsp;\n\
            <i class='fa fa-check goodText' onclick='mlpObject.addFriend({friendid:"+notifications[request]['userid']+"})'></i>&nbsp;&nbsp;&nbsp;&nbsp;\n\
            <i class='fa fa-times badText'></i></p>");
        }
    }
}