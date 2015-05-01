var mlpObject = mlp('f5c31db3b7e2675a43a61a87923955c9');
window.localStorage.setItem("mlp", JSON.stringify(mlpObject));

try{
var user = mlpObject.getUser().result;
window.localStorage.setItem("user", JSON.stringify(user));

var notifications = user['data']['requests'];
window.localStorage.setItem("notifications", JSON.stringify(notifications));

var displayUnits  = user['data']['units'];
window.localStorage.setItem("displayUnits", JSON.stringify(displayUnits));
}
catch(e){}

window.localStorage.setItem("test", "displayUnits");

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('mlp');
console.log('retrievedObject: ', JSON.parse(retrievedObject));