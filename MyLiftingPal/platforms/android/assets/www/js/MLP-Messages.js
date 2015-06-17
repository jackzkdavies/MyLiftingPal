//          MLP
//          Jack Z K Davies 2014 copywrite
//          www.thesoftengineer.com
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