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
        for (request in notifications){
            console.log(notifications);

            if(numberNotifications > 99){
                $('#numNot').append('99+');
                $('#notifcationsHeader').innerHtml('Inbox(99+)');
                
            }
            else{
                $('#numNot').append(numberNotifications);
                $('#notifcationsHeader').innerHtml('Inbox('+numberNotifications+')');
            }
            
            $('#notifcationsFriendRequest').append("<h5 onclick='viewFriend("+notifications[request]['userid']+")'>"+notifications[request]['username']+"</h5>");
        }
    }
}