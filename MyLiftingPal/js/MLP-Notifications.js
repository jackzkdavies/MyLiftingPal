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
                $('#notifcationsHeader').innerHTML='Inbox(99+)';
                
            }
            else{
                $('#numNot').append(numberNotifications);
                $('#notifcationsHeader').innerHTML='Inbox('+numberNotifications+')';
            }
            
            $('#notifcationsFriendRequest').append("<p >"+notifications[request]['username']+"<i onclick='viewFriend("+notifications[request]['userid']+")'class='fa fa-user'></i> <i class='fa fa-check'></i> <i class='fa fa-times'></i></p>");
        }
    }
}