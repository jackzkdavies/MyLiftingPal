/*! myliftingpal v1.0.1 | (c) 2014 Taylor Hamling | taylorhamling.com */

function mlp(key){
   var self = {};
   self.key = key;
   self.url = 'http://www.myliftingpal.net/api';
   self.result = [];
   self.session = '';
 
    
   function loginCb(data){
       self.result = $.parseJSON(data);
       if (self.result["success"] === true){self.session = self.result["data"]["sessionid"];}
       return self;
   }    
    
   function cb(data){
       self.result = $.parseJSON(data);
       return self;
   }
   
    self.call = function(controller, action, parameters, callback){
        var initialParameters = {key:self.key, session: self.session, controller : controller, action:action};
        var allParamters = $.extend(initialParameters, parameters); 
        $.ajax({
            type: 'post',
            url: self.url,
            async: false,
            data: allParamters,
            success: callback
      });         
    };
   
   
   self.login = function(username, password){
        self.call('authentication','login', {username:username, password: password}, loginCb);  
   };

   self.logout = function(){
        self.call('authentication','logout', {}, cb);  
   };  
    
   self.createuser = function(email,username,password){
       self.call('create','createuser', {email:email, username:username, password: password}, cb);
   };
   
   self.createexercise = function(name,musclegroup,type){
       self.call('create','createexercise', {name:name,musclegroup:musclegroup,type:type}, cb);
   };
       
   self.addstats = function(exerciseid, onerm){
       self.call('create','addstats', {exerciseid:exerciseid, onerm:onerm}, cb);
   };
   
   self.createworkout = function(name){
       self.call('create','createworkout', {name:name}, cb);
   };
   
   self.addexercise = function(exerciseid, workoutid,ordering, reps, sets, rpe, weight, percentage){
       self.call('create','addexercise', {exerciseid:exerciseid, workoutid:workoutid, ordering:ordering, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage}, cb);
   };
   
   self.createprogram = function(name, duration){
       self.call('create','createprogram', {name:name, duration:duration}, cb);
   };
   
   self.addworkout = function(workoutid, programid, ordering, day){
       self.call('create','addworkout', {workoutid:workoutid, programid:programid, ordering:ordering, day:day}, cb);
   };
   
   self.addresults = function(exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage){
       self.call('create','addresults', {exerciseid:exerciseid, workoutid:workoutid, programid:programid, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage}, cb);
   };
   
   self.deleteuser = function(id){
       self.call('edit','deleteuser', {id:id}, cb);
   };
   
   self.deletexercise = function(id){
       self.call('edit','deleteexercise', {id:id}, cb);
   };
   
   self.removestats = function(id){
       self.call('edit','removestats', {id:id}, cb);
   };
   
   self.deleteworkout = function(id){
       self.call('edit','deleteworkout', {id:id}, cb);
   };
   
   self.removeexercise = function(id){
       self.call('edit','removeexercise', {id:id}, cb);
   };
   
   self.deleteprogram = function(id){
       self.call('edit','deleteprogram', {id:id}, cb);
   };
   
   self.removeworkout = function(id){
       self.call('edit','removeworkout', {id:id}, cb);
   };
   
   self.removeresults = function(id){
       self.call('edit','removeresults', {id:id}, cb);
   };
   
   self.updateuser = function(id,email,username,password){
       self.call('edit','updateuser', {id:id,email:email,username:username,password:password}, cb);
   };
   
   self.updateexercise = function(id, name,musclegroup,type){
       self.call('edit','updateexercise', {id:id, name:name,musclegroup:musclegroup,type:type}, cb);
   };
   
   self.changestats = function(id, exerciseid, onerm){
       self.call('edit','changestats', {id:id, exerciseid:exerciseid, onerm:onerm}, cb);
   };
   
   self.updateworkout = function(id, name){
       self.call('edit','updateworkout', {id:id, name:name}, cb);
   };
   
   self.changeexercise = function(id, exerciseid, workoutid, ordering, reps, sets, rpe,weight,percentage){
       self.call('edit','changeexercise', {id:id, exerciseid:exerciseid, workoutid:workoutid, ordering:ordering, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage}, cb);
   };
   
   self.updateprogram = function(id, name, duration){
       self.call('edit','updateprogram', {id:id, name:name, duration:duration}, cb);
   };
   
   self.changeworkout = function(id, workoutid, programid, ordering, day){
       self.call('edit','changeworkout', {id:id, workoutid:workoutid, programid:programid, ordering:ordering, day:day}, cb);
   };
   
   self.changeresults = function(id, exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage){
       self.call('edit','changeresults', {id:id, exerciseid:exerciseid, workoutid:workoutid, programid:programid, reps:reps, sets:sets, rpe:rpe, weight:weight, percentage:percentage}, cb);
   };
   
   self.getusers = function(id,email,username){
       self.call('view','getusers', {id:id,email:email,username:username}, cb);
   };
   
   self.getexercises = function(id, name,musclegroup,type,userid){
       self.call('view','getexercises', {id:id, name:name,musclegroup:musclegroup,type:type,userid:userid}, cb);
   };
   
   self.selectstats = function(id, exerciseid){
       self.call('view','selectstats', {id:id, exerciseid:exerciseid}, cb);
   };
   
   self.getworkouts = function(id, name,userid){
       self.call('view','getworkouts', {id:id, name:name,userid:userid}, cb);
   };
   
   self.selectexercises = function(id, workoutid){
       self.call('view','selectexercises', {id:id, workoutid:workoutid}, cb);
   };
   
   self.getprograms = function(id, name, userid){
       self.call('view','getprograms', {id:id, name:name,userid:userid}, cb);
   };
   
   self.selectworkouts = function(id, programid){
       self.call('view','selectworkouts', {id:id, programid:programid}, cb);
   };
   
   self.getresults = function(id, exerciseid, workoutid, programid){
       self.call('create','getresults', {id:id, exerciseid:exerciseid, workoutid:workoutid, programid:programid}, cb);
   };
   

   return self;
}


