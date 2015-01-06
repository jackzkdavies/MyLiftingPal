/*! myliftingpal v1.0.1 | (c) 2014 Taylor Hamling | taylorhamling.com */

function mlp(key){
   var self = {};
   self.key = key;
   self.url = 'http://www.myliftingpal.net/api/index.php';
   self.result = [];
   self.session = '';
		if (self.session === '' && $.cookie("mlpsession") !== undefined){
			self.session = $.cookie("mlpsession");
		} 
    
   function loginCb(data){
       self.result = $.parseJSON(data);
       if (self.result["success"] === true){
	   self.session = self.result["data"]["sessionid"];
	   $.cookie("mlpsession", self.session, {expires: 30});
	   }
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
            success: callback,
			error:  function( jqXHR, textStatus, errorThrown ){console.log(errorThrown)}
      });         
    };
   
   
   self.login = function(data){
        //username, password
        self.call('authentication','login', data, loginCb); 
		return self;		
   };

   self.logout = function(){
		
        self.call('authentication','logout', {}, cb); 
		self.session = ''
		$.removeCookie("mlpsession");	
		return self;		
   };  
    
   self.createUser = function(data){
	   //email,username,password
       self.call('create','createuser', data, cb);
	   return self;
   };
   
  
   
   self.createExercise = function(data){
	   //name,musclegroup,type
       self.call('create','createexercise', data, cb);
	   return self;
   };
       
   self.addStats = function(data){
	   //exerciseid, onerm
       self.call('create','addstats', data, cb);
	   return self;
   };
   
   self.createWorkout = function(data){
       //name
       self.call('create','createworkout', data, cb);
	   return self;
   };
   
   self.addExercise = function(data){
       //exerciseid, workoutid,ordering, reps, sets, rpe, weight, percentage
       self.call('create','addexercise', data, cb);
	   return self;
   };
   
   self.createProgram = function(data){
	   //name, duration
       self.call('create','createprogram', data, cb);
	   return self;
   };
   
   self.addWorkout = function(data){
	   //workoutid, programid, ordering, day
       self.call('create','addworkout', data, cb);
	   return self;
   };
   
   self.addResults = function(data){
       //exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage
       self.call('create','addresults', data, cb);
	   return self;
   };
   
   self.deleteUser = function(data){
	   //id
       self.call('edit','deleteuser', data, cb);
	   return self;
   };
   
   self.deleteExercise = function(data){
	   //id   
       self.call('edit','deleteexercise', data, cb);
	   return self;
   };
   
   self.removeStats = function(data){
	   //id   
       self.call('edit','removestats', data, cb);
	   return self;
   };
   
   self.deleteWorkout = function(data){
	   //id   
       self.call('edit','deleteworkout', data, cb);
	   return self;
   };
   
   self.removeExercise = function(data){
	   //id   
       self.call('edit','removeexercise', data, cb);
	   return self;
   };
   
   self.deleteProgram = function(data){
	   //id   
       self.call('edit','deleteprogram', data, cb);
	   return self;
   };
   
   self.removeWorkout = function(data){
	   //id   
       self.call('edit','removeworkout', data, cb);
	   return self;
   };
   
   self.removeResults = function(data){
       //id
       self.call('edit','removeresults', data, cb);
	   return self;
   };
   
   self.updateUser = function(data){
	   //id,email,username,password
       self.call('edit','updateuser', data, cb);
	   return self;
   };
   
   self.updateExercise = function(data){
       //id, name,musclegroup,type
       self.call('edit','updateexercise', data, cb);
	   return self;
   };
   
   self.changeStats = function(data){
	   //id, exerciseid, onerm
       self.call('edit','changestats', data, cb);
	   return self;
   };
   
   self.updateWorkout = function(data){
	   //id, name	
       self.call('edit','updateworkout', data, cb);
	   return self;
   };
   
   self.changeExercise = function(data){
       //id, exerciseid, workoutid, ordering, reps, sets, rpe,weight,percentage
       self.call('edit','changeexercise', data, cb);
	   return self;
   };
   
   self.updateProgram = function(data){
       //id, name, duration
       self.call('edit','updateprogram', data, cb);
	   return self;
   };
   
   self.changeWorkout = function(data){
       //id, workoutid, programid, ordering, day
       self.call('edit','changeworkout', data, cb);
	   return self;
   };
   
   self.changeResults = function(data){
       //id, exerciseid, workoutid, programid, reps, sets, rpe, weight, percentage
       self.call('edit','changeresults', data, cb);
           return self;
    };
   
   self.getUsers = function(data){
       //id, email, username
       self.call('view','getusers', data, cb);
	   return self;
   };

   self.getUser = function(){ 
       self.call('view','getuser', {sessionid:self.session}, cb);
	   return self;
   }; 
   
   self.getExercises = function(data){
       //id, name,musclegroup,type,userid
       self.call('view','getexercises', data, cb);
	   return self;
   };
   
   self.selectStats = function(data){
       //id, exerciseid
       self.call('view','selectstats', data, cb);
	   return self;
   };
   
   self.getWorkouts = function(data){
       //id, name,userid
       self.call('view','getworkouts', data, cb);
	   return self;
   };
   
   self.selectExercises = function(data){
       //id, workoutid
       self.call('view','selectexercises', data, cb);
	   return self;
   };
   
   self.getPrograms = function(data){
       //id, name, userid
       self.call('view','getprograms', data, cb);
	   return self;
   };
   
   self.selectWorkouts = function(data){
       //id, programid
       self.call('view','selectworkouts', data, cb);
	   return self;
   };
   
   self.selectResults = function(data){
       //id,exerciseid,workoutid,programid,userid,reps,sets,rpe,weight,percent,assigneddate
       self.call('view','selectresults', data, cb);
	   return self;
   };
   

   return self;
}


