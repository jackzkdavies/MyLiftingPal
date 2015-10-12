(function(){

  var app = angular.module("MainApp");

  app.controller('UserController', [ 'serverAPI', '$log', UserController]);


  function UserController( serverAPI, $log) {
    var API = serverAPI
    var res = API.login({username:'JackDavies',password:'Jack'}).result
    console.log(res);
  }

})();
